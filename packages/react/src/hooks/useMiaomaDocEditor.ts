import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  MiaomaDocEditor,
  MiaomaDocSchema,
  StyleSchema,
} from '@page-doc/core'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'

/**
 * Get the MiaomaDocEditor instance from the nearest MiaomaDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe MiaomaDocEditor if you're using a custom schema
 */
export function useMiaomaDocEditor<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(_schema?: MiaomaDocSchema<BSchema, ISchema, SSchema>): MiaomaDocEditor<BSchema, ISchema, SSchema> {
  const context = useMiaomaDocContext(_schema)

  if (!context?.editor) {
    throw new Error('useMiaomaDocEditor was called outside of a MiaomaDocContext provider or MiaomaDocView component')
  }

  return context.editor
}
