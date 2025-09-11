import { Extension } from '@tiptap/core'
import { Plugin } from 'prosemirror-state'

import type { PageDocEditor } from '../../../editor/PageDocEditor'
import { BlockSchema, InlineContentSchema, StyleSchema } from '../../../schema/index'
import { acceptedMIMETypes } from './acceptedMIMETypes'
import { handleFileInsertion } from './handleFileInsertion'

export const createDropFileExtension = <BSchema extends BlockSchema, I extends InlineContentSchema, S extends StyleSchema>(
  editor: PageDocEditor<BSchema, I, S>
) =>
  Extension.create<{ editor: PageDocEditor<BSchema, I, S> }, undefined>({
    name: 'dropFile',
    addProseMirrorPlugins() {
      return [
        new Plugin({
          props: {
            handleDOMEvents: {
              drop(_view, event) {
                if (!editor.isEditable) {
                  return
                }

                let format: (typeof acceptedMIMETypes)[number] | null = null
                for (const mimeType of acceptedMIMETypes) {
                  if (event.dataTransfer!.types.includes(mimeType)) {
                    format = mimeType
                    break
                  }
                }
                if (format === null) {
                  return true
                }

                if (format === 'Files') {
                  handleFileInsertion(event, editor)
                  return true
                }

                return false
              },
            },
          },
        }),
      ]
    },
  })
