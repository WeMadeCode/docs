/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import type { MiaomaDocEditor } from '../../editor/MiaomaDocEditor'
import { BlockFromConfig, createBlockSpec, FileBlockConfig, PropSchema } from '../../schema/index'
import { defaultProps } from '../defaultProps'
import {
    createDefaultFilePreview,
    createFileAndCaptionWrapper,
    createFileBlockWrapper,
    createLinkWithCaption,
    parseEmbedElement,
    parseFigureElement,
} from './fileBlockHelpers'

export const filePropSchema = {
    backgroundColor: defaultProps.backgroundColor,
    // File name.
    name: {
        default: '' as const,
    },
    // File url.
    url: {
        default: '' as const,
    },
    // File caption.
    caption: {
        default: '' as const,
    },
} satisfies PropSchema

export const fileBlockConfig = {
    type: 'file' as const,
    propSchema: filePropSchema,
    content: 'none',
    isFileBlock: true,
} satisfies FileBlockConfig

export const fileRender = (block: BlockFromConfig<typeof fileBlockConfig, any, any>, editor: MiaomaDocEditor<any, any, any>) => {
    const file = createDefaultFilePreview(block).dom
    const element = createFileAndCaptionWrapper(block, file)

    return createFileBlockWrapper(block, editor, element)
}

export const fileParse = (element: HTMLElement) => {
    if (element.tagName === 'EMBED') {
        return parseEmbedElement(element as HTMLEmbedElement)
    }

    if (element.tagName === 'FIGURE') {
        const parsedFigure = parseFigureElement(element, 'embed')
        if (!parsedFigure) {
            return undefined
        }

        const { targetElement, caption } = parsedFigure

        return {
            ...parseEmbedElement(targetElement as HTMLEmbedElement),
            caption,
        }
    }

    return undefined
}

export const fileToExternalHTML = (block: BlockFromConfig<typeof fileBlockConfig, any, any>) => {
    if (!block.props.url) {
        const div = document.createElement('p')
        div.textContent = 'Add file'

        return {
            dom: div,
        }
    }

    const fileSrcLink = document.createElement('a')
    fileSrcLink.href = block.props.url
    fileSrcLink.textContent = block.props.name || block.props.url

    if (block.props.caption) {
        return createLinkWithCaption(fileSrcLink, block.props.caption)
    }

    return {
        dom: fileSrcLink,
    }
}

export const FileBlock = createBlockSpec(fileBlockConfig, {
    render: fileRender,
    parse: fileParse,
    toExternalHTML: fileToExternalHTML,
})
