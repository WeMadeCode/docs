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
import { createContext, useContext, useState } from 'react'

type PageDocContextValue<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
> = {
  setContentEditableProps?: ReturnType<typeof useState<Record<string, any>>>[1] // copy type of setXXX from useState
  editor?: MiaomaDocEditor<BSchema, ISchema, SSchema>
  colorSchemePreference?: 'light' | 'dark'
}

export const PageDocContext = createContext<PageDocContextValue | undefined>(undefined)

/**
 * Get the PageDocContext instance from the nearest PageDocContext provider
 * @param _schema: optional, pass in the schema to return type-safe Context if you're using a custom schema
 */
export function usePageDocContext<
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
>(_schema?: PageDocSchema<BSchema, ISchema, SSchema>): PageDocContextValue<BSchema, ISchema, SSchema> | undefined {
  const context = useContext(PageDocContext) as any

  return context
}
