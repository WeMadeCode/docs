/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Block, BlockSchema, Dictionary, InlineContentSchema, StyleSchema } from '@miaoma-doc/core'
import { useMemo, useState } from 'react'
import type { IconType } from 'react-icons'
import { RiH1, RiH2, RiH3, RiListCheck3, RiListOrdered, RiListUnordered, RiText } from 'react-icons/ri'

import { ComponentProps, useComponentsContext } from '../../../editor/ComponentsContext'
import { useEditorContentOrSelectionChange } from '../../../hooks/useEditorContentOrSelectionChange'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'

export type BlockTypeSelectItem = {
    name: string
    type: string
    props?: Record<string, boolean | number | string>
    icon: IconType
    isSelected: (block: Block<BlockSchema, InlineContentSchema, StyleSchema>) => boolean
}

export const blockTypeSelectItems = (dict: Dictionary): BlockTypeSelectItem[] => [
    {
        name: dict.slash_menu.paragraph.title,
        type: 'paragraph',
        icon: RiText,
        isSelected: block => block.type === 'paragraph',
    },
    {
        name: dict.slash_menu.heading.title,
        type: 'heading',
        props: { level: 1 },
        icon: RiH1,
        isSelected: block => block.type === 'heading' && 'level' in block.props && block.props.level === 1,
    },
    {
        name: dict.slash_menu.heading_2.title,
        type: 'heading',
        props: { level: 2 },
        icon: RiH2,
        isSelected: block => block.type === 'heading' && 'level' in block.props && block.props.level === 2,
    },
    {
        name: dict.slash_menu.heading_3.title,
        type: 'heading',
        props: { level: 3 },
        icon: RiH3,
        isSelected: block => block.type === 'heading' && 'level' in block.props && block.props.level === 3,
    },
    {
        name: dict.slash_menu.bullet_list.title,
        type: 'bulletListItem',
        icon: RiListUnordered,
        isSelected: block => block.type === 'bulletListItem',
    },
    {
        name: dict.slash_menu.numbered_list.title,
        type: 'numberedListItem',
        icon: RiListOrdered,
        isSelected: block => block.type === 'numberedListItem',
    },
    {
        name: dict.slash_menu.check_list.title,
        type: 'checkListItem',
        icon: RiListCheck3,
        isSelected: block => block.type === 'checkListItem',
    },
]

export const BlockTypeSelect = (props: { items?: BlockTypeSelectItem[] }) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const selectedBlocks = useSelectedBlocks(editor)

    const [block, setBlock] = useState(editor.getTextCursorPosition().block)

    const filteredItems: BlockTypeSelectItem[] = useMemo(() => {
        return (props.items || blockTypeSelectItems(dict)).filter(item => item.type in editor.schema.blockSchema)
    }, [editor, dict, props.items])

    const shouldShow: boolean = useMemo(
        () => filteredItems.find(item => item.type === block.type) !== undefined,
        [block.type, filteredItems]
    )

    const fullItems: ComponentProps['FormattingToolbar']['Select']['items'] = useMemo(() => {
        const onClick = (item: BlockTypeSelectItem) => {
            editor.focus()

            for (const block of selectedBlocks) {
                editor.updateBlock(block, {
                    type: item.type as any,
                    props: item.props as any,
                })
            }
        }

        return filteredItems.map(item => {
            const Icon = item.icon

            return {
                text: item.name,
                icon: <Icon size={16} />,
                onClick: () => onClick(item),
                isSelected: item.isSelected(block),
            }
        })
    }, [block, filteredItems, editor, selectedBlocks])

    useEditorContentOrSelectionChange(() => {
        setBlock(editor.getTextCursorPosition().block)
    }, editor)

    if (!shouldShow || !editor.isEditable) {
        return null
    }

    return <Components.FormattingToolbar.Select className={'bn-select'} items={fullItems} />
}
