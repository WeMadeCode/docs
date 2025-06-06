/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { FileBlockConfig, imageBlockConfig, imageParse } from '@miaoma-doc/core'
import { useState } from 'react'
import { RiImage2Fill } from 'react-icons/ri'

import { createReactBlockSpec, ReactCustomBlockRenderProps } from '../../schema/ReactBlockSpec'
import { FigureWithCaption, FileBlockWrapper, LinkWithCaption, ResizeHandlesWrapper } from '../FileBlockContent/fileBlockHelpers'
import { useResolveUrl } from '../FileBlockContent/useResolveUrl'

export const ImagePreview = (props: Omit<ReactCustomBlockRenderProps<FileBlockConfig, any, any>, 'contentRef'>) => {
    const [width, setWidth] = useState<number>(
        Math.min(props.block.props.previewWidth!, props.editor.domElement.firstElementChild!.clientWidth)
    )

    const resolved = useResolveUrl(props.block.props.url!)

    if (resolved.loadingState === 'loading') {
        return null
    }

    return (
        <ResizeHandlesWrapper {...props} width={width} setWidth={setWidth}>
            <img
                className={'bn-visual-media'}
                src={resolved.downloadUrl}
                alt={props.block.props.caption || 'MiaomaDoc image'}
                contentEditable={false}
                draggable={false}
                width={width}
            />
        </ResizeHandlesWrapper>
    )
}

export const ImageToExternalHTML = (props: Omit<ReactCustomBlockRenderProps<typeof imageBlockConfig, any, any>, 'contentRef'>) => {
    if (!props.block.props.url) {
        return <p>Add image</p>
    }

    const image = props.block.props.showPreview ? (
        <img
            src={props.block.props.url}
            alt={props.block.props.name || props.block.props.caption || 'MiaomaDoc image'}
            width={props.block.props.previewWidth}
        />
    ) : (
        <a href={props.block.props.url}>{props.block.props.name || props.block.props.url}</a>
    )

    if (props.block.props.caption) {
        return props.block.props.showPreview ? (
            <FigureWithCaption caption={props.block.props.caption}>{image}</FigureWithCaption>
        ) : (
            <LinkWithCaption caption={props.block.props.caption}>{image}</LinkWithCaption>
        )
    }

    return image
}

export const ImageBlock = (props: ReactCustomBlockRenderProps<typeof imageBlockConfig, any, any>) => {
    return (
        <FileBlockWrapper
            {...(props as any)}
            buttonText={props.editor.dictionary.file_blocks.image.add_button_text}
            buttonIcon={<RiImage2Fill size={24} />}
        >
            <ImagePreview block={props.block} editor={props.editor as any} />
        </FileBlockWrapper>
    )
}

export const ReactImageBlock = createReactBlockSpec(imageBlockConfig, {
    render: ImageBlock,
    parse: imageParse,
    toExternalHTML: ImageToExternalHTML,
})
