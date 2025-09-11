import {
  defaultBlockSpecs,
  defaultInlineContentSpecs,
  defaultStyleSpecs,
  filterSuggestionItems,
  locales,
  PageDocEditor,
  PageDocSchema,
} from '@page-doc/core'
import { DefaultReactSuggestionItem, SuggestionMenuController, useCreatePageDoc } from '@page-doc/react'
// import {} from '@page-doc/react'
import { PageDocView } from '@page-doc/shadcn'

import { Mention } from '@/blocks/mention'

const schema = PageDocSchema.create({
  inlineContentSpecs: {
    // built-in inline content specs
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
  blockSpecs: {
    // built-in block specs
    ...defaultBlockSpecs,
  },
  styleSpecs: {
    // built-in style specs
    ...defaultStyleSpecs,
  },
})

const getMentionMenuItems = (editor: PageDocEditor) => {
  const menus = [
    {
      icon: <span>👽</span>,
      title: 'heyi',
    },
    {
      icon: <span>🔭</span>,
      title: '妙码',
    },
    {
      icon: <span>🥤</span>,
      title: '小明',
    },
  ]
  return menus.map(menu => ({
    ...menu,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          // @ts-expect-error mention
          type: 'mention',
          props: {
            id: 'heyi',
            title: menu.title,
            icon: menu.icon,
          },
        },
        ' ',
      ])
    },
  })) as DefaultReactSuggestionItem[]
}

export function DocEditorDemo() {
  // tiptap editor
  // const editor = useEditor()   @tiptap/react
  const editor = useCreatePageDoc({
    schema, // 整个编辑器的 schema
    dictionary: locales.zh, // 语言包
    initialContent: undefined, // 初始内容
  })
  return (
    <PageDocView editor={editor}>
      <SuggestionMenuController
        triggerCharacter="@"
        getItems={async query => {
          // @ts-expect-error getItems type
          return filterSuggestionItems(getMentionMenuItems(editor), query)
        }}
      />
    </PageDocView>
  )
}
