import { Block, BlockSchema, InlineContentSchema, MiaomaDocEditor, StyleSchema } from '@page-doc/core'
import { useState } from 'react'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'
import { useEditorContentOrSelectionChange } from './useEditorContentOrSelectionChange'

export function useSelectedBlocks<BSchema extends BlockSchema, ISchema extends InlineContentSchema, SSchema extends StyleSchema>(
  editor?: MiaomaDocEditor<BSchema, ISchema, SSchema>
) {
  const editorContext = useMiaomaDocContext<BSchema, ISchema, SSchema>()
  if (!editor) {
    editor = editorContext?.editor
  }

  if (!editor) {
    throw new Error("'editor' is required, either from MiaomaDocContext or as a function argument")
  }

  const e = editor

  const [selectedBlocks, setSelectedBlocks] = useState<Block<BSchema, ISchema, SSchema>[]>(
    () => e.getSelection()?.blocks || [e.getTextCursorPosition().block]
  )

  useEditorContentOrSelectionChange(() => setSelectedBlocks(e.getSelection()?.blocks || [e.getTextCursorPosition().block]), e)

  return selectedBlocks
}
