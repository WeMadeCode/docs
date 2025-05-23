/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { updateBlockCommand } from '../../api/blockManipulation/commands/updateBlock/updateBlock'
import { getBlockInfoFromSelection } from '../../api/getBlockInfoFromPos'
import { createBlockSpecFromStronglyTypedTiptapNode, createStronglyTypedTiptapNode } from '../../schema/index'
import { createDefaultBlockDOMOutputSpec } from '../defaultBlockHelpers'
import { defaultProps } from '../defaultProps'

export const paragraphPropSchema = {
    ...defaultProps,
}

export const ParagraphBlockContent = createStronglyTypedTiptapNode({
    name: 'paragraph',
    content: 'inline*',
    group: 'blockContent',

    addKeyboardShortcuts() {
        return {
            'Mod-Alt-0': () => {
                const blockInfo = getBlockInfoFromSelection(this.editor.state)
                if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                    return true
                }

                return this.editor.commands.command(
                    updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                        type: 'paragraph',
                        props: {},
                    })
                )
            },
        }
    },

    parseHTML() {
        return [
            { tag: 'div[data-content-type=' + this.name + ']' },
            {
                tag: 'p',
                priority: 200,
                getAttrs: element => {
                    if (typeof element === 'string' || !element.textContent?.trim()) {
                        return false
                    }

                    return {}
                },
                node: 'paragraph',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return createDefaultBlockDOMOutputSpec(
            this.name,
            'p',
            {
                ...(this.options.domAttributes?.blockContent || {}),
                ...HTMLAttributes,
            },
            this.options.domAttributes?.inlineContent || {}
        )
    },
})

export const Paragraph = createBlockSpecFromStronglyTypedTiptapNode(ParagraphBlockContent, paragraphPropSchema)
