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
import { FC } from 'react'

import { useMiaomaDocEditor } from '../../hooks/useMiaomaDocEditor'
import { useUIElementPositioning } from '../../hooks/useUIElementPositioning'
import { useUIPluginState } from '../../hooks/useUIPluginState'
import { SideMenu } from './SideMenu'
import { SideMenuProps } from './SideMenuProps'

export const SideMenuController = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(props: {
    sideMenu?: FC<SideMenuProps<BSchema, I, S>>
}) => {
    const editor = useMiaomaDocEditor<BSchema, I, S>()

    const callbacks = {
        blockDragStart: editor.sideMenu.blockDragStart,
        blockDragEnd: editor.sideMenu.blockDragEnd,
        freezeMenu: editor.sideMenu.freezeMenu,
        unfreezeMenu: editor.sideMenu.unfreezeMenu,
    }

    const state = useUIPluginState(editor.sideMenu.onUpdate.bind(editor.sideMenu))
    const { isMounted, ref, style, getFloatingProps } = useUIElementPositioning(state?.show || false, state?.referencePos || null, 1000, {
        placement: 'left-start',
    })

    if (!isMounted || !state) {
        return null
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { show, referencePos, ...data } = state

    const Component = props.sideMenu || SideMenu

    return (
        <div ref={ref} style={style} {...getFloatingProps()}>
            <Component {...data} {...callbacks} editor={editor} />
        </div>
    )
}
