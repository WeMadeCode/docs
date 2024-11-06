/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { addStyleAttributes, createInternalStyleSpec, getStyleParseRules, StyleConfig, stylePropsToAttributes } from '@miaoma-doc/core'
import { Mark } from '@tiptap/react'
import { FC } from 'react'

import { renderToDOMSpec } from './@util/ReactRenderUtil'

// this file is mostly analogous to `customBlocks.ts`, but for React blocks

// extend BlockConfig but use a React render function
export type ReactCustomStyleImplementation<T extends StyleConfig> = {
    render: T['propSchema'] extends 'boolean'
        ? FC<{ contentRef: (el: HTMLElement | null) => void }>
        : FC<{ contentRef: (el: HTMLElement | null) => void; value: string }>
}

// A function to create custom block for API consumers
// we want to hide the tiptap node from API consumers and provide a simpler API surface instead
export function createReactStyleSpec<T extends StyleConfig>(styleConfig: T, styleImplementation: ReactCustomStyleImplementation<T>) {
    const mark = Mark.create({
        name: styleConfig.type,

        addAttributes() {
            return stylePropsToAttributes(styleConfig.propSchema)
        },

        parseHTML() {
            return getStyleParseRules(styleConfig)
        },

        renderHTML({ mark }) {
            const props: any = {}

            if (styleConfig.propSchema === 'string') {
                props.value = mark.attrs.stringValue
            }

            const Content = styleImplementation.render
            const renderResult = renderToDOMSpec(refCB => <Content {...props} contentRef={refCB} />, undefined)

            return addStyleAttributes(renderResult, styleConfig.type, mark.attrs.stringValue, styleConfig.propSchema)
        },
    })

    return createInternalStyleSpec(styleConfig, {
        mark,
    })
}
