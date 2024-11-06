/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { useEffect, useRef } from 'react'

// Hook which closes the suggestion after a certain number of consecutive
// invalid queries are made. An invalid query is one which returns no items, and
// each invalid query must be longer than the previous one to close the menu
export function useCloseSuggestionMenuNoItems<Item>(
    items: Item[],
    usedQuery: string | undefined,
    closeMenu: () => void,
    invalidQueries = 3
) {
    const lastUsefulQueryLength = useRef(0)

    useEffect(() => {
        if (usedQuery === undefined) {
            return
        }

        if (items.length > 0) {
            lastUsefulQueryLength.current = usedQuery.length
        } else if (usedQuery.length - lastUsefulQueryLength.current > invalidQueries) {
            closeMenu()
        }
    }, [closeMenu, invalidQueries, items.length, usedQuery])
}
