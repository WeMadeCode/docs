/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

export const GridSuggestionMenuLoader = forwardRef<HTMLDivElement, ComponentProps['GridSuggestionMenu']['Loader']>((props, ref) => {
    const {
        className,
        children, // unused, using "dots" instead
        columns,
        ...rest
    } = props

    assertEmpty(rest)

    return (
        <div className={className} style={{ gridColumn: `1 / ${columns + 1}` }} ref={ref}>
            {children}
        </div>
    )
})
