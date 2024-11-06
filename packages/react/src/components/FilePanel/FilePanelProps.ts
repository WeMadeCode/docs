/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    FilePanelState,
    InlineContentSchema,
    StyleSchema,
    UiElementPosition,
} from '@miaoma-doc/core'

export type FilePanelProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = Omit<
    FilePanelState<I, S>,
    keyof UiElementPosition
>
