/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import type { MiaomaDocEditor } from '../editor/MiaomaDocEditor'
import { BlockFromConfig, BlockSchema, FileBlockConfig, InlineContentSchema, StyleSchema } from '../schema/index'
import { Block, DefaultBlockSchema, defaultBlockSchema, DefaultInlineContentSchema, defaultInlineContentSchema } from './defaultBlocks'
import { defaultProps } from './defaultProps'

export function checkDefaultBlockTypeInSchema<
    BlockType extends keyof DefaultBlockSchema,
    I extends InlineContentSchema,
    S extends StyleSchema,
>(blockType: BlockType, editor: MiaomaDocEditor<any, I, S>): editor is MiaomaDocEditor<{ Type: DefaultBlockSchema[BlockType] }, I, S> {
    return blockType in editor.schema.blockSchema && editor.schema.blockSchema[blockType] === defaultBlockSchema[blockType]
}

export function checkDefaultInlineContentTypeInSchema<
    InlineContentType extends keyof DefaultInlineContentSchema,
    B extends BlockSchema,
    S extends StyleSchema,
>(
    inlineContentType: InlineContentType,
    editor: MiaomaDocEditor<B, any, S>
): editor is MiaomaDocEditor<B, { Type: DefaultInlineContentSchema[InlineContentType] }, S> {
    return (
        inlineContentType in editor.schema.inlineContentSchema &&
        editor.schema.inlineContentSchema[inlineContentType] === defaultInlineContentSchema[inlineContentType]
    )
}

export function checkBlockIsDefaultType<BlockType extends keyof DefaultBlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    blockType: BlockType,
    block: Block<any, I, S>,
    editor: MiaomaDocEditor<any, I, S>
): block is BlockFromConfig<DefaultBlockSchema[BlockType], I, S> {
    return block.type === blockType && block.type in editor.schema.blockSchema && checkDefaultBlockTypeInSchema(block.type, editor)
}

export function checkBlockIsFileBlock<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    block: Block<any, I, S>,
    editor: MiaomaDocEditor<B, I, S>
): block is BlockFromConfig<FileBlockConfig, I, S> {
    return (block.type in editor.schema.blockSchema && editor.schema.blockSchema[block.type].isFileBlock) || false
}

export function checkBlockIsFileBlockWithPreview<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    block: Block<any, I, S>,
    editor: MiaomaDocEditor<B, I, S>
): block is BlockFromConfig<
    FileBlockConfig & {
        propSchema: Required<FileBlockConfig['propSchema']>
    },
    I,
    S
> {
    return (
        (block.type in editor.schema.blockSchema &&
            editor.schema.blockSchema[block.type].isFileBlock &&
            'showPreview' in editor.schema.blockSchema[block.type].propSchema) ||
        false
    )
}

export function checkBlockIsFileBlockWithPlaceholder<B extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    block: Block<B, I, S>,
    editor: MiaomaDocEditor<B, I, S>
) {
    const config = editor.schema.blockSchema[block.type]
    return config.isFileBlock && !block.props.url
}

export function checkBlockTypeHasDefaultProp<Prop extends keyof typeof defaultProps, I extends InlineContentSchema, S extends StyleSchema>(
    prop: Prop,
    blockType: string,
    editor: MiaomaDocEditor<any, I, S>
): editor is MiaomaDocEditor<
    {
        [BT in string]: {
            type: BT
            propSchema: {
                [P in Prop]: (typeof defaultProps)[P]
            }
            content: 'table' | 'inline' | 'none'
        }
    },
    I,
    S
> {
    return (
        blockType in editor.schema.blockSchema &&
        prop in editor.schema.blockSchema[blockType].propSchema &&
        editor.schema.blockSchema[blockType].propSchema[prop] === defaultProps[prop]
    )
}

export function checkBlockHasDefaultProp<Prop extends keyof typeof defaultProps, I extends InlineContentSchema, S extends StyleSchema>(
    prop: Prop,
    block: Block<any, I, S>,
    editor: MiaomaDocEditor<any, I, S>
): block is BlockFromConfig<
    {
        type: string
        propSchema: {
            [P in Prop]: (typeof defaultProps)[P]
        }
        content: 'table' | 'inline' | 'none'
    },
    I,
    S
> {
    return checkBlockTypeHasDefaultProp(prop, block.type, editor)
}
