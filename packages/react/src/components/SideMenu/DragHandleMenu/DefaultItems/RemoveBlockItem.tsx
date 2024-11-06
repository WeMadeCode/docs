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

import { useComponentsContext } from '../../../../editor/ComponentsContext'
import { useMiaomaDocEditor } from '../../../../hooks/useMiaomaDocEditor'
import { DragHandleMenuProps } from '../DragHandleMenuProps'

export const RemoveBlockItem = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: DragHandleMenuProps<BSchema, I, S> & {
        children: ReactNode
    }
) => {
    const Components = useComponentsContext()!

    const editor = useMiaomaDocEditor<BSchema, I, S>()

    return (
        <Components.Generic.Menu.Item className={'bn-menu-item'} onClick={() => editor.removeBlocks([props.block])}>
            {props.children}
        </Components.Generic.Menu.Item>
    )
}
