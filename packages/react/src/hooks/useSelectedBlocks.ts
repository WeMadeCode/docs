/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Block, BlockSchema, InlineContentSchema, MiaomaDocEditor, StyleSchema } from '@miaoma-doc/core'
import { useState } from 'react'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'
import { useEditorContentOrSelectionChange } from './useEditorContentOrSelectionChange'

export function useSelectedBlocks<BSchema extends BlockSchema, ISchema extends InlineContentSchema, SSchema extends StyleSchema>(
    editor?: MiaomaDocEditor<BSchema, ISchema, SSchema>
) {
    const editorContext = useMiaomaDocContext<BSchema, ISchema, SSchema>()
    if (!editor) {
        editor = editorContext?.editor
    }

    if (!editor) {
        throw new Error("'editor' is required, either from MiaomaDocContext or as a function argument")
    }

    const e = editor

    const [selectedBlocks, setSelectedBlocks] = useState<Block<BSchema, ISchema, SSchema>[]>(
        () => e.getSelection()?.blocks || [e.getTextCursorPosition().block]
    )

    useEditorContentOrSelectionChange(() => setSelectedBlocks(e.getSelection()?.blocks || [e.getTextCursorPosition().block]), e)

    return selectedBlocks
}
