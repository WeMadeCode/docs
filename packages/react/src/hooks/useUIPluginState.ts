/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { useEffect, useState } from 'react'

export function useUIPluginState<State>(onUpdate: (callback: (state: State) => void) => void): State | undefined {
    const [state, setState] = useState<State>()

    useEffect(() => {
        return onUpdate(state => {
            setState({ ...state })
        })
    }, [onUpdate])

    return state
}
