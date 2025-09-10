import {
  DefaultBlockSchema,
  DefaultInlineContentSchema,
  DefaultStyleSchema,
  InlineContentSchema,
  MiaomaDocEditor,
  StyleSchema,
  TableHandlesState,
} from '@page-doc/core'
import { DragEvent, FC } from 'react'

import { DragHandleMenuProps } from '../SideMenu/DragHandleMenu/DragHandleMenuProps'

type NonUndefined<T> = T extends undefined ? never : T

export type TableHandleProps<I extends InlineContentSchema = DefaultInlineContentSchema, S extends StyleSchema = DefaultStyleSchema> = {
  editor: MiaomaDocEditor<
    {
      table: DefaultBlockSchema['table']
    },
    I,
    S
  >
  orientation: 'row' | 'column'
  index: number
  dragStart: (e: DragEvent) => void
  showOtherSide: () => void
  hideOtherSide: () => void
  menuContainer: HTMLDivElement
  tableHandleMenu?: FC<
    DragHandleMenuProps<
      {
        table: DefaultBlockSchema['table']
      },
      I,
      S
    >
  >
} & Pick<TableHandlesState<I, S>, 'block'> &
  Pick<
    NonUndefined<
      MiaomaDocEditor<
        {
          table: DefaultBlockSchema['table']
        },
        I,
        S
      >['tableHandles']
    >,
    'dragEnd' | 'freezeHandles' | 'unfreezeHandles'
  >
