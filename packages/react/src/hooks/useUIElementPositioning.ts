/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { useDismiss, useFloating, UseFloatingOptions, useInteractions, useTransitionStyles } from '@floating-ui/react'
import { useEffect, useMemo } from 'react'

export function useUIElementPositioning(
    show: boolean,
    referencePos: DOMRect | null,
    zIndex: number,
    options?: Partial<UseFloatingOptions>
) {
    const { refs, update, context, floatingStyles } = useFloating({
        open: show,
        ...options,
    })

    const { isMounted, styles } = useTransitionStyles(context)

    // handle "escape" and other dismiss events, these will add some listeners to
    // getFloatingProps which need to be attached to the floating element
    const dismiss = useDismiss(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([dismiss])

    useEffect(() => {
        update()
    }, [referencePos, update])

    useEffect(() => {
        // Will be null on initial render when used in UI component controllers.
        if (referencePos === null) {
            return
        }

        refs.setReference({
            getBoundingClientRect: () => referencePos,
        })
    }, [referencePos, refs])

    return useMemo(
        () => ({
            isMounted,
            ref: refs.setFloating,
            style: {
                display: 'flex',
                ...styles,
                ...floatingStyles,
                zIndex: zIndex,
            },
            getFloatingProps,
            getReferenceProps,
        }),
        [floatingStyles, isMounted, refs.setFloating, styles, zIndex, getFloatingProps, getReferenceProps]
    )
}
