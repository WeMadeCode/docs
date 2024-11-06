/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import type { MiaomaDocEditor } from '@miaoma-doc/core'

import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useEditorContentOrSelectionChange(callback: () => void, editor?: MiaomaDocEditor<any, any, any>) {
    useEditorChange(callback, editor)
    useEditorSelectionChange(callback, editor)
}
