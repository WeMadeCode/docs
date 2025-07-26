import { useEffect } from 'react'

import { useMiaomaDocEditor } from './useMiaomaDocEditor'

export function useOnUploadEnd(callback: (blockId?: string) => void) {
  const editor = useMiaomaDocEditor()

  useEffect(() => {
    return editor.onUploadEnd(callback)
  }, [callback, editor])
}
