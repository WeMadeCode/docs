/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    BlockSchema,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    StyleSchema,
} from '@miaoma-doc/core'
import { ReactNode } from 'react'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useDictionary } from '../../../i18n/dictionary'
import { BlockColorsItem } from './DefaultItems/BlockColorsItem'
import { RemoveBlockItem } from './DefaultItems/RemoveBlockItem'
import { DragHandleMenuProps } from './DragHandleMenuProps'

/**
 * By default, the DragHandleMenu component will render with default items.
 * However, you can override the items to render by passing children. The
 * children you pass should be:
 *
 * - Default items: Components found within the `/DefaultItems` directory.
 * - Custom items: The `DragHandleMenuItem` component.
 */
export const DragHandleMenu = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: DragHandleMenuProps<BSchema, I, S> & { children?: ReactNode }
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    return (
        <Components.Generic.Menu.Dropdown className={'bn-menu-dropdown bn-drag-handle-menu'}>
            {props.children || (
                <>
                    <RemoveBlockItem {...props}>{dict.drag_handle.delete_menuitem}</RemoveBlockItem>
                    <BlockColorsItem {...props}>{dict.drag_handle.colors_menuitem}</BlockColorsItem>
                </>
            )}
        </Components.Generic.Menu.Dropdown>
    )
}
