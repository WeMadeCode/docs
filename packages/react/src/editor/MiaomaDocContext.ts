import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  MiaomaDocEditor,
  MiaomaDocSchema,
  StyleSchema,
} from '@miaoma-doc/core'
import { createContext, useContext, useState } from 'react'

type MiaomaDocContextValue<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> = {
  setContentEditableProps?: ReturnType<typeof useState<Record<string, any>>>[1] // copy type of setXXX from useState
  editor?: MiaomaDocEditor<BSchema, ISchema, SSchema>
  colorSchemePreference?: 'light' | 'dark'
}

export const MiaomaDocContext = createContext<MiaomaDocContextValue | undefined>(undefined)

/**
 * Get the MiaomaDocContext instance from the nearest MiaomaDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe Context if you're using a custom schema
 */
export function useMiaomaDocContext<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(_schema?: MiaomaDocSchema<BSchema, ISchema, SSchema>): MiaomaDocContextValue<BSchema, ISchema, SSchema> | undefined {
  const context = useContext(MiaomaDocContext) as any

  return context
}
