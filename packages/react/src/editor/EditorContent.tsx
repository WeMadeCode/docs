/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { MiaomaDocEditor } from '@miaoma-doc/core'
import { ReactRenderer } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const Portals: React.FC<{ renderers: Record<string, ReactRenderer> }> = ({ renderers }) => {
    return (
        <>
            {Object.entries(renderers).map(([key, renderer]) => {
                return createPortal(renderer.reactElement, renderer.element, key)
            })}
        </>
    )
}

/**
 * Replacement of https://github.com/ueberdosis/tiptap/blob/6676c7e034a46117afdde560a1b25fe75411a21d/packages/react/src/EditorContent.tsx
 * that only takes care of the Portals.
 *
 * Original implementation is messy, and we use a "mount" system in MiaomaDocTiptapEditor.tsx that makes this cleaner
 */
export function EditorContent(props: { editor: MiaomaDocEditor<any, any, any>; children: any }) {
    const [renderers, setRenderers] = useState<Record<string, ReactRenderer>>({})

    useEffect(() => {
        props.editor._tiptapEditor.contentComponent = {
            /**
             * Used by TipTap
             */
            setRenderer(id: string, renderer: ReactRenderer) {
                setRenderers(renderers => ({ ...renderers, [id]: renderer }))
            },

            /**
             * Used by TipTap
             */
            removeRenderer(id: string) {
                setRenderers(renderers => {
                    const nextRenderers = { ...renderers }

                    delete nextRenderers[id]

                    return nextRenderers
                })
            },
        }
        // Without queueMicrotask, custom IC / styles will give a React FlushSync error
        queueMicrotask(() => {
            props.editor._tiptapEditor.createNodeViews()
        })
        return () => {
            props.editor._tiptapEditor.contentComponent = null
        }
    }, [props.editor._tiptapEditor])

    return (
        <>
            <Portals renderers={renderers} />
            {props.children}
        </>
    )
}
