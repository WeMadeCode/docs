import { PageDocEditor, StyleSchema } from '@page-doc/core'
import { useState } from 'react'

import { usePageDocContext } from '../editor/PageDocContext'
import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useActiveStyles<T extends StyleSchema>(editor?: PageDocEditor<any, any, T>) {
  const editorContext = usePageDocContext<any, any, T>()
  if (!editor) {
    editor = editorContext?.editor
  }

  if (!editor) {
    throw new Error("'editor' is required, either from PageDocContext or as a function argument")
  }

  const e = editor

  const [styles, setStyles] = useState(() => e.getActiveStyles())

  // Updates state on editor content change.
  useEditorChange(() => {
    setStyles(e.getActiveStyles())
  }, e)

  // Updates state on selection change.
  useEditorSelectionChange(() => {
    setStyles(e.getActiveStyles())
  }, e)

  return styles
}
