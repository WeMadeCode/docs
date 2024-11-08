/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'

export const SuggestionMenuEmptyItem = forwardRef<HTMLDivElement, ComponentProps['SuggestionMenu']['EmptyItem']>((props, ref) => {
    const { className, children, ...rest } = props

    assertEmpty(rest)

    return (
        <div
            // Styles from ShadCN DropdownMenuItem component
            className={cn(
                'bn-relative bn-flex bn-cursor-default bn-select-none bn-items-center bn-rounded-sm bn-px-2 bn-py-1.5 bn-text-sm bn-outline-none bn-transition-colors focus:bn-bg-accent focus:bn-text-accent-foreground data-[disabled]:bn-pointer-events-none data-[disabled]:bn-opacity-50',
                className
            )}
            ref={ref}
        >
            <div>{children}</div>
        </div>
    )
})
