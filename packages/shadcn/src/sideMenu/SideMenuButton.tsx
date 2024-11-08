/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps } from '@miaoma-doc/react'
import { forwardRef } from 'react'

import { cn } from '../lib/utils'
import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const SideMenuButton = forwardRef<HTMLButtonElement, ComponentProps['SideMenu']['Button']>((props, ref) => {
    const { className, children, icon, onClick, onDragEnd, onDragStart, draggable, label, ...rest } = props

    // false, because rest props can be added by ariakit when button is used as a trigger
    // assertEmpty in this case is only used at typescript level, not runtime level
    assertEmpty(rest, false)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Button.Button
            variant={'ghost'}
            className={cn(className, 'bn-text-gray-400')}
            ref={ref}
            aria-label={label}
            onClick={onClick}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            draggable={draggable}
            {...rest}
        >
            {icon}
            {children}
        </ShadCNComponents.Button.Button>
    )
})
