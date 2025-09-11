import { BlockSchema, InlineContentSchema, LinkToolbarState, PageDocEditor, StyleSchema, UiElementPosition } from '@page-doc/core'

export type LinkToolbarProps = Omit<LinkToolbarState, keyof UiElementPosition> &
  Pick<
    PageDocEditor<BlockSchema, InlineContentSchema, StyleSchema>['linkToolbar'],
    'deleteLink' | 'editLink' | 'startHideTimer' | 'stopHideTimer'
  >
