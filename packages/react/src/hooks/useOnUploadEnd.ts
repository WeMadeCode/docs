import { useEffect } from 'react'

import { usePageDocEditor } from './usePageDocEditor'

export function useOnUploadEnd(callback: (blockId?: string) => void) {
  const editor = usePageDocEditor()

  useEffect(() => {
    return editor.onUploadEnd(callback)
  }, [callback, editor])
}
