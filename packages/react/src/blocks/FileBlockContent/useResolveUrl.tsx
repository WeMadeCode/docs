/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { BlockSchema, InlineContentSchema, StyleSchema } from '@miaoma-doc/core'
import { useEffect, useState } from 'react'

import { useMiaomaDocEditor } from '../../hooks/useMiaomaDocEditor'

export function useResolveUrl(fetchUrl: string) {
    const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

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
