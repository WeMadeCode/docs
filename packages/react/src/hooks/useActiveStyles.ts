/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { MiaomaDocEditor, StyleSchema } from '@miaoma-doc/core'
import { useState } from 'react'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'
import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useActiveStyles<T extends StyleSchema>(editor?: MiaomaDocEditor<any, any, T>) {
    const editorContext = useMiaomaDocContext<any, any, T>()
    if (!editor) {
        editor = editorContext?.editor
    }

    if (!editor) {
        throw new Error("'editor' is required, either from MiaomaDocContext or as a function argument")
    }

    const e = editor

    const [styles, setStyles] = useState(() => e.getActiveStyles())

    // Updates state on editor content change.
    useEditorChange(() => {
        setStyles(e.getActiveStyles())
    }, e)

    // Updates state on selection change.
    useEditorSelectionChange(() => {
        setStyles(e.getActiveStyles())
    }, e)

    return styles
}
