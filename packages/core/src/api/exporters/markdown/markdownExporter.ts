/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Schema } from 'prosemirror-model'

import { PartialBlock } from '../../../blocks/defaultBlocks'
import type { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { esmDependencies, initializeESMDependencies } from '../../../util/esmDependencies'
import { createExternalHTMLExporter } from '../html/externalHTMLExporter'
import { removeUnderlines } from './removeUnderlinesRehypePlugin'
import { addSpacesToCheckboxes } from './util/addSpacesToCheckboxesRehypePlugin'

// Needs to be sync because it's used in drag handler event (SideMenuPlugin)
// Ideally, call `await initializeESMDependencies()` before calling this function
export function cleanHTMLToMarkdown(cleanHTMLString: string) {
    const deps = esmDependencies

    if (!deps) {
        throw new Error('cleanHTMLToMarkdown requires ESM dependencies to be initialized')
    }

    const markdownString = deps.unified
        .unified()
        .use(deps.rehypeParse.default, { fragment: true })
        .use(removeUnderlines)
        .use(addSpacesToCheckboxes)
        .use(deps.rehypeRemark.default)
        .use(deps.remarkGfm.default)
        .use(deps.remarkStringify.default, {
            handlers: { text: node => node.value },
        })
        .processSync(cleanHTMLString)

    return markdownString.value as string
}

export async function blocksToMarkdown<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    blocks: PartialBlock<BSchema, I, S>[],
    schema: Schema,
    editor: MiaomaDocEditor<BSchema, I, S>,
    options: { document?: Document }
): Promise<string> {
    await initializeESMDependencies()
    const exporter = createExternalHTMLExporter(schema, editor)
    const externalHTML = exporter.exportBlocks(blocks, options)

    return cleanHTMLToMarkdown(externalHTML)
}
