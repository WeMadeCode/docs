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
} from '@page-doc/core'
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
