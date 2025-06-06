/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import type { Emoji, EmojiMartData } from '@emoji-mart/data'

import { checkDefaultInlineContentTypeInSchema } from '../../blocks/defaultBlockTypeGuards'
import { MiaomaDocEditor } from '../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../schema/index'
import { DefaultGridSuggestionItem } from './DefaultGridSuggestionItem'

let data:
    | Promise<{
          default: EmojiMartData
      }>
    | undefined

let emojiMart: typeof import('emoji-mart') | undefined

export async function getDefaultEmojiPickerItems<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>,
    query: string
): Promise<DefaultGridSuggestionItem[]> {
    if (!checkDefaultInlineContentTypeInSchema('text', editor)) {
        return []
    }

    if (!data) {
        // use a dynamic import to encourage bundle-splitting
        // and a smaller initial client bundle size

        data = import('@emoji-mart/data') as any

        // load dynamically because emoji-mart doesn't specify type: module and breaks in nodejs
        emojiMart = await import('emoji-mart')
        const emojiMartData = (await data)!.default
        await emojiMart.init({ data: emojiMartData })
    }

    const emojiMartData = (await data)!.default

    const emojisToShow =
        query.trim() === '' ? Object.values(emojiMartData.emojis) : ((await emojiMart!.SearchIndex.search(query)) as Emoji[])

    return emojisToShow.map(emoji => ({
        id: emoji.skins[0].native,
        onItemClick: () => editor.insertInlineContent(emoji.skins[0].native + ' '),
    }))
}
