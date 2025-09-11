import { BlockSchema, getDefaultEmojiPickerItems, InlineContentSchema, PageDocEditor, StyleSchema } from '@page-doc/core'

import { DefaultReactGridSuggestionItem } from './types'

export async function getDefaultReactEmojiPickerItems<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
  editor: PageDocEditor<BSchema, I, S>,
  query: string
): Promise<DefaultReactGridSuggestionItem[]> {
  return (await getDefaultEmojiPickerItems(editor, query)).map(({ id, onItemClick }) => ({
    id,
    onItemClick,
    icon: id as any,
  }))
}
