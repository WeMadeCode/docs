/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Element as HASTElement, Parent as HASTParent } from 'hast'

/**
 * Rehype plugin which removes <u> tags. Used to remove underlines before converting HTML to markdown, as Markdown
 * doesn't support underlines.
 */
export function removeUnderlines() {
    const removeUnderlinesHelper = (tree: HASTParent) => {
        let numChildElements = tree.children.length

        for (let i = 0; i < numChildElements; i++) {
            const node = tree.children[i]

            if (node.type === 'element') {
                // Recursively removes underlines from child elements.
                removeUnderlinesHelper(node)

                if ((node as HASTElement).tagName === 'u') {
                    // Lifts child nodes outside underline element, deletes the underline element, and updates current index &
                    // the number of child elements.
                    if (node.children.length > 0) {
                        tree.children.splice(i, 1, ...node.children)

                        const numElementsAdded = node.children.length - 1
                        numChildElements += numElementsAdded
                        i += numElementsAdded
                    } else {
                        tree.children.splice(i, 1)

                        numChildElements--
                        i--
                    }
                }
            }
        }
    }

    return removeUnderlinesHelper
}
