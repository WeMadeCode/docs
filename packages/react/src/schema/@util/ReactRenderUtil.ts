/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { MiaomaDocEditor } from '@miaoma-doc/core'
import { flushSync } from 'react-dom'
import { createRoot, Root } from 'react-dom/client'

export function renderToDOMSpec(
    fc: (refCB: (ref: HTMLElement | null) => void) => React.ReactNode,
    editor: MiaomaDocEditor<any, any, any> | undefined
) {
    let contentDOM: HTMLElement | undefined
    const div = document.createElement('div')

    let root: Root | undefined

    if (editor?.elementRenderer) {
        // Render temporarily using `ElementRenderer`
        // This way React Context will still work, as `fc` will be rendered inside the existing React tree
        editor.elementRenderer(
            fc(el => (contentDOM = el || undefined)),
            div
        )
    } else {
        // If no editor is provided, use a temporary root. This is currently only used for Styles (see ReactStyleSpec).
        // In this case, react context etc. won't be available inside `fc`

        // We also use this if _tiptapEditor or _tiptapEditor.contentComponent is undefined, use a temporary root.
        // This is actually a fallback / temporary fix, as normally this shouldn't happen (see #755). TODO: find cause
        root = createRoot(div)
        flushSync(() => {
            root!.render(fc(el => (contentDOM = el || undefined)))
        })
    }

    if (!div.childElementCount) {
        // TODO

        console.warn('ReactInlineContentSpec: renderHTML() failed')
        return {
            dom: document.createElement('span'),
        }
    }

    // clone so we can unmount the react root
    contentDOM?.setAttribute('data-tmp-find', 'true')
    const cloneRoot = div.cloneNode(true) as HTMLElement
    const dom = cloneRoot.firstElementChild! as HTMLElement
    const contentDOMClone = cloneRoot.querySelector('[data-tmp-find]') as HTMLElement | null
    contentDOMClone?.removeAttribute('data-tmp-find')

    root?.unmount()

    return {
        dom,
        contentDOM: contentDOMClone || undefined,
    }
}
