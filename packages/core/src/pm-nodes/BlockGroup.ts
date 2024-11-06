/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Node } from '@tiptap/core'

import { MiaomaDocDOMAttributes } from '../schema/index'
import { mergeCSSClasses } from '../util/browser'

export const BlockGroup = Node.create<{
    domAttributes?: MiaomaDocDOMAttributes
}>({
    name: 'blockGroup',
    group: 'blockGroup',
    content: 'blockContainer+',

    parseHTML() {
        return [
            {
                tag: 'div',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    if (element.getAttribute('data-node-type') === 'blockGroup') {
                        // Null means the element matches, but we don't want to add any attributes to the node.
                        return null
                    }

                    return false
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const blockGroupHTMLAttributes = {
            ...(this.options.domAttributes?.blockGroup || {}),
            ...HTMLAttributes,
        }
        const blockGroup = document.createElement('div')
        blockGroup.className = mergeCSSClasses('bn-block-group', blockGroupHTMLAttributes.class)
        blockGroup.setAttribute('data-node-type', 'blockGroup')
        for (const [attribute, value] of Object.entries(blockGroupHTMLAttributes)) {
            if (attribute !== 'class') {
                blockGroup.setAttribute(attribute, value)
            }
        }

        return {
            dom: blockGroup,
            contentDOM: blockGroup,
        }
    },
})
