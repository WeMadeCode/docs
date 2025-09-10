import type { MiaomaDocEditor } from '@page-doc/core'

import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useEditorContentOrSelectionChange(callback: () => void, editor?: MiaomaDocEditor<any, any, any>) {
  useEditorChange(callback, editor)
  useEditorSelectionChange(callback, editor)
}
