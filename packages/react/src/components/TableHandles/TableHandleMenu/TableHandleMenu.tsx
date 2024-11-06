/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { DefaultInlineContentSchema, DefaultStyleSchema, InlineContentSchema, StyleSchema } from '@miaoma-doc/core'
import { ReactNode } from 'react'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { AddButton } from './DefaultButtons/AddButton'
import { DeleteButton } from './DefaultButtons/DeleteButton'
import { TableHandleMenuProps } from './TableHandleMenuProps'

export const TableHandleMenu = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S> & { children?: ReactNode }
) => {
    const Components = useComponentsContext()!

    return (
        <Components.Generic.Menu.Dropdown className={'bn-table-handle-menu'}>
            {props.children || (
                <>
                    <DeleteButton orientation={props.orientation} block={props.block} index={props.index} />
                    <AddButton
                        orientation={props.orientation}
                        block={props.block}
                        index={props.index}
                        side={props.orientation === 'row' ? 'above' : ('left' as any)}
                    />
                    <AddButton
                        orientation={props.orientation}
                        block={props.block}
                        index={props.index}
                        side={props.orientation === 'row' ? 'below' : ('right' as any)}
                    />
                </>
            )}
        </Components.Generic.Menu.Dropdown>
    )
}
