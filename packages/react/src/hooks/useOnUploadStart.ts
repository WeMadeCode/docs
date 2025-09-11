import { useEffect } from 'react'

import { usePageDocEditor } from './usePageDocEditor'

export function useOnUploadStart(callback: (blockId?: string) => void) {
  const editor = usePageDocEditor()

  useEffect(() => {
    return editor.onUploadStart(callback)
  }, [callback, editor])
}
