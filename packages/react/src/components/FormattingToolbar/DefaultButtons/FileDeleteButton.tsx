/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    BlockSchema,
    checkBlockIsFileBlock,
    checkBlockIsFileBlockWithPlaceholder,
    InlineContentSchema,
    StyleSchema,
} from '@miaoma-doc/core'
import { useCallback, useMemo } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'

export const FileDeleteButton = () => {
    const dict = useDictionary()
    const Components = useComponentsContext()!

    const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const selectedBlocks = useSelectedBlocks(editor)

    const fileBlock = useMemo(() => {
        // Checks if only one block is selected.
        if (selectedBlocks.length !== 1) {
            return undefined
        }

        const block = selectedBlocks[0]

        if (checkBlockIsFileBlock(block, editor)) {
            return block
        }

        return undefined
    }, [editor, selectedBlocks])

    const onClick = useCallback(() => {
        editor.focus()
        editor.removeBlocks([fileBlock!])
    }, [editor, fileBlock])

    if (!fileBlock || checkBlockIsFileBlockWithPlaceholder(fileBlock, editor) || !editor.isEditable) {
        return null
    }

    return (
        <Components.FormattingToolbar.Button
            className={'bn-button'}
            label={dict.formatting_toolbar.file_delete.tooltip[fileBlock.type] || dict.formatting_toolbar.file_delete.tooltip['file']}
            mainTooltip={dict.formatting_toolbar.file_delete.tooltip[fileBlock.type] || dict.formatting_toolbar.file_delete.tooltip['file']}
            icon={<RiDeleteBin7Line />}
            onClick={onClick}
        />
    )
}
