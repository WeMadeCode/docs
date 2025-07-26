import type { MiaomaDocEditor } from '@miaoma-doc/core'
import { useEffect } from 'react'

import { useMiaomaDocContext } from '../editor/MiaomaDocContext'

export function useEditorChange(callback: () => void, editor?: MiaomaDocEditor<any, any, any>) {
  const editorContext = useMiaomaDocContext()
  if (!editor) {
    editor = editorContext?.editor
  }

  useEffect(() => {
    if (!editor) {
      throw new Error("'editor' is required, either from MiaomaDocContext or as a function argument")
    }

    return editor.onChange(callback)
  }, [callback, editor])
}
