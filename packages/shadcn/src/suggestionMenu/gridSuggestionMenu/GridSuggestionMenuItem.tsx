/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { assertEmpty } from '@miaoma-doc/core'
import { ComponentProps, elementOverflow, mergeRefs } from '@miaoma-doc/react'
import { forwardRef, useEffect, useRef } from 'react'

export const GridSuggestionMenuItem = forwardRef<HTMLDivElement, ComponentProps['GridSuggestionMenu']['Item']>((props, ref) => {
    const { className, isSelected, onClick, item, id, ...rest } = props

    assertEmpty(rest)

    const itemRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!itemRef.current || !isSelected) {
            return
        }

        const overflow = elementOverflow(itemRef.current, document.querySelector('.bn-grid-suggestion-menu')!)

        if (overflow === 'top') {
            itemRef.current.scrollIntoView(true)
        } else if (overflow === 'bottom') {
            itemRef.current.scrollIntoView(false)
        }
    }, [isSelected])

    return (
        <div
            className={className}
            ref={mergeRefs([ref, itemRef])}
            id={id}
            role="option"
            onClick={onClick}
            aria-selected={isSelected || undefined}
        >
            {item.icon}
        </div>
    )
})
