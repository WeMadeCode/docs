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
    MiaomaDocSchema,
    StyleSchema,
} from '@miaoma-doc/core'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'

/**
 * Get the MiaomaDocEditor instance from the nearest MiaomaDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe MiaomaDocEditor if you're using a custom schema
 */
export function useMiaomaDocEditor<
    BSchema extends BlockSchema = DefaultBlockSchema,
    ISchema extends InlineContentSchema = DefaultInlineContentSchema,
    SSchema extends StyleSchema = DefaultStyleSchema,
>(_schema?: MiaomaDocSchema<BSchema, ISchema, SSchema>): MiaomaDocEditor<BSchema, ISchema, SSchema> {
    const context = useMiaomaDocContext(_schema)

    if (!context?.editor) {
        throw new Error('useMiaomaDocEditor was called outside of a MiaomaDocContext provider or MiaomaDocView component')
    }

    return context.editor
}
