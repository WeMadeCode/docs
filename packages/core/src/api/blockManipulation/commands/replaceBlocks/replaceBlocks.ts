/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Node } from 'prosemirror-model'

import { Block, PartialBlock } from '../../../../blocks/defaultBlocks'
import type { MiaomaDocEditor } from '../../../../editor/MiaomaDocEditor'
import { BlockIdentifier, BlockSchema, InlineContentSchema, StyleSchema } from '../../../../schema/index'
import { blockToNode } from '../../../nodeConversions/blockToNode'
import { nodeToBlock } from '../../../nodeConversions/nodeToBlock'
import { removeBlocksWithCallback } from '../removeBlocks/removeBlocks'

export function replaceBlocks<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    editor: MiaomaDocEditor<BSchema, I, S>,
    blocksToRemove: BlockIdentifier[],
    blocksToInsert: PartialBlock<BSchema, I, S>[]
): {
    insertedBlocks: Block<BSchema, I, S>[]
    removedBlocks: Block<BSchema, I, S>[]
} {
    const nodesToInsert: Node[] = []
    for (const block of blocksToInsert) {
        nodesToInsert.push(blockToNode(block, editor.pmSchema, editor.schema.styleSchema))
    }

    const idOfFirstBlock = typeof blocksToRemove[0] === 'string' ? blocksToRemove[0] : blocksToRemove[0].id
    const removedBlocks = removeBlocksWithCallback(editor, blocksToRemove, (node, pos, tr, removedSize) => {
        if (node.attrs.id === idOfFirstBlock) {
            const oldDocSize = tr.doc.nodeSize
            tr.insert(pos, nodesToInsert)
            const newDocSize = tr.doc.nodeSize

            return removedSize + oldDocSize - newDocSize
        }

        return removedSize
    })

    // Now that the `PartialBlock`s have been converted to nodes, we can
    // re-convert them into full `Block`s.
    const insertedBlocks: Block<BSchema, I, S>[] = []
    for (const node of nodesToInsert) {
        insertedBlocks.push(
            nodeToBlock(node, editor.schema.blockSchema, editor.schema.inlineContentSchema, editor.schema.styleSchema, editor.blockCache)
        )
    }

    return { insertedBlocks, removedBlocks }
}
