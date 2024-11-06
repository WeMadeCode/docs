/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Mark } from '@tiptap/core'

import { createStyleSpecFromTipTapMark } from '../../schema/index'

const TextColorMark = Mark.create({
    name: 'textColor',

    addAttributes() {
        return {
            stringValue: {
                default: undefined,
                parseHTML: element => element.getAttribute('data-text-color'),
                renderHTML: attributes => ({
                    'data-text-color': attributes.stringValue,
                }),
            },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'span',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    if (element.hasAttribute('data-text-color')) {
                        return { stringValue: element.getAttribute('data-text-color') }
                    }

                    return false
                },
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['span', HTMLAttributes, 0]
    },
})

export const TextColor = createStyleSpecFromTipTapMark(TextColorMark, 'string')
