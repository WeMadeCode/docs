/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { DefaultSuggestionItem } from '@miaoma-doc/core'

/**
 * Although any arbitrary data can be passed as suggestion items, the built-in
 * UI components such as `MantineSuggestionMenu` expect a shape that conforms to DefaultSuggestionItem
 */
export type DefaultReactSuggestionItem = Omit<DefaultSuggestionItem, 'key'> & {
    icon?: JSX.Element
}

/**
 * Props passed to a suggestion menu component
 */
// TODO: onItemClick should be required when T extends
//  DefaultReactSuggestionItem
export type SuggestionMenuProps<T> = {
    items: T[]
    loadingState: 'loading-initial' | 'loading' | 'loaded'
    selectedIndex: number | undefined
    onItemClick?: (item: T) => void
}
