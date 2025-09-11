import { FilePanelController } from '../components/FilePanel/FilePanelController'
import { FormattingToolbarController } from '../components/FormattingToolbar/FormattingToolbarController'
import { LinkToolbarController } from '../components/LinkToolbar/LinkToolbarController'
import { SideMenuController } from '../components/SideMenu/SideMenuController'
import { GridSuggestionMenuController } from '../components/SuggestionMenu/GridSuggestionMenu/GridSuggestionMenuController'
import { SuggestionMenuController } from '../components/SuggestionMenu/SuggestionMenuController'
import { TableHandlesController } from '../components/TableHandles/TableHandlesController'
import { usePageDocEditor } from '../hooks/usePageDocEditor'

export type PageDocDefaultUIProps = {
  formattingToolbar?: boolean
  linkToolbar?: boolean
  slashMenu?: boolean
  sideMenu?: boolean
  filePanel?: boolean
  tableHandles?: boolean
  emojiPicker?: boolean
}

export function PageDocDefaultUI(props: PageDocDefaultUIProps) {
  const editor = usePageDocEditor()

  if (!editor) {
    throw new Error('PageDocDefaultUI must be used within a PageDocContext.Provider')
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
