import type { PageDocEditor } from '@page-doc/core'

import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useEditorContentOrSelectionChange(callback: () => void, editor?: PageDocEditor<any, any, any>) {
  useEditorChange(callback, editor)
  useEditorSelectionChange(callback, editor)
}
