/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps, elementOverflow, mergeRefs } from '@miaoma-doc/react'
import { forwardRef, useEffect, useRef } from 'react'

import { cn } from '../lib/utils'
import { useShadCNComponentsContext } from '../ShadCNComponentsContext'

export const SuggestionMenuItem = forwardRef<HTMLDivElement, ComponentProps['SuggestionMenu']['Item']>((props, ref) => {
    const ShadCNComponents = useShadCNComponentsContext()!

    const { className, item, isSelected, onClick, id, ...rest } = props

    assertEmpty(rest)

    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!itemRef.current || !isSelected) {
            return
        }

        const overflow = elementOverflow(itemRef.current, document.querySelector('.bn-suggestion-menu')!)
        if (overflow === 'top') {
            itemRef.current.scrollIntoView(true)
        } else if (overflow === 'bottom') {
            itemRef.current.scrollIntoView(false)
        }
    }, [isSelected])

    return (
        <div
            // Styles from ShadCN DropdownMenuItem component
            className={cn(
                'bn-relative bn-flex bn-cursor-pointer bn-select-none bn-items-center bn-rounded-sm bn-px-2 bn-py-1.5 bn-text-sm bn-outline-none bn-transition-colors focus:bn-bg-accent focus:bn-text-accent-foreground data-[disabled]:bn-pointer-events-none data-[disabled]:bn-opacity-50',
                className
            )}
            ref={mergeRefs([ref, itemRef])}
            id={id}
            onClick={onClick}
            role="option"
            aria-selected={isSelected || undefined}
        >
            {item.icon && (
                <div className="bn-p-3" data-position="left">
                    {item.icon}
                </div>
            )}
            <div className="bn-flex-1">
                <div className="bn-text-sm">{item.title}</div>
                <div className="bn-text-xs">{item.subtext}</div>
            </div>
            {item.badge && (
                <div data-position="right" className="bn-text-xs">
                    <ShadCNComponents.Badge.Badge variant="secondary">{item.badge}</ShadCNComponents.Badge.Badge>
                </div>
            )}
        </div>
    )
})
