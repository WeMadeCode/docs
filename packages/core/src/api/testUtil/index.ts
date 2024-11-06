/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { PartialBlock } from '../../blocks/defaultBlocks'
import { MiaomaDocEditor } from '../../editor/MiaomaDocEditor'
import { BlockSchema } from '../../schema/blocks/types'
import { InlineContentSchema } from '../../schema/inlineContent/types'
import { StyleSchema } from '../../schema/styles/types'
import { NoInfer } from '../../util/typescript'

export type EditorTestCases<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema> = {
    name: string
    createEditor: () => MiaomaDocEditor<B, I, S>
    documents: Array<{
        name: string
        blocks: PartialBlock<NoInfer<B>, NoInfer<I>, NoInfer<S>>[]
    }>
}
