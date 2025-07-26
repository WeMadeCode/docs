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
