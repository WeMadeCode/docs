/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { useEffect, useRef } from 'react'

const DEFAULT_EVENTS = ['mousedown', 'touchstart']

export function useClickOutside<T extends HTMLElement = any>(
    handler: () => void,
    events?: string[] | null,
    nodes?: (HTMLElement | null)[]
) {
    const ref = useRef<T>()

    useEffect(() => {
        const listener = (event: any) => {
            const { target } = event ?? {}
            if (Array.isArray(nodes)) {
                const shouldIgnore =
                    target?.hasAttribute('data-ignore-outside-clicks') || (!document.body.contains(target) && target.tagName !== 'HTML')
                const shouldTrigger = nodes.every(node => !!node && !event.composedPath().includes(node))
                if (shouldTrigger && !shouldIgnore) {
                    handler()
                }
            } else if (ref.current && !ref.current.contains(target)) {
                handler()
            }
        }

        ;(events || DEFAULT_EVENTS).forEach(fn => document.addEventListener(fn, listener))

        return () => {
            ;(events || DEFAULT_EVENTS).forEach(fn => document.removeEventListener(fn, listener))
        }
    }, [ref, handler, nodes])

    return ref
}
