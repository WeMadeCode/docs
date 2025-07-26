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
