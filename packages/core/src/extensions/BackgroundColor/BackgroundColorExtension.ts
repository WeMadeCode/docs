/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Extension } from '@tiptap/core'

import { defaultProps } from '../../blocks/defaultProps'

export const BackgroundColorExtension = Extension.create({
    name: 'blockBackgroundColor',

    addGlobalAttributes() {
        return [
            {
                types: ['blockContainer'],
                attributes: {
                    backgroundColor: {
                        default: defaultProps.backgroundColor.default,
                        parseHTML: element =>
                            element.hasAttribute('data-background-color')
                                ? element.getAttribute('data-background-color')
                                : defaultProps.backgroundColor.default,
                        renderHTML: attributes => {
                            if (attributes.backgroundColor === defaultProps.backgroundColor.default) {
                                return {}
                            }
                            return {
                                'data-background-color': attributes.backgroundColor,
                            }
                        },
                    },
                },
            },
        ]
    },
})
