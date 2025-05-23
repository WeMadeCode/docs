/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { DOMSerializer, Schema } from 'prosemirror-model'

import { PartialBlock } from '../../../blocks/defaultBlocks'
import type { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { serializeBlocksInternalHTML } from './util/serializeBlocksInternalHTML'
// Used to serialize MiaomaDoc blocks and ProseMirror nodes to HTML without
// losing data. Blocks are exported using the `toInternalHTML` method in their
// `blockSpec`.
//
// The HTML created by this serializer is the same as what's rendered by the
// editor to the DOM. This means that it retains the same structure as the
// editor, including the `blockGroup` and `blockContainer` wrappers. This also
// means that it can be converted back to the original blocks without any data
// loss.
export const createInternalHTMLSerializer = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    schema: Schema,
    editor: MiaomaDocEditor<BSchema, I, S>
) => {
    const serializer = DOMSerializer.fromSchema(schema)

    return {
        serializeBlocks: (blocks: PartialBlock<BSchema, I, S>[], options: { document?: Document }) => {
            return serializeBlocksInternalHTML(editor, blocks, serializer, options).outerHTML
        },
    }
}
