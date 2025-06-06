/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Extension, Extensions, extensions } from '@tiptap/core'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { Dropcursor } from '@tiptap/extension-dropcursor'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { HardBreak } from '@tiptap/extension-hard-break'
import { History } from '@tiptap/extension-history'
import { Link } from '@tiptap/extension-link'
import { Text } from '@tiptap/extension-text'
import * as Y from 'yjs'

import { createDropFileExtension } from '../api/clipboard/fromClipboard/fileDropExtension'
import { createPasteFromClipboardExtension } from '../api/clipboard/fromClipboard/pasteExtension'
import { createCopyToClipboardExtension } from '../api/clipboard/toClipboard/copyExtension'
import { BackgroundColorExtension } from '../extensions/BackgroundColor/BackgroundColorExtension'
import { KeyboardShortcutsExtension } from '../extensions/KeyboardShortcuts/KeyboardShortcutsExtension'
import { TextAlignmentExtension } from '../extensions/TextAlignment/TextAlignmentExtension'
import { TextColorExtension } from '../extensions/TextColor/TextColorExtension'
import { TrailingNode } from '../extensions/TrailingNode/TrailingNodeExtension'
import UniqueID from '../extensions/UniqueID/UniqueID'
import { BlockContainer, BlockGroup, Doc } from '../pm-nodes/index'
import {
    BlockSchema,
    BlockSpecs,
    InlineContentSchema,
    InlineContentSpecs,
    MiaomaDocDOMAttributes,
    StyleSchema,
    StyleSpecs,
} from '../schema/index'
import type { MiaomaDocEditor } from './MiaomaDocEditor'

/**
 * Get all the Tiptap extensions MiaomaDoc is configured with by default
 */
export const getMiaomaDocExtensions = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(opts: {
    editor: MiaomaDocEditor<BSchema, I, S>
    domAttributes: Partial<MiaomaDocDOMAttributes>
    blockSpecs: BlockSpecs
    inlineContentSpecs: InlineContentSpecs
    styleSpecs: StyleSpecs
    trailingBlock: boolean | undefined
    collaboration?: {
        fragment: Y.XmlFragment
        user: {
            name: string
            color: string
            [key: string]: string
        }
        provider: any
        renderCursor?: (user: any) => HTMLElement
    }
    disableExtensions: string[] | undefined
    setIdAttribute?: boolean
}) => {
    const ret: Extensions = [
        extensions.ClipboardTextSerializer,
        extensions.Commands,
        extensions.Editable,
        extensions.FocusEvents,
        extensions.Tabindex,

        // DevTools,
        Gapcursor,

        // DropCursor,
        UniqueID.configure({
            types: ['blockContainer'],
            setIdAttribute: opts.setIdAttribute,
        }),
        HardBreak.extend({ priority: 10 }),
        // Comments,

        // basics:
        Text,

        // marks:
        Link.extend({
            addKeyboardShortcuts() {
                return {
                    'Mod-k': () => {
                        this.editor.commands.toggleLink({ href: '' })
                        return true
                    },
                }
            },
        }),
        ...Object.values(opts.styleSpecs).map(styleSpec => {
            return styleSpec.implementation.mark
        }),

        TextColorExtension,

        BackgroundColorExtension,
        TextAlignmentExtension,

        // make sure escape blurs editor, so that we can tab to other elements in the host page (accessibility)
        Extension.create({
            name: 'OverrideEscape',
            addKeyboardShortcuts() {
                return {
                    Escape: () => {
                        if (opts.editor.suggestionMenus.shown) {
                            // escape is handled by suggestionmenu
                            return false
                        }
                        return this.editor.commands.blur()
                    },
                }
            },
        }),

        // nodes
        Doc,
        BlockContainer.configure({
            editor: opts.editor,
            domAttributes: opts.domAttributes,
        }),
        KeyboardShortcutsExtension.configure({
            editor: opts.editor,
        }),
        BlockGroup.configure({
            domAttributes: opts.domAttributes,
        }),
        ...Object.values(opts.inlineContentSpecs)
            .filter(a => a.config !== 'link' && a.config !== 'text')
            .map(inlineContentSpec => {
                return inlineContentSpec.implementation!.node.configure({
                    editor: opts.editor as any,
                })
            }),

        ...Object.values(opts.blockSpecs).flatMap(blockSpec => {
            return [
                // dependent nodes (e.g.: tablecell / row)
                ...(blockSpec.implementation.requiredExtensions || []).map(ext =>
                    ext.configure({
                        editor: opts.editor,
                        domAttributes: opts.domAttributes,
                    })
                ),
                // the actual node itself
                blockSpec.implementation.node.configure({
                    editor: opts.editor,
                    domAttributes: opts.domAttributes,
                }),
            ]
        }),
        createCopyToClipboardExtension(opts.editor),
        createPasteFromClipboardExtension(opts.editor),
        createDropFileExtension(opts.editor),

        Dropcursor.configure({ width: 5, color: '#ddeeff' }),
        // This needs to be at the bottom of this list, because Key events (such as enter, when selecting a /command),
        // should be handled before Enter handlers in other components like splitListItem
        ...(opts.trailingBlock === undefined || opts.trailingBlock ? [TrailingNode] : []),
    ]

    if (opts.collaboration) {
        ret.push(
            Collaboration.configure({
                fragment: opts.collaboration.fragment,
            })
        )
        if (opts.collaboration.provider?.awareness) {
            const defaultRender = (user: { color: string; name: string }) => {
                const cursor = document.createElement('span')

                cursor.classList.add('collaboration-cursor__caret')
                cursor.setAttribute('style', `border-color: ${user.color}`)

                const label = document.createElement('span')

                label.classList.add('collaboration-cursor__label')
                label.setAttribute('style', `background-color: ${user.color}`)
                label.insertBefore(document.createTextNode(user.name), null)

                const nonbreakingSpace1 = document.createTextNode('\u2060')
                const nonbreakingSpace2 = document.createTextNode('\u2060')
                cursor.insertBefore(nonbreakingSpace1, null)
                cursor.insertBefore(label, null)
                cursor.insertBefore(nonbreakingSpace2, null)
                return cursor
            }
            ret.push(
                CollaborationCursor.configure({
                    user: opts.collaboration.user,
                    render: opts.collaboration.renderCursor || defaultRender,
                    provider: opts.collaboration.provider,
                })
            )
        }
    } else {
        // disable history extension when collaboration is enabled as Yjs takes care of undo / redo
        ret.push(History)
    }

    const disableExtensions: string[] = opts.disableExtensions || []
    return ret.filter(ex => !disableExtensions.includes(ex.name))
}
