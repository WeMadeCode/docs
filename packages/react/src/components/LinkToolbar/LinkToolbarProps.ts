import { BlockSchema, InlineContentSchema, LinkToolbarState, MiaomaDocEditor, StyleSchema, UiElementPosition } from '@miaoma-doc/core'

export type LinkToolbarProps = Omit<LinkToolbarState, keyof UiElementPosition> &
  Pick<
    MiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>['linkToolbar'],
    'deleteLink' | 'editLink' | 'startHideTimer' | 'stopHideTimer'
  >
