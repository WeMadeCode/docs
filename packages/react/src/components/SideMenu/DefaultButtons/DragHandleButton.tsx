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
import { MdDragIndicator } from 'react-icons/md'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useDictionary } from '../../../i18n/dictionary'
import { DragHandleMenu } from '../DragHandleMenu/DragHandleMenu'
import { SideMenuProps } from '../SideMenuProps'

export const DragHandleButton = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: Omit<SideMenuProps<BSchema, I, S>, 'addBlock'>
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const Component = props.dragHandleMenu || DragHandleMenu

    return (
        <Components.Generic.Menu.Root
            onOpenChange={(open: boolean) => {
                if (open) {
                    props.freezeMenu()
                } else {
                    props.unfreezeMenu()
                }
            }}
            position={'left'}
        >
            <Components.Generic.Menu.Trigger>
                <Components.SideMenu.Button
                    label={dict.side_menu.drag_handle_label}
                    draggable={true}
                    onDragStart={props.blockDragStart}
                    onDragEnd={props.blockDragEnd}
                    className={'bn-button'}
                    icon={<MdDragIndicator size={24} data-test="dragHandle" />}
                />
            </Components.Generic.Menu.Trigger>
            <Component block={props.block} />
        </Components.Generic.Menu.Root>
    )
}
