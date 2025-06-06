/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Extension } from '@tiptap/core'
import { Fragment, Node } from 'prosemirror-model'
import { NodeSelection, Plugin } from 'prosemirror-state'
import { CellSelection } from 'prosemirror-tables'
import * as pmView from 'prosemirror-view'
import { EditorView } from 'prosemirror-view'

import type { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { createExternalHTMLExporter } from '../../exporters/html/externalHTMLExporter'
import { cleanHTMLToMarkdown } from '../../exporters/markdown/markdownExporter'
import { fragmentToBlocks } from '../../nodeConversions/fragmentToBlocks'
import { contentNodeToInlineContent, contentNodeToTableContent } from '../../nodeConversions/nodeToBlock'

function fragmentToExternalHTML<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    view: pmView.EditorView,
    selectedFragment: Fragment,
    editor: MiaomaDocEditor<BSchema, I, S>
) {
    let isWithinBlockContent = false
    const isWithinTable = view.state.selection instanceof CellSelection

    if (!isWithinTable) {
        // Checks whether block ancestry should be included when creating external
        // HTML. If the selection is within a block content node, the block ancestry
        // is excluded as we only care about the inline content.
        const fragmentWithoutParents = view.state.doc.slice(view.state.selection.from, view.state.selection.to, false).content

        const children = []
        for (let i = 0; i < fragmentWithoutParents.childCount; i++) {
            children.push(fragmentWithoutParents.child(i))
        }

        isWithinBlockContent =
            children.find(
                child =>
                    child.type.name === 'blockContainer' || child.type.name === 'blockGroup' || child.type.spec.group === 'blockContent'
            ) === undefined
        if (isWithinBlockContent) {
            selectedFragment = fragmentWithoutParents
        }
    }

    let externalHTML: string

    const externalHTMLExporter = createExternalHTMLExporter(view.state.schema, editor)

    if (isWithinTable) {
        if (selectedFragment.firstChild?.type.name === 'table') {
            // contentNodeToTableContent expects the fragment of the content of a table, not the table node itself
            // but cellselection.content() returns the table node itself if all cells and columns are selected
            selectedFragment = selectedFragment.firstChild.content
        }

        // first convert selection to miaomadoc-style table content, and then
        // pass this to the exporter
        const ic = contentNodeToTableContent(selectedFragment as any, editor.schema.inlineContentSchema, editor.schema.styleSchema)

        externalHTML = externalHTMLExporter.exportInlineContent(ic as any, {})
    } else if (isWithinBlockContent) {
        // first convert selection to miaomadoc-style inline content, and then
        // pass this to the exporter
        const ic = contentNodeToInlineContent(selectedFragment as any, editor.schema.inlineContentSchema, editor.schema.styleSchema)
        externalHTML = externalHTMLExporter.exportInlineContent(ic, {})
    } else {
        const blocks = fragmentToBlocks(selectedFragment, editor.schema)
        externalHTML = externalHTMLExporter.exportBlocks(blocks, {})
    }
    return externalHTML
}

export function selectedFragmentToHTML<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    view: EditorView,
    editor: MiaomaDocEditor<BSchema, I, S>
): {
    clipboardHTML: string
    externalHTML: string
    markdown: string
} {
    // Checks if a `blockContent` node is being copied and expands
    // the selection to the parent `blockContainer` node. This is
    // for the use-case in which only a block without content is
    // selected, e.g. an image block.
    if ('node' in view.state.selection && (view.state.selection.node as Node).type.spec.group === 'blockContent') {
        editor.dispatch(
            editor._tiptapEditor.state.tr.setSelection(new NodeSelection(view.state.doc.resolve(view.state.selection.from - 1)))
        )
    }

    // Uses default ProseMirror clipboard serialization.
    const clipboardHTML: string = (pmView as any).__serializeForClipboard(view, view.state.selection.content()).dom.innerHTML

    const selectedFragment = view.state.selection.content().content

    const externalHTML = fragmentToExternalHTML<BSchema, I, S>(view, selectedFragment, editor)

    const markdown = cleanHTMLToMarkdown(externalHTML)

    return { clipboardHTML, externalHTML, markdown }
}

const copyToClipboard = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>,
    view: EditorView,
    event: ClipboardEvent
) => {
    // Stops the default browser copy behaviour.
    event.preventDefault()
    event.clipboardData!.clearData()

    const { clipboardHTML, externalHTML, markdown } = selectedFragmentToHTML(view, editor)

    // TODO: Writing to other MIME types not working in Safari for
    //  some reason.
    event.clipboardData!.setData('miaomadoc/html', clipboardHTML)
    event.clipboardData!.setData('text/html', externalHTML)
    event.clipboardData!.setData('text/plain', markdown)
}

export const createCopyToClipboardExtension = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>
) =>
    Extension.create<{ editor: MiaomaDocEditor<BSchema, I, S> }, undefined>({
        name: 'copyToClipboard',
        addProseMirrorPlugins() {
            return [
                new Plugin({
                    props: {
                        handleDOMEvents: {
                            copy(view, event) {
                                copyToClipboard(editor, view, event)
                                // Prevent default PM handler to be called
                                return true
                            },
                            cut(view, event) {
                                copyToClipboard(editor, view, event)
                                view.dispatch(view.state.tr.deleteSelection())
                                // Prevent default PM handler to be called
                                return true
                            },
                            // This is for the use-case in which only a block without content
                            // is selected, e.g. an image block, and dragged (not using the
                            // drag handle).
                            dragstart(view, event) {
                                // Checks if a `NodeSelection` is active.
                                if (!('node' in view.state.selection)) {
                                    return
                                }

                                // Checks if a `blockContent` node is being dragged.
                                if ((view.state.selection.node as Node).type.spec.group !== 'blockContent') {
                                    return
                                }

                                // Expands the selection to the parent `blockContainer` node.
                                editor.dispatch(
                                    editor._tiptapEditor.state.tr.setSelection(
                                        new NodeSelection(view.state.doc.resolve(view.state.selection.from - 1))
                                    )
                                )

                                // Stops the default browser drag start behaviour.
                                event.preventDefault()
                                event.dataTransfer!.clearData()

                                const { clipboardHTML, externalHTML, markdown } = selectedFragmentToHTML(view, editor)

                                // TODO: Writing to other MIME types not working in Safari for
                                //  some reason.
                                event.dataTransfer!.setData('miaomadoc/html', clipboardHTML)
                                event.dataTransfer!.setData('text/html', externalHTML)
                                event.dataTransfer!.setData('text/plain', markdown)

                                // Prevent default PM handler to be called
                                return true
                            },
                        },
                    },
                }),
            ]
        },
    })
