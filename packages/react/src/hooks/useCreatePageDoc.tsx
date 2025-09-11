import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  PageDocEditor,
  PageDocEditorOptions,
  StyleSchema,
} from '@page-doc/core'
import { DependencyList, useMemo } from 'react'

/**
 * Main hook for importing a PageDoc editor into a React project
 *
 * TODO: document in docs
 */
export const useCreatePageDoc = <
  BSchema extends BlockSchema = DefaultBlockSchema,
  ISchema extends InlineContentSchema = DefaultInlineContentSchema,
  SSchema extends StyleSchema = DefaultStyleSchema,
>(
  options: Partial<PageDocEditorOptions<BSchema, ISchema, SSchema>> = {},
  deps: DependencyList = []
) => {
  return useMemo(() => {
    const editor = PageDocEditor.create<BSchema, ISchema, SSchema>(options)
    if (window) {
      // for testing / dev purposes
      ;(window as any).ProseMirror = editor._tiptapEditor
    }
    return editor
  }, deps)
}
