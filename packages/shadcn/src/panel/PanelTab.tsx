/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'

export const PanelTab = forwardRef<HTMLDivElement, ComponentProps['FilePanel']['TabPanel']>((props, ref) => {
    const { className, children, ...rest } = props

    assertEmpty(rest)

    return (
        <div className={cn(className, 'bn-flex bn-flex-col bn-gap-2 bn-items-start bn-justify-center')} ref={ref}>
            {children}
        </div>
    )
})
