/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Schema } from 'prosemirror-model'

import { Block } from '../../../blocks/defaultBlocks'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { initializeESMDependencies } from '../../../util/esmDependencies'
import { HTMLToBlocks } from '../html/parseHTML'

// modified version of https://github.com/syntax-tree/mdast-util-to-hast/blob/main/lib/handlers/code.js
// that outputs a data-language attribute instead of a CSS class (e.g.: language-typescript)
function code(state: any, node: any) {
    const value = node.value ? node.value : ''
    /** @type {Properties} */
    const properties: any = {}

    if (node.lang) {
        // changed line
        properties['data-language'] = node.lang
    }

    // Create `<code>`.
    /** @type {Element} */
    let result: any = {
        type: 'element',
        tagName: 'code',
        properties,
        children: [{ type: 'text', value }],
    }

    if (node.meta) {
        result.data = { meta: node.meta }
    }

    state.patch(node, result)
    result = state.applyData(node, result)

    // Create `<pre>`.
    result = {
        type: 'element',
        tagName: 'pre',
        properties: {},
        children: [result],
    }
    state.patch(node, result)
    return result
}

export async function markdownToBlocks<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    markdown: string,
    blockSchema: BSchema,
    icSchema: I,
    styleSchema: S,
    pmSchema: Schema
): Promise<Block<BSchema, I, S>[]> {
    const deps = await initializeESMDependencies()
    const htmlString = deps.unified
        .unified()
        .use(deps.remarkParse.default)
        .use(deps.remarkGfm.default)
        .use(deps.remarkRehype.default, {
            handlers: {
                ...(deps.remarkRehype.defaultHandlers as any),
                code,
            },
        })
        .use(deps.rehypeStringify.default)
        .processSync(markdown)

    return HTMLToBlocks(htmlString.value as string, blockSchema, icSchema, styleSchema, pmSchema)
}
