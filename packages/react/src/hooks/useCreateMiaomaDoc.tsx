/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    MiaomaDocEditor,
    MiaomaDocEditorOptions,
    StyleSchema,
} from '@miaoma-doc/core'
import { DependencyList, useMemo } from 'react'

/**
 * Main hook for importing a MiaomaDoc editor into a React project
 *
 * TODO: document in docs
 */
export const useCreateMiaomaDoc = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
>(
    options: Partial<MiaomaDocEditorOptions<BSchema, ISchema, SSchema>> = {},
    deps: DependencyList = []
) => {
    return useMemo(() => {
        const editor = MiaomaDocEditor.create<BSchema, ISchema, SSchema>(options)
        if (window) {
            // for testing / dev purposes
            ;(window as any).ProseMirror = editor._tiptapEditor
        }
        return editor
    }, deps)
}

/**
 * @deprecated use useCreateMiaomaDoc instead
 */
export const useMiaomaDoc = useCreateMiaomaDoc
