/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { forwardRef, useImperativeHandle, useState } from 'react'
import { createPortal, flushSync } from 'react-dom'

/**
 * A helper component to render a single element to a container so we can subsequently read the DOM / HTML contents
 *
 * This is useful so we can render arbitrary React elements (blocks) in the correct context (used by `ReactRenderUtil`)
 */
export const ElementRenderer = forwardRef<(node: React.ReactNode, container: HTMLElement) => void>((_props, ref) => {
    const [singleRenderData, setSingleRenderData] = useState<{ node: React.ReactNode; container: HTMLElement } | undefined>()

    useImperativeHandle(ref, () => {
        return (node: React.ReactNode, container: HTMLElement) => {
            flushSync(() => {
                setSingleRenderData({ node, container })
            })

            // clear after it's been rendered to `container`
            setSingleRenderData(undefined)
        }
    }, [])

    return <>{singleRenderData && createPortal(singleRenderData.node, singleRenderData.container)}</>
})
