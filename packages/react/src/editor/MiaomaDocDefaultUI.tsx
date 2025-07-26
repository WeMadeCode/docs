import { FilePanelController } from '../components/FilePanel/FilePanelController'
import { FormattingToolbarController } from '../components/FormattingToolbar/FormattingToolbarController'
import { LinkToolbarController } from '../components/LinkToolbar/LinkToolbarController'
import { SideMenuController } from '../components/SideMenu/SideMenuController'
import { GridSuggestionMenuController } from '../components/SuggestionMenu/GridSuggestionMenu/GridSuggestionMenuController'
import { SuggestionMenuController } from '../components/SuggestionMenu/SuggestionMenuController'
import { TableHandlesController } from '../components/TableHandles/TableHandlesController'
import { useMiaomaDocEditor } from '../hooks/useMiaomaDocEditor'

export type MiaomaDocDefaultUIProps = {
  formattingToolbar?: boolean
  linkToolbar?: boolean
  slashMenu?: boolean
  sideMenu?: boolean
  filePanel?: boolean
  tableHandles?: boolean
  emojiPicker?: boolean
}

export function MiaomaDocDefaultUI(props: MiaomaDocDefaultUIProps) {
  const editor = useMiaomaDocEditor()

  if (!editor) {
    throw new Error('MiaomaDocDefaultUI must be used within a MiaomaDocContext.Provider')
  }

  return (
    <>
      {props.formattingToolbar !== false && <FormattingToolbarController />}
      {props.linkToolbar !== false && <LinkToolbarController />}
      {props.slashMenu !== false && <SuggestionMenuController triggerCharacter="/" />}
      {props.emojiPicker !== false && <GridSuggestionMenuController triggerCharacter=":" columns={10} minQueryLength={2} />}
      {props.sideMenu !== false && <SideMenuController />}
      {editor.filePanel && props.filePanel !== false && <FilePanelController />}
      {editor.tableHandles && props.tableHandles !== false && <TableHandlesController />}
    </>
  )
}
