/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    PartialTableContent,
    StyleSchema,
} from '@miaoma-doc/core'

import { useComponentsContext } from '../../../../editor/ComponentsContext'
import { useMiaomaDocEditor } from '../../../../hooks/useMiaomaDocEditor'
import { useDictionary } from '../../../../i18n/dictionary'
import { TableHandleMenuProps } from '../TableHandleMenuProps'

export const AddRowButton = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S> & { side: 'above' | 'below' }
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const editor = useMiaomaDocEditor<{ table: DefaultBlockSchema['table'] }, I, S>()

    return (
        <Components.Generic.Menu.Item
            onClick={() => {
                const emptyCol = props.block.content.rows[props.index].cells.map(() => [])
                const rows = [...props.block.content.rows]
                rows.splice(props.index + (props.side === 'below' ? 1 : 0), 0, {
                    cells: emptyCol,
                })

                editor.updateBlock(props.block, {
                    type: 'table',
                    content: {
                        type: 'tableContent',
                        columnWidths: props.block.content.columnWidths,
                        rows,
                    },
                })

                // Have to reset text cursor position to the block as `updateBlock`
                // moves the existing selection out of the block.
                editor.setTextCursorPosition(props.block)
            }}
        >
            {dict.table_handle[`add_${props.side}_menuitem`]}
        </Components.Generic.Menu.Item>
    )
}

export const AddColumnButton = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S> & { side: 'left' | 'right' }
) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const editor = useMiaomaDocEditor<{ table: DefaultBlockSchema['table'] }, I, S>()

    return (
        <Components.Generic.Menu.Item
            onClick={() => {
                const columnWidths = [...props.block.content.columnWidths]
                columnWidths.splice(props.index + (props.side === 'right' ? 1 : 0), 0, undefined)
                const content: PartialTableContent<I, S> = {
                    type: 'tableContent',
                    columnWidths,
                    rows: props.block.content.rows.map(row => {
                        const cells = [...row.cells]
                        cells.splice(props.index + (props.side === 'right' ? 1 : 0), 0, [])
                        return { cells }
                    }),
                }

                editor.updateBlock(props.block, {
                    type: 'table',
                    content: content,
                })

                // Have to reset text cursor position to the block as `updateBlock`
                // moves the existing selection out of the block.
                editor.setTextCursorPosition(props.block)
            }}
        >
            {dict.table_handle[`add_${props.side}_menuitem`]}
        </Components.Generic.Menu.Item>
    )
}

export const AddButton = <I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema>(
    props: TableHandleMenuProps<I, S> &
        ({ orientation: 'row'; side: 'above' | 'below' } | { orientation: 'column'; side: 'left' | 'right' })
) => (props.orientation === 'row' ? <AddRowButton {...props} side={props.side} /> : <AddColumnButton {...props} side={props.side} />)
