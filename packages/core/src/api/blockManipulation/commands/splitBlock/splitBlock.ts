/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { EditorState } from 'prosemirror-state'

import { getBlockInfo, getNearestBlockContainerPos } from '../../../getBlockInfoFromPos'

export const splitBlockCommand = (posInBlock: number, keepType?: boolean, keepProps?: boolean) => {
    return ({ state, dispatch }: { state: EditorState; dispatch: ((args?: any) => any) | undefined }) => {
        const nearestBlockContainerPos = getNearestBlockContainerPos(state.doc, posInBlock)

        const { blockContainer, blockContent } = getBlockInfo(nearestBlockContainerPos)

        const types = [
            {
                type: blockContainer.node.type, // always keep blockcontainer type
                attrs: keepProps ? { ...blockContainer.node.attrs, id: undefined } : {},
            },
            {
                type: keepType ? blockContent.node.type : state.schema.nodes['paragraph'],
                attrs: keepProps ? { ...blockContent.node.attrs } : {},
            },
        ]

        if (dispatch) {
            state.tr.split(posInBlock, 2, types)
        }

        return true
    }
}
