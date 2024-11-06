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
    MiaomaDocEditor,
    SideMenuState,
    StyleSchema,
    UiElementPosition,
} from '@miaoma-doc/core'
import { FC } from 'react'

import { DragHandleMenuProps } from './DragHandleMenu/DragHandleMenuProps'

export type SideMenuProps<
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
> = {
    editor: MiaomaDocEditor<BSchema, I, S>
    dragHandleMenu?: FC<DragHandleMenuProps<BSchema, I, S>>
} & Omit<SideMenuState<BSchema, I, S>, keyof UiElementPosition> &
    Pick<MiaomaDocEditor<BSchema, I, S>['sideMenu'], 'blockDragStart' | 'blockDragEnd' | 'freezeMenu' | 'unfreezeMenu'>
