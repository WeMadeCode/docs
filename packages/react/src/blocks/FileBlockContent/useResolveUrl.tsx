import { BlockSchema, InlineContentSchema, StyleSchema } from '@page-doc/core'
import { useEffect, useState } from 'react'

import { usePageDocEditor } from '../../hooks/usePageDocEditor'

export function useResolveUrl(fetchUrl: string) {
  const editor = usePageDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

  const [loadingState, setLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      let url = ''
      setLoadingState('loading')

      try {
        url = await editor.resolveFileUrl(fetchUrl)
      } catch {
        setLoadingState('error')
        return
      }

      if (mounted) {
        setLoadingState('loaded')
        setDownloadUrl(url)
      }
    })()

    return () => {
      mounted = false
    }
  }, [editor, fetchUrl])

  if (loadingState !== 'loaded') {
    return {
      loadingState,
    }
  }

  if (!downloadUrl) {
    throw new Error('Finished fetching file but did not get download URL.')
  }

  return {
    loadingState,
    downloadUrl,
  }
}
