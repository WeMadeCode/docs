/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
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
