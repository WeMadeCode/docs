/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { NodeSelection, Selection, TextSelection } from 'prosemirror-state'
import { CellSelection } from 'prosemirror-tables'

import type { MiaomaDocEditor } from '../../../../editor/MiaomaDocEditor'
import { BlockIdentifier } from '../../../../schema/index'
import { getBlockInfoFromSelection } from '../../../getBlockInfoFromPos'
import { getNodeById } from '../../../nodeUtil'

type BlockSelectionData = (
    | {
          type: 'text'
          anchor: number
          head: number
      }
    | {
          type: 'node'
          from: number
      }
    | {
          type: 'cell'
          anchorCell: number
          headCell: number
      }
) & {
    blockId: string
    blockPos: number
}

// `getBlockSelectionData` and `updateBlockSelectionFromData` are used to save
// and restore the selection within a block, when the block is moved.
function getBlockSelectionData(editor: MiaomaDocEditor<any, any, any>): BlockSelectionData {
    const { blockContainer } = getBlockInfoFromSelection(editor._tiptapEditor.state)

    const selectionData = {
        blockId: blockContainer.node.attrs.id,
        blockPos: blockContainer.beforePos,
    }

    if (editor._tiptapEditor.state.selection instanceof CellSelection) {
        return {
            ...selectionData,
            type: 'cell' as const,
            anchorCell: (editor._tiptapEditor.state.selection as CellSelection).$anchorCell.pos,
            headCell: (editor._tiptapEditor.state.selection as CellSelection).$headCell.pos,
        }
    } else if (editor._tiptapEditor.state.selection instanceof NodeSelection) {
        return {
            ...selectionData,
            type: 'node' as const,
            from: editor._tiptapEditor.state.selection.from,
        }
    } else {
        return {
            ...selectionData,
            type: 'text' as const,
            anchor: editor._tiptapEditor.state.selection.anchor,
            head: editor._tiptapEditor.state.selection.head,
        }
    }
}

function updateBlockSelectionFromData(editor: MiaomaDocEditor<any, any, any>, data: BlockSelectionData) {
    const blockPos = getNodeById(data.blockId, editor._tiptapEditor.state.doc).posBeforeNode

    let selection: Selection
    if (data.type === 'cell') {
        selection = CellSelection.create(
            editor._tiptapEditor.state.doc,
            data.anchorCell + (blockPos - data.blockPos),
            data.headCell + (blockPos - data.blockPos)
        )
    } else if (data.type === 'node') {
        selection = NodeSelection.create(editor._tiptapEditor.state.doc, data.from + (blockPos - data.blockPos))
    } else {
        selection = TextSelection.create(
            editor._tiptapEditor.state.doc,
            data.anchor + (blockPos - data.blockPos),
            data.head + (blockPos - data.blockPos)
        )
    }

    editor._tiptapEditor.view.dispatch(editor._tiptapEditor.state.tr.setSelection(selection))
}

export function moveSelectedBlockAndSelection(
    editor: MiaomaDocEditor<any, any, any>,
    referenceBlock: BlockIdentifier,
    placement: 'before' | 'after'
) {
    const { block } = editor.getTextCursorPosition()
    const selectionData = getBlockSelectionData(editor)

    editor.removeBlocks([block])
    editor.insertBlocks([block], referenceBlock, placement)

    updateBlockSelectionFromData(editor, selectionData)
}

export function moveBlockUp(editor: MiaomaDocEditor<any, any, any>) {
    // This function currently only supports moving a single block.
    const editorSelection = editor.getSelection()
    if (editorSelection && editorSelection.blocks.length > 1) {
        return
    }

    const { prevBlock, parentBlock } = editor.getTextCursorPosition()

    let referenceBlockId: string | undefined
    let placement: 'before' | 'after' | undefined

    if (!prevBlock) {
        if (parentBlock) {
            referenceBlockId = parentBlock.id
            placement = 'before'
        }
    } else if (prevBlock.children.length > 0) {
        referenceBlockId = prevBlock.children[prevBlock.children.length - 1].id
        placement = 'after'
    } else {
        referenceBlockId = prevBlock.id
        placement = 'before'
    }

    if (!referenceBlockId || !placement) {
        return
    }

    moveSelectedBlockAndSelection(editor, referenceBlockId, placement)
}

export function moveBlockDown(editor: MiaomaDocEditor<any, any, any>) {
    // This function currently only supports moving a single block.
    const editorSelection = editor.getSelection()
    if (editorSelection && editorSelection.blocks.length > 1) {
        return
    }

    const { nextBlock, parentBlock } = editor.getTextCursorPosition()

    let referenceBlockId: string | undefined
    let placement: 'before' | 'after' | undefined

    if (!nextBlock) {
        if (parentBlock) {
            referenceBlockId = parentBlock.id
            placement = 'after'
        }
    } else if (nextBlock.children.length > 0) {
        referenceBlockId = nextBlock.children[0].id
        placement = 'before'
    } else {
        referenceBlockId = nextBlock.id
        placement = 'after'
    }

    if (!referenceBlockId || !placement) {
        return
    }

    moveSelectedBlockAndSelection(editor, referenceBlockId, placement)
}
