/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    SpecificBlock,
    StyleSchema,
} from '@miaoma-doc/core'

export type TableHandleMenuProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
    orientation: 'row' | 'column'
    block: SpecificBlock<{ table: DefaultBlockSchema['table'] }, 'table', I, S>
    index: number
}
