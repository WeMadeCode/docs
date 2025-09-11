import {
  BlockSchema,
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  StyleSchema,
} from '@page-doc/core'
import { ReactNode } from 'react'

import { useComponentsContext } from '../../../../editor/ComponentsContext'
import { usePageDocEditor } from '../../../../hooks/usePageDocEditor'
import { DragHandleMenuProps } from '../DragHandleMenuProps'

export const RemoveBlockItem = <
  BSchema extends BlockSchema = DefaultBlockSchema,
  I extends InlineContentSchema = DefaultInlineContentSchema,
  S extends StyleSchema = DefaultStyleSchema,
>(
  props: DragHandleMenuProps<BSchema, I, S> & {
    children: ReactNode
  }
) => {
  const Components = useComponentsContext()!

  const editor = usePageDocEditor<BSchema, I, S>()

  return (
    <Components.Generic.Menu.Item className={'bn-menu-item'} onClick={() => editor.removeBlocks([props.block])}>
      {props.children}
    </Components.Generic.Menu.Item>
  )
}
