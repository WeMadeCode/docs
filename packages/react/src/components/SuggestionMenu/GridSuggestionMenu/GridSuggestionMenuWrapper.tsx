import { BlockSchema, InlineContentSchema, StyleSchema } from '@miaoma-doc/core'
import { FC, useCallback, useEffect } from 'react'

import { useMiaomaDocContext } from '../../../editor/MiaomaDocContext'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useCloseSuggestionMenuNoItems } from '../hooks/useCloseSuggestionMenuNoItems'
import { useLoadSuggestionMenuItems } from '../hooks/useLoadSuggestionMenuItems'
import { useGridSuggestionMenuKeyboardNavigation } from './hooks/useGridSuggestionMenuKeyboardNavigation'
import { GridSuggestionMenuProps } from './types'

export function GridSuggestionMenuWrapper<Item>(props: {
  query: string
  closeMenu: () => void
  clearQuery: () => void
  getItems: (query: string) => Promise<Item[]>
  columns: number
  onItemClick?: (item: Item) => void
  gridSuggestionMenuComponent: FC<GridSuggestionMenuProps<Item>>
}) {
  const ctx = useMiaomaDocContext()
  const setContentEditableProps = ctx!.setContentEditableProps!
  const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

  const { getItems, gridSuggestionMenuComponent, query, clearQuery, closeMenu, onItemClick, columns } = props

  const onItemClickCloseMenu = useCallback(
    (item: Item) => {
      closeMenu()
      clearQuery()
      onItemClick?.(item)
    },
    [onItemClick, closeMenu, clearQuery]
  )

  const { items, usedQuery, loadingState } = useLoadSuggestionMenuItems(query, getItems)

  useCloseSuggestionMenuNoItems(items, usedQuery, closeMenu)

  const { selectedIndex } = useGridSuggestionMenuKeyboardNavigation(editor, query, items, columns, onItemClickCloseMenu)

  // set basic aria attributes when the menu is open
  useEffect(() => {
    setContentEditableProps(p => ({
      ...p,
      'aria-expanded': true,
      'aria-controls': 'bn-suggestion-menu',
    }))
    return () => {
      setContentEditableProps(p => ({
        ...p,
        'aria-expanded': false,
        'aria-controls': undefined,
      }))
    }
  }, [setContentEditableProps])

  // set selected item (active descendent) attributes when selected item changes
  useEffect(() => {
    setContentEditableProps(p => ({
      ...p,
      'aria-activedescendant': selectedIndex ? 'bn-suggestion-menu-item-' + selectedIndex : undefined,
    }))
    return () => {
      setContentEditableProps(p => ({
        ...p,
        'aria-activedescendant': undefined,
      }))
    }
  }, [setContentEditableProps, selectedIndex])

  const Component = gridSuggestionMenuComponent

  return (
    <Component
      items={items}
      onItemClick={onItemClickCloseMenu}
      loadingState={loadingState}
      selectedIndex={selectedIndex}
      columns={columns}
    />
  )
}
