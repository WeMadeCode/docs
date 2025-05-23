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

export const Popover = (props: ComponentProps['Generic']['Popover']['Root']) => {
    const {
        children,
        opened,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        position, // unused
        ...rest
    } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return <ShadCNComponents.Popover.Popover open={opened}>{children}</ShadCNComponents.Popover.Popover>
}

export const PopoverTrigger = forwardRef((props: ComponentProps['Generic']['Popover']['Trigger'], ref: any) => {
    const { children, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Popover.PopoverTrigger ref={ref} asChild={true}>
            {children}
        </ShadCNComponents.Popover.PopoverTrigger>
    )
})

export const PopoverContent = forwardRef<HTMLDivElement, ComponentProps['Generic']['Popover']['Content']>((props, ref) => {
    const { className, variant, children, ...rest } = props

    assertEmpty(rest)

    const ShadCNComponents = useShadCNComponentsContext()!

    return (
        <ShadCNComponents.Popover.PopoverContent
            sideOffset={8}
            className={cn(
                className,
                'bn-flex bn-flex-col bn-gap-2',
                variant === 'panel-popover' ? 'bn-p-0 bn-border-none bn-shadow-none bn-max-w-none bn-w-fit' : ''
            )}
            ref={ref}
        >
            {children}
        </ShadCNComponents.Popover.PopoverContent>
    )
})
