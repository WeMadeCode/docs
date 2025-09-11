import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  PageDocEditor,
  PageDocSchema,
  StyleSchema,
} from '@page-doc/core'

import { usePageDocContext } from '../editor/PageDocContext'

/**
 * Get the PageDocEditor instance from the nearest PageDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe PageDocEditor if you're using a custom schema
 */
export function usePageDocEditor<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(_schema?: PageDocSchema<BSchema, ISchema, SSchema>): PageDocEditor<BSchema, ISchema, SSchema> {
  const context = usePageDocContext(_schema)

  if (!context?.editor) {
    throw new Error('usePageDocEditor was called outside of a PageDocContext provider or PageDocView component')
  }

  return context.editor
}
