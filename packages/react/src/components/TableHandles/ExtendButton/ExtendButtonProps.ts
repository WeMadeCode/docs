import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  PageDocEditor,
  StyleSchema,
  TableHandlesState,
} from '@page-doc/core'

export type ExtendButtonProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
  editor: PageDocEditor<
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
