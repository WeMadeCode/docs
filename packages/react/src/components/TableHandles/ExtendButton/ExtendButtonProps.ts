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
    MiaomaDocEditor,
    StyleSchema,
    TableHandlesState,
} from '@miaoma-doc/core'

export type ExtendButtonProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
    editor: MiaomaDocEditor<
        {
            table: DefaultBlockSchema['table']
        },
        I,
        S
    >
    onMouseDown: () => void
    onMouseUp: () => void
    orientation: 'addOrRemoveRows' | 'addOrRemoveColumns'
} & Pick<TableHandlesState<I, S>, 'block'>
