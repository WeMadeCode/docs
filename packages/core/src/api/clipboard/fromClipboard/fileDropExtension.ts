/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

import type { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { acceptedMIMETypes } from './acceptedMIMETypes'
import { handleFileInsertion } from './handleFileInsertion'

export const createDropFileExtension = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>
) =>
    Extension.create<{ editor: MiaomaDocEditor<BSchema, I, S> }, undefined>({
        name: 'dropFile',
        addProseMirrorPlugins() {
            return [
                new Plugin({
                    props: {
                        handleDOMEvents: {
                            drop(_view, event) {
                                if (!editor.isEditable) {
                                    return
                                }

                                let format: (typeof acceptedMIMETypes)[number] | null = null
                                for (const mimeType of acceptedMIMETypes) {
                                    if (event.dataTransfer!.types.includes(mimeType)) {
                                        format = mimeType
                                        break
                                    }
                                }
                                if (format === null) {
                                    return true
                                }

                                if (format === 'Files') {
                                    handleFileInsertion(event, editor)
                                    return true
                                }

                                return false
                            },
                        },
                    },
                }),
            ]
        },
    })
