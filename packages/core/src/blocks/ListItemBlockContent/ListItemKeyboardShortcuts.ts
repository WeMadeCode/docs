/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { splitBlockCommand } from '../../api/blockManipulation/commands/splitBlock/splitBlock'
import { updateBlockCommand } from '../../api/blockManipulation/commands/updateBlock/updateBlock'
import { getBlockInfoFromSelection } from '../../api/getBlockInfoFromPos'
import { MiaomaDocEditor } from '../../editor/MiaomaDocEditor'

export const handleEnter = (editor: MiaomaDocEditor<any, any, any>) => {
    const ttEditor = editor._tiptapEditor
    const { blockContent, blockContainer } = getBlockInfoFromSelection(ttEditor.state)

    const selectionEmpty = ttEditor.state.selection.anchor === ttEditor.state.selection.head

    if (
        !(
            blockContent.node.type.name === 'bulletListItem' ||
            blockContent.node.type.name === 'numberedListItem' ||
            blockContent.node.type.name === 'checkListItem'
        ) ||
        !selectionEmpty
    ) {
        return false
    }

    return ttEditor.commands.first(({ state, chain, commands }) => [
        () =>
            // Changes list item block to a paragraph block if the content is empty.
            commands.command(() => {
                if (blockContent.node.childCount === 0) {
                    return commands.command(
                        updateBlockCommand(editor, blockContainer.beforePos, {
                            type: 'paragraph',
                            props: {},
                        })
                    )
                }

                return false
            }),

        () =>
            // Splits the current block, moving content inside that's after the cursor
            // to a new block of the same type below.
            commands.command(() => {
                if (blockContent.node.childCount > 0) {
                    chain().deleteSelection().command(splitBlockCommand(state.selection.from, true)).run()

                    return true
                }

                return false
            }),
    ])
}
