/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Node } from '@tiptap/core'

import type { MiaomaDocEditor } from '../editor/MiaomaDocEditor'
import { MiaomaDocDOMAttributes } from '../schema/index'
import { mergeCSSClasses } from '../util/browser'

// Object containing all possible block attributes.
const BlockAttributes: Record<string, string> = {
    blockColor: 'data-block-color',
    blockStyle: 'data-block-style',
    id: 'data-id',
    depth: 'data-depth',
    depthChange: 'data-depth-change',
}

/**
 * The main "Block node" documents consist of
 */
export const BlockContainer = Node.create<{
    domAttributes?: MiaomaDocDOMAttributes
    editor: MiaomaDocEditor<any, any, any>
}>({
    name: 'blockContainer',
    group: 'blockContainer',
    // A block always contains content, and optionally a blockGroup which contains nested blocks
    content: 'blockContent blockGroup?',
    // Ensures content-specific keyboard handlers trigger first.
    priority: 50,
    defining: true,

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    const attrs: Record<string, string> = {}
                    for (const [nodeAttr, HTMLAttr] of Object.entries(BlockAttributes)) {
                        if (element.getAttribute(HTMLAttr)) {
                            attrs[nodeAttr] = element.getAttribute(HTMLAttr)!
                        }
                    }

                    if (element.getAttribute('data-node-type') === 'blockContainer') {
                        return attrs
                    }

                    return false
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const blockOuter = document.createElement('div')
        blockOuter.className = 'bn-block-outer'
        blockOuter.setAttribute('data-node-type', 'blockOuter')
        for (const [attribute, value] of Object.entries(HTMLAttributes)) {
            if (attribute !== 'class') {
                blockOuter.setAttribute(attribute, value)
            }
        }

        const blockHTMLAttributes = {
            ...(this.options.domAttributes?.block || {}),
            ...HTMLAttributes,
        }
        const block = document.createElement('div')
        block.className = mergeCSSClasses('bn-block', blockHTMLAttributes.class)
        block.setAttribute('data-node-type', this.name)
        for (const [attribute, value] of Object.entries(blockHTMLAttributes)) {
            if (attribute !== 'class') {
                block.setAttribute(attribute, value)
            }
        }

        blockOuter.appendChild(block)

        return {
            dom: blockOuter,
            contentDOM: block,
        }
    },
})
