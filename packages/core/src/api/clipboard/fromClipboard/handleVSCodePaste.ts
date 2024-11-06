/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { MiaomaDocEditor } from '../../../editor/MiaomaDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'

export async function handleVSCodePaste<BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
    event: ClipboardEvent,
    editor: MiaomaDocEditor<BSchema, I, S>
) {
    const view = editor.prosemirrorView
    const { schema } = view.state

    if (!event.clipboardData) {
        return false
    }

    const text = event.clipboardData!.getData('text/plain')
    const vscode = event.clipboardData!.getData('vscode-editor-data')
    const vscodeData = vscode ? JSON.parse(vscode) : undefined
    const language = vscodeData?.mode

    if (!text) {
        return false
    }

    if (!schema.nodes.codeBlock) {
        view.pasteText(text)

        return true
    }

    if (!language) {
        return false
    }

    // strip carriage return chars from text pasted as code
    // see: https://github.com/ProseMirror/prosemirror-view/commit/a50a6bcceb4ce52ac8fcc6162488d8875613aacd
    editor._tiptapEditor.view.pasteHTML(`<pre><code class="language-${language}">${text.replace(/\r\n?/g, '\n')}</code></pre>`)

    return true
}
