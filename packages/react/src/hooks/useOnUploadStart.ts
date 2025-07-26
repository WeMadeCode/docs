import { useEffect } from 'react'

import { useMiaomaDocEditor } from './useMiaomaDocEditor'

export function useOnUploadStart(callback: (blockId?: string) => void) {
  const editor = useMiaomaDocEditor()

  useEffect(() => {
    return editor.onUploadStart(callback)
  }, [callback, editor])
}
