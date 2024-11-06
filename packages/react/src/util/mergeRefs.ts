/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
// https://github.com/gregberge/react-merge-refs/blob/main/src/index.tsx
export function mergeRefs<T = any>(refs: Array<React.MutableRefObject<T> | React.LegacyRef<T> | undefined | null>): React.RefCallback<T> {
    return value => {
        refs.forEach(ref => {
            if (typeof ref === 'function') {
                ref(value)
            } else if (ref != null) {
                ;(ref as React.MutableRefObject<T | null>).current = value
            }
        })
    }
}
