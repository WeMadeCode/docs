import type { MiaomaDocEditor } from '@miaoma-doc/core'

import { useEditorChange } from './useEditorChange'
import { useEditorSelectionChange } from './useEditorSelectionChange'

export function useEditorContentOrSelectionChange(callback: () => void, editor?: MiaomaDocEditor<any, any, any>) {
  useEditorChange(callback, editor)
  useEditorSelectionChange(callback, editor)
}
