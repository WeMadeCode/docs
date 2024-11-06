/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Block } from '../blocks/defaultBlocks'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../schema/index'

export type Selection<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema> = {
    blocks: Block<BSchema, I, S>[]
}
