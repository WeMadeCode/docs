/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { InputRule } from '@tiptap/core'

import { updateBlockCommand } from '../../api/blockManipulation/commands/updateBlock/updateBlock'
import { getBlockInfoFromSelection } from '../../api/getBlockInfoFromPos'
import { createBlockSpecFromStronglyTypedTiptapNode, createStronglyTypedTiptapNode, PropSchema } from '../../schema/index'
import { createDefaultBlockDOMOutputSpec } from '../defaultBlockHelpers'
import { defaultProps } from '../defaultProps'

export const headingPropSchema = {
    ...defaultProps,
    level: { default: 1, values: [1, 2, 3] as const },
} satisfies PropSchema

const HeadingBlockContent = createStronglyTypedTiptapNode({
    name: 'heading',
    content: 'inline*',
    group: 'blockContent',
    addAttributes() {
        return {
            level: {
                default: 1,
                // instead of "level" attributes, use "data-level"
                parseHTML: element => {
                    const attr = element.getAttribute('data-level')!
                    const parsed = parseInt(attr)
                    if (isFinite(parsed)) {
                        return parsed
                    }
                    return undefined
                },
                renderHTML: attributes => {
                    return {
                        'data-level': (attributes.level as number).toString(),
                    }
                },
            },
        }
    },

    addInputRules() {
        return [
            ...[1, 2, 3].map(level => {
                // Creates a heading of appropriate level when starting with "#", "##", or "###".
                return new InputRule({
                    find: new RegExp(`^(#{${level}})\\s$`),
                    handler: ({ state, chain, range }) => {
                        const blockInfo = getBlockInfoFromSelection(state)
                        if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                            return
                        }

                        chain()
                            .command(
                                updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                                    type: 'heading',
                                    props: {
                                        level: level as any,
                                    },
                                })
                            )
                            // Removes the "#" character(s) used to set the heading.
                            .deleteRange({ from: range.from, to: range.to })
                            .run()
                    },
                })
            }),
        ]
    },

    addKeyboardShortcuts() {
        return {
            'Mod-Alt-1': () => {
                const blockInfo = getBlockInfoFromSelection(this.editor.state)
                if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                    return true
                }

                // call updateBlockCommand
                return this.editor.commands.command(
                    updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                        type: 'heading',
                        props: {
                            level: 1 as any,
                        },
                    })
                )
            },
            'Mod-Alt-2': () => {
                const blockInfo = getBlockInfoFromSelection(this.editor.state)
                if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                    return true
                }

                return this.editor.commands.command(
                    updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                        type: 'heading',
                        props: {
                            level: 2 as any,
                        },
                    })
                )
            },
            'Mod-Alt-3': () => {
                const blockInfo = getBlockInfoFromSelection(this.editor.state)
                if (blockInfo.blockContent.node.type.spec.content !== 'inline*') {
                    return true
                }

                return this.editor.commands.command(
                    updateBlockCommand(this.options.editor, blockInfo.blockContainer.beforePos, {
                        type: 'heading',
                        props: {
                            level: 3 as any,
                        },
                    })
                )
            },
        }
    },
    parseHTML() {
        return [
            {
                tag: 'div[data-content-type=' + this.name + ']',
                getAttrs: element => {
                    if (typeof element === 'string') {
                        return false
                    }

                    return {
                        level: element.getAttribute('data-level'),
                    }
                },
            },
            {
                tag: 'h1',
                attrs: { level: 1 },
                node: 'heading',
            },
            {
                tag: 'h2',
                attrs: { level: 2 },
                node: 'heading',
            },
            {
                tag: 'h3',
                attrs: { level: 3 },
                node: 'heading',
            },
        ]
    },

    renderHTML({ node, HTMLAttributes }) {
        return createDefaultBlockDOMOutputSpec(
            this.name,
            `h${node.attrs.level}`,
            {
                ...(this.options.domAttributes?.blockContent || {}),
                ...HTMLAttributes,
            },
            this.options.domAttributes?.inlineContent || {}
        )
    },
})

export const Heading = createBlockSpecFromStronglyTypedTiptapNode(HeadingBlockContent, headingPropSchema)
