/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { createDocument, EditorOptions } from '@tiptap/core'
import { Editor as TiptapEditor } from '@tiptap/core'
import { Node } from '@tiptap/pm/model'
import { EditorState, Transaction } from '@tiptap/pm/state'
import { EditorView } from '@tiptap/pm/view'

import { blockToNode } from '../api/nodeConversions/blockToNode'
import { PartialBlock } from '../blocks/defaultBlocks'
import { StyleSchema } from '../schema/index'

export type MiaomaDocTipTapEditorOptions = Partial<Omit<EditorOptions, 'content'>> & {
    content: PartialBlock<any, any, any>[]
}

/**
 * Custom Editor class that extends TiptapEditor and separates
 * the creation of the view from the constructor.
 */
export class MiaomaDocTipTapEditor extends TiptapEditor {
    private _state: EditorState

    public static create = (options: MiaomaDocTipTapEditorOptions, styleSchema: StyleSchema) => {
        // because we separate the constructor from the creation of the view,
        // we need to patch setTimeout to prevent this code from having any effect:
        // https://github.com/ueberdosis/tiptap/blob/45bac803283446795ad1b03f43d3746fa54a68ff/packages/core/src/Editor.ts#L117
        const oldSetTimeout = globalThis?.window?.setTimeout
        if (typeof globalThis?.window?.setTimeout !== 'undefined') {
            globalThis.window.setTimeout = (() => {
                return 0
            }) as any
        }
        try {
            return new MiaomaDocTipTapEditor(options, styleSchema)
        } finally {
            if (oldSetTimeout) {
                globalThis.window.setTimeout = oldSetTimeout
            }
        }
    }

    protected constructor(options: MiaomaDocTipTapEditorOptions, styleSchema: StyleSchema) {
        // possible fix for next.js server side rendering
        // const d = globalThis.document;
        // const w = globalThis.window;
        // if (!globalThis.document) {
        //   globalThis.document = {
        //     createElement: () => {},
        //   };
        // }

        // options.injectCSS = false

        super({ ...options, content: undefined })
        // try {
        //   globalThis.window = w;
        //   } catch(e) {}
        //   try {
        //     globalThis.document = d;
        //     } catch(e) {}

        // This is a hack to make "initial content detection" by y-prosemirror (and also tiptap isEmpty)
        // properly detect whether or not the document has changed.
        // We change the doc.createAndFill function to make sure the initial block id is set, instead of null
        const schema = this.schema
        let cache: any
        const oldCreateAndFill = schema.nodes.doc.createAndFill
        ;(schema.nodes.doc as any).createAndFill = (...args: any) => {
            if (cache) {
                return cache
            }
            const ret = oldCreateAndFill.apply(schema.nodes.doc, args)

            // create a copy that we can mutate (otherwise, assigning attrs is not safe and corrupts the pm state)
            const jsonNode = JSON.parse(JSON.stringify(ret!.toJSON()))
            jsonNode.content[0].content[0].attrs.id = 'initialBlockId'

            cache = Node.fromJSON(schema, jsonNode)
            return cache
        }

        let doc: Node

        try {
            const pmNodes = options?.content.map(b => blockToNode(b, this.schema, styleSchema).toJSON())
            doc = createDocument(
                {
                    type: 'doc',
                    content: [
                        {
                            type: 'blockGroup',
                            content: pmNodes,
                        },
                    ],
                },
                this.schema,
                this.options.parseOptions
            )
        } catch (e) {
            console.error('Error creating document from blocks passed as `initialContent`. Caused by exception: ', e)
            throw new Error('Error creating document from blocks passed as `initialContent`:\n' + +JSON.stringify(options.content))
        }

        // Create state immediately, so that it's available independently from the View,
        // the way Prosemirror "intends it to be". This also makes sure that we can access
        // the state before the view is created / mounted.
        this._state = EditorState.create({
            doc,
            schema: this.schema,
            // selection: selection || undefined,
        })
    }

    get state() {
        if (this.view) {
            this._state = this.view.state
        }
        return this._state
    }

    dispatch(tr: Transaction) {
        if (this.view) {
            this.view.dispatch(tr)
        } else {
            // before view has been initialized
            this._state = this.state.apply(tr)
        }
    }

    /**
     * Replace the default `createView` method with a custom one - which we call on mount
     */
    private createViewAlternative() {
        // Without queueMicrotask, custom IC / styles will give a React FlushSync error
        queueMicrotask(() => {
            this.view = new EditorView(
                { mount: this.options.element as any }, // use mount option so that we reuse the existing element instead of creating a new one
                {
                    ...this.options.editorProps,

                    // @ts-expect-error - we need to pass the editor instance to the view
                    dispatchTransaction: this.dispatchTransaction.bind(this),
                    state: this.state,
                }
            )

            // `editor.view` is not yet available at this time.
            // Therefore we will add all plugins and node views directly afterwards.
            const newState = this.state.reconfigure({
                plugins: this.extensionManager.plugins,
            })

            this.view.updateState(newState)

            this.createNodeViews()

            // emit the created event, call here manually because we blocked the default call in the constructor
            // (https://github.com/ueberdosis/tiptap/blob/45bac803283446795ad1b03f43d3746fa54a68ff/packages/core/src/Editor.ts#L117)
            this.commands.focus(this.options.autofocus)
            this.emit('create', { editor: this })
            this.isInitialized = true
        })
    }

    /**
     * Mounts / unmounts the editor to a dom element
     *
     * @param element DOM element to mount to, ur null / undefined to destroy
     */
    public mount = (element?: HTMLElement | null) => {
        if (!element) {
            this.destroy()
        } else {
            this.options.element = element
            this.createViewAlternative()
        }
    }
}

;(MiaomaDocTipTapEditor.prototype as any).createView = function () {
    // no-op
    // Disable default call to `createView` in the Editor constructor.
    // We should call `createView` manually only when a DOM element is available

    // additional fix because onPaste and onDrop depend on installing plugins in constructor which we don't support
    this.options.onPaste = this.options.onDrop = undefined
}
