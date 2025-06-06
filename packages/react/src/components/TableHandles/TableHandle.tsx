/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { DefaultInlineContentSchema, DefaultStyleSchema, InlineContentSchema, mergeCSSClasses, StyleSchema } from '@miaoma-doc/core'
import { ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { MdDragIndicator } from 'react-icons/md'

import { useComponentsContext } from '../../editor/ComponentsContext'
import { TableHandleMenu } from './TableHandleMenu/TableHandleMenu'
import { TableHandleProps } from './TableHandleProps'

/**
 * By default, the TableHandle component will render with the default icon.
 * However, you can override the icon to render by passing children.
 */
export const TableHandle = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleProps<I, S> & { children?: ReactNode }
) => {
    const Components = useComponentsContext()!

    const [isDragging, setIsDragging] = useState(false)

    const Component = props.tableHandleMenu || TableHandleMenu

    return (
        <Components.Generic.Menu.Root
            onOpenChange={(open: boolean) => {
                if (open) {
                    props.freezeHandles()
                    props.hideOtherSide()
                } else {
                    props.unfreezeHandles()
                    props.showOtherSide()
                    props.editor.focus()
                }
            }}
            position={'right'}
        >
            <Components.Generic.Menu.Trigger>
                <Components.TableHandle.Root
                    className={mergeCSSClasses('bn-table-handle', isDragging ? 'bn-table-handle-dragging' : '')}
                    draggable={true}
                    onDragStart={e => {
                        setIsDragging(true)
                        props.dragStart(e)
                    }}
                    onDragEnd={() => {
                        props.dragEnd()
                        setIsDragging(false)
                    }}
                    style={props.orientation === 'column' ? { transform: 'rotate(0.25turn)' } : undefined}
                >
                    {props.children || <MdDragIndicator size={24} data-test={'tableHandle'} />}
                </Components.TableHandle.Root>
            </Components.Generic.Menu.Trigger>
            {/* the menu can extend outside of the table, so we use a portal to prevent clipping */}
            {createPortal(
                <Component orientation={props.orientation} block={props.block as any} index={props.index} />,
                props.menuContainer
            )}
        </Components.Generic.Menu.Root>
    )
}
