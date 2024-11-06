/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import type { MiaomaDocEditor } from '@miaoma-doc/core'
import { useEffect } from 'react'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'

export function useEditorSelectionChange(callback: () => void, editor?: MiaomaDocEditor<any, any, any>) {
    const editorContext = useMiaomaDocContext()
    if (!editor) {
        editor = editorContext?.editor
    }

    useEffect(() => {
        if (!editor) {
            throw new Error("'editor' is required, either from MiaomaDocContext or as a function argument")
        }
        return editor.onSelectionChange(callback)
    }, [callback, editor])
}
