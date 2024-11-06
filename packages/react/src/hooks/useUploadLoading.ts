/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { useState } from 'react'

import { useOnUploadEnd } from './useOnUploadEnd'
import { useOnUploadStart } from './useOnUploadStart'

export function useUploadLoading(blockId?: string) {
    const [showLoader, setShowLoader] = useState(false)

    useOnUploadStart(uploadBlockId => {
        if (uploadBlockId === blockId) {
            setShowLoader(true)
        }
    })

    useOnUploadEnd(uploadBlockId => {
        if (uploadBlockId === blockId) {
            setShowLoader(false)
        }
    })

    return showLoader
}
