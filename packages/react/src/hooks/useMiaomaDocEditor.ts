import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  MiaomaDocEditor,
  PageDocSchema,
  StyleSchema,
} from '@page-doc/core'

import { usePageDocContext } from '../editor/PageDocContext'

/**
 * Get the MiaomaDocEditor instance from the nearest PageDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe MiaomaDocEditor if you're using a custom schema
 */
export function useMiaomaDocEditor<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(_schema?: PageDocSchema<BSchema, ISchema, SSchema>): MiaomaDocEditor<BSchema, ISchema, SSchema> {
  const context = usePageDocContext(_schema)

  if (!context?.editor) {
    throw new Error('useMiaomaDocEditor was called outside of a PageDocContext provider or PageDocView component')
  }

  return context.editor
}
