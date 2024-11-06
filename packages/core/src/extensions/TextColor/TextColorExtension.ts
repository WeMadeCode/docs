/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Extension } from '@tiptap/core'

import { defaultProps } from '../../blocks/defaultProps'

export const TextColorExtension = Extension.create({
    name: 'blockTextColor',

    addGlobalAttributes() {
        return [
            {
                types: ['blockContainer'],
                attributes: {
                    textColor: {
                        default: defaultProps.textColor.default,
                        parseHTML: element =>
                            element.hasAttribute('data-text-color')
                                ? element.getAttribute('data-text-color')
                                : defaultProps.textColor.default,
                        renderHTML: attributes => {
                            if (attributes.textColor === defaultProps.textColor.default) {
                                return {}
                            }
                            return {
                                'data-text-color': attributes.textColor,
                            }
                        },
                    },
                },
            },
        ]
    },
})
