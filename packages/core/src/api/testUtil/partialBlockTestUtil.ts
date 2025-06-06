/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Block, PartialBlock } from '../../blocks/defaultBlocks'
import UniqueID from '../../extensions/UniqueID/UniqueID'
import { BlockSchema, TableContent } from '../../schema/blocks/types'
import {
    InlineContent,
    InlineContentSchema,
    isPartialLinkInlineContent,
    isStyledTextInlineContent,
    PartialInlineContent,
    StyledText,
} from '../../schema/inlineContent/types'
import { StyleSchema } from '../../schema/styles/types'

function textShorthandToStyledText(content: string | StyledText<any>[] = ''): StyledText<any>[] {
    if (typeof content === 'string') {
        return [
            {
                type: 'text',
                text: content,
                styles: {},
            },
        ]
    }
    return content
}

function partialContentToInlineContent(
    content: PartialInlineContent<any, any> | TableContent<any> | undefined
): InlineContent<any, any>[] | TableContent<any> | undefined {
    if (typeof content === 'string') {
        return textShorthandToStyledText(content)
    }

    if (Array.isArray(content)) {
        return content.flatMap(partialContent => {
            if (typeof partialContent === 'string') {
                return textShorthandToStyledText(partialContent)
            } else if (isPartialLinkInlineContent(partialContent)) {
                return {
                    ...partialContent,
                    content: textShorthandToStyledText(partialContent.content),
                }
            } else if (isStyledTextInlineContent(partialContent)) {
                return partialContent
            } else {
                // custom inline content

                return {
                    props: {},
                    ...partialContent,
                    content: partialContentToInlineContent(partialContent.content),
                } as any
            }
        })
    }

    return content
}

export function partialBlocksToBlocksForTesting<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    schema: BSchema,
    partialBlocks: Array<PartialBlock<BSchema, I, S>>
): Array<Block<BSchema, I, S>> {
    return partialBlocks.map(partialBlock => partialBlockToBlockForTesting(schema, partialBlock))
}

export function partialBlockToBlockForTesting<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    schema: BSchema,
    partialBlock: PartialBlock<BSchema, I, S>
): Block<BSchema, I, S> {
    const contentType: 'inline' | 'table' | 'none' = schema[partialBlock.type!].content

    const withDefaults: Block<BSchema, I, S> = {
        id: '',
        type: partialBlock.type!,
        props: {} as any,
        content:
            contentType === 'inline'
                ? []
                : contentType === 'table'
                  ? { type: 'tableContent', columnWidths: [], rows: [] }
                  : (undefined as any),
        children: [] as any,
        ...partialBlock,
    }

    Object.entries(schema[partialBlock.type!].propSchema).forEach(([propKey, propValue]) => {
        if (withDefaults.props[propKey] === undefined) {
            ;(withDefaults.props as any)[propKey] = propValue.default
        }
    })

    if (contentType === 'inline') {
        const content = withDefaults.content as InlineContent<I, S>[] | undefined
        withDefaults.content = partialContentToInlineContent(content) as any
    } else if (contentType === 'table') {
        const content = withDefaults.content as TableContent<I, S> | undefined
        withDefaults.content = {
            type: 'tableContent',
            columnWidths: content?.columnWidths || content?.rows[0]?.cells.map(() => undefined) || [],
            rows:
                content?.rows.map(row => ({
                    cells: row.cells.map(cell => partialContentToInlineContent(cell)),
                })) || [],
        } as any
    }

    return {
        ...withDefaults,
        content: partialContentToInlineContent(withDefaults.content),
        children: withDefaults.children.map(c => {
            return partialBlockToBlockForTesting(schema, c)
        }),
    } as any
}

export function addIdsToBlock(block: PartialBlock<any, any, any>) {
    if (!block.id) {
        block.id = UniqueID.options.generateID()
    }
    if (block.children) {
        addIdsToBlocks(block.children)
    }
}

export function addIdsToBlocks(blocks: PartialBlock<any, any, any>[]) {
    for (const block of blocks) {
        addIdsToBlock(block)
    }
}
