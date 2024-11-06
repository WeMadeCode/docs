/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Mark } from '@tiptap/core'
import { ParseRule } from '@tiptap/pm/model'

import { UnreachableCaseError } from '../../util/typescript'
import { addStyleAttributes, createInternalStyleSpec, stylePropsToAttributes } from './internal'
import { StyleConfig, StyleSpec } from './types'

export type CustomStyleImplementation<T extends StyleConfig> = {
    render: T['propSchema'] extends 'boolean'
        ? () => {
              dom: HTMLElement
              contentDOM?: HTMLElement
          }
        : (value: string) => {
              dom: HTMLElement
              contentDOM?: HTMLElement
          }
}

// TODO: support serialization

export function getStyleParseRules(config: StyleConfig): ParseRule[] {
    return [
        {
            tag: `[data-style-type="${config.type}"]`,
            contentElement: element => {
                const htmlElement = element as HTMLElement

                if (htmlElement.matches('[data-editable]')) {
                    return htmlElement
                }

                return htmlElement.querySelector('[data-editable]') || htmlElement
            },
        },
    ]
}

export function createStyleSpec<T extends StyleConfig>(styleConfig: T, styleImplementation: CustomStyleImplementation<T>): StyleSpec<T> {
    const mark = Mark.create({
        name: styleConfig.type,

        addAttributes() {
            return stylePropsToAttributes(styleConfig.propSchema)
        },

        parseHTML() {
            return getStyleParseRules(styleConfig)
        },

        renderHTML({ mark }) {
            let renderResult: {
                dom: HTMLElement
                contentDOM?: HTMLElement
            }

            if (styleConfig.propSchema === 'boolean') {
                // @ts-expect-error not sure why this is complaining
                renderResult = styleImplementation.render()
            } else if (styleConfig.propSchema === 'string') {
                renderResult = styleImplementation.render(mark.attrs.stringValue)
            } else {
                throw new UnreachableCaseError(styleConfig.propSchema)
            }

            // const renderResult = styleImplementation.render();
            return addStyleAttributes(renderResult, styleConfig.type, mark.attrs.stringValue, styleConfig.propSchema)
        },
    })

    return createInternalStyleSpec(styleConfig, {
        mark,
    })
}
