import type { PageDocEditor } from '@page-doc/core'
import { useEffect } from 'react'

import { usePageDocContext } from '../editor/PageDocContext'

export function useEditorChange(callback: () => void, editor?: PageDocEditor<any, any, any>) {
  const editorContext = usePageDocContext()
  if (!editor) {
    editor = editorContext?.editor
  }

  useEffect(() => {
    if (!editor) {
      throw new Error("'editor' is required, either from PageDocContext or as a function argument")
    }

    return editor.onChange(callback)
  }, [callback, editor])
}
