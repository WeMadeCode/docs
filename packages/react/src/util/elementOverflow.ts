/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
export function elementOverflow(element: HTMLElement, container: HTMLElement) {
    const elementRect = element.getBoundingClientRect()
    const parentRect = container.getBoundingClientRect()

    const topOverflow = elementRect.top < parentRect.top
    const bottomOverflow = elementRect.bottom > parentRect.bottom

    return topOverflow && bottomOverflow ? 'both' : topOverflow ? 'top' : bottomOverflow ? 'bottom' : 'none'
}
