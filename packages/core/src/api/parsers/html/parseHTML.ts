/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { DOMParser, Schema } from 'prosemirror-model'

import { Block } from '../../../blocks/defaultBlocks'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { nodeToBlock } from '../../nodeConversions/nodeToBlock'
import { nestedListsToMiaomaDocStructure } from './util/nestedLists'
export async function HTMLToBlocks<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    html: string,
    blockSchema: BSchema,
    icSchema: I,
    styleSchema: S,
    pmSchema: Schema
): Promise<Block<BSchema, I, S>[]> {
    const htmlNode = nestedListsToMiaomaDocStructure(html)
    const parser = DOMParser.fromSchema(pmSchema)

    // Other approach might be to use
    // const doc = pmSchema.nodes["doc"].createAndFill()!;
    // and context: doc.resolve(3),

    const parentNode = parser.parse(htmlNode, {
        topNode: pmSchema.nodes['blockGroup'].create(),
    })

    const blocks: Block<BSchema, I, S>[] = []

    for (let i = 0; i < parentNode.childCount; i++) {
        blocks.push(nodeToBlock(parentNode.child(i), blockSchema, icSchema, styleSchema))
    }

    return blocks
}
