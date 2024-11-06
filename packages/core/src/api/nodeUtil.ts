/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Node } from 'prosemirror-model'

/**
 * Get a TipTap node by id
 */
export function getNodeById(id: string, doc: Node): { node: Node; posBeforeNode: number } {
    let targetNode: Node | undefined = undefined
    let posBeforeNode: number | undefined = undefined

    doc.firstChild!.descendants((node, pos) => {
        // Skips traversing nodes after node with target ID has been found.
        if (targetNode) {
            return false
        }

        // Keeps traversing nodes if block with target ID has not been found.
        if (node.type.name !== 'blockContainer' || node.attrs.id !== id) {
            return true
        }

        targetNode = node
        posBeforeNode = pos + 1

        return false
    })

    if (targetNode === undefined || posBeforeNode === undefined) {
        throw Error('Could not find block in the editor with matching ID.')
    }

    return {
        node: targetNode,
        posBeforeNode: posBeforeNode,
    }
}
