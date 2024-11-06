/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { BlockSchema, getDefaultEmojiPickerItems, InlineContentSchema, MiaomaDocEditor, StyleSchema } from '@miaoma-doc/core'

import { DefaultReactGridSuggestionItem } from './types'

export async function getDefaultReactEmojiPickerItems<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>,
    query: string
): Promise<DefaultReactGridSuggestionItem[]> {
    return (await getDefaultEmojiPickerItems(editor, query)).map(({ id, onItemClick }) => ({
        id,
        onItemClick,
        icon: id as any,
    }))
}
