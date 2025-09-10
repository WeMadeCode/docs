import {
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  FilePanelState,
  InlineContentSchema,
  StyleSchema,
  UiElementPosition,
} from '@page-doc/core'

export type FilePanelProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = Omit<
  FilePanelState<I, S>,
  keyof UiElementPosition
>
