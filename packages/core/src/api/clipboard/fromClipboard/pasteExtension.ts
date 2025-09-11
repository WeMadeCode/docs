import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

import type { PageDocEditor } from '../../../editor/PageDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { nestedListsToPageDocStructure } from '../../parsers/html/util/nestedLists'
import { acceptedMIMETypes } from './acceptedMIMETypes'
import { handleFileInsertion } from './handleFileInsertion'
import { handleVSCodePaste } from './handleVSCodePaste'

export const createPasteFromClipboardExtension = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
  editor: PageDocEditor<BSchema, I, S>
) =>
  Extension.create<{ editor: PageDocEditor<BSchema, I, S> }, undefined>({
    name: 'pasteFromClipboard',
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              paste(_view, event) {
                event.preventDefault()

                if (!editor.isEditable) {
                  return
                }

                let format: (typeof acceptedMIMETypes)[number] | undefined
                for (const mimeType of acceptedMIMETypes) {
                  if (event.clipboardData!.types.includes(mimeType)) {
                    format = mimeType
                    break
                  }
                }
                if (!format) {
                  return true
                }

                if (format === 'vscode-editor-data') {
                  handleVSCodePaste(event, editor)
                  return true
                }

                if (format === 'Files') {
                  handleFileInsertion(event, editor)
                  return true
                }

                let data = event.clipboardData!.getData(format)

                if (format === 'pagedoc/html') {
                  editor._tiptapEditor.view.pasteHTML(data)
                  return true
                }

                if (format === 'text/html') {
                  const htmlNode = nestedListsToPageDocStructure(data.trim())
                  data = htmlNode.innerHTML
                  editor._tiptapEditor.view.pasteHTML(data)
                  return true
                }

                editor._tiptapEditor.view.pasteText(data)

                return true
              },
            },
          },
        }),
      ]
    },
  })
