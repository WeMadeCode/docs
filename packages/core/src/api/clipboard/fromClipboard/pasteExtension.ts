/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

import type { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { nestedListsToMiaomaDocStructure } from '../../parsers/html/util/nestedLists'
import { acceptedMIMETypes } from './acceptedMIMETypes'
import { handleFileInsertion } from './handleFileInsertion'
import { handleVSCodePaste } from './handleVSCodePaste'

export const createPasteFromClipboardExtension = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>
) =>
    Extension.create<{ editor: MiaomaDocEditor<BSchema, I, S> }, undefined>({
        name: 'pasteFromClipboard',
        addProseMirrorPlugins() {
            return [
                new Plugin({
                    props: {
                        handleDOMEvents: {
                            paste(_view, event) {
                                event.preventDefault()

                                if (!editor.isEditable) {
                                    return
                                }

                                let format: (typeof acceptedMIMETypes)[number] | undefined
                                for (const mimeType of acceptedMIMETypes) {
                                    if (event.clipboardData!.types.includes(mimeType)) {
                                        format = mimeType
                                        break
                                    }
                                }
                                if (!format) {
                                    return true
                                }

                                if (format === 'vscode-editor-data') {
                                    handleVSCodePaste(event, editor)
                                    return true
                                }

                                if (format === 'Files') {
                                    handleFileInsertion(event, editor)
                                    return true
                                }

                                let data = event.clipboardData!.getData(format)

                                if (format === 'miaomadoc/html') {
                                    editor._tiptapEditor.view.pasteHTML(data)
                                    return true
                                }

                                if (format === 'text/html') {
                                    const htmlNode = nestedListsToMiaomaDocStructure(data.trim())
                                    data = htmlNode.innerHTML
                                    editor._tiptapEditor.view.pasteHTML(data)
                                    return true
                                }

                                editor._tiptapEditor.view.pasteText(data)

                                return true
                            },
                        },
                    },
                }),
            ]
        },
    })
