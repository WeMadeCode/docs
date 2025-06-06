/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'

export const SuggestionMenu = forwardRef<HTMLDivElement, ComponentProps['SuggestionMenu']['Root']>((props, ref) => {
    const { className, children, id, ...rest } = props

    assertEmpty(rest)

    return (
        <div
            id={id}
            role="listbox"
            // Styles from ShadCN DropdownMenuContent component
            className={cn(
                'bn-z-50 bn-min-w-[8rem] bn-max-h-[200px] bn-overflow-auto bn-rounded-md bn-border bn-bg-popover bn-p-1 bn-text-popover-foreground bn-shadow-md data-[state=open]:bn-animate-in data-[state=closed]:bn-animate-out data-[state=closed]:bn-fade-out-0 data-[state=open]:bn-fade-in-0 data-[state=closed]:bn-zoom-out-95 data-[state=open]:bn-zoom-in-95 data-[side=bottom]:bn-slide-in-from-top-2 data-[side=left]:bn-slide-in-from-right-2 data-[side=right]:bn-slide-in-from-left-2 data-[side=top]:bn-slide-in-from-bottom-2',
                className
            )}
            ref={ref}
        >
            {children}
        </div>
    )
})
