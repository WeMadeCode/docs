/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { BlockSchema, formatKeyboardShortcut, InlineContentSchema, MiaomaDocEditor, StyleSchema } from '@miaoma-doc/core'
import { useCallback, useMemo, useState } from 'react'
import { RiLink } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useEditorContentOrSelectionChange } from '../../../hooks/useEditorContentOrSelectionChange'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'
import { EditLinkMenuItems } from '../../LinkToolbar/EditLinkMenuItems'

function checkLinkInSchema(editor: MiaomaDocEditor<BlockSchema, any, StyleSchema>): editor is MiaomaDocEditor<
    BlockSchema,
    {
        link: {
            type: 'link'
            propSchema: any
            content: 'styled'
        }
    },
    StyleSchema
> {
    return 'link' in editor.schema.inlineContentSchema && editor.schema.inlineContentSchema['link'] === 'link'
}

export const CreateLinkButton = () => {
    const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()
    const Components = useComponentsContext()!
    const dict = useDictionary()

    const linkInSchema = checkLinkInSchema(editor)

    const selectedBlocks = useSelectedBlocks(editor)

    const [url, setUrl] = useState<string>(editor.getSelectedLinkUrl() || '')
    const [text, setText] = useState<string>(editor.getSelectedText())

    useEditorContentOrSelectionChange(() => {
        setText(editor.getSelectedText() || '')
        setUrl(editor.getSelectedLinkUrl() || '')
    }, editor)

    const update = useCallback(
        (url: string, text: string) => {
            editor.createLink(url, text)
            editor.focus()
        },
        [editor]
    )

    const show = useMemo(() => {
        if (!linkInSchema) {
            return false
        }

        for (const block of selectedBlocks) {
            if (block.content === undefined) {
                return false
            }
        }

        return true
    }, [linkInSchema, selectedBlocks])

    if (!show || !('link' in editor.schema.inlineContentSchema) || !editor.isEditable) {
        return null
    }

    return (
        <Components.Generic.Popover.Root>
            <Components.Generic.Popover.Trigger>
                {/* TODO: hide tooltip on click */}
                <Components.FormattingToolbar.Button
                    className={'bn-button'}
                    data-test="createLink"
                    label={dict.formatting_toolbar.link.tooltip}
                    mainTooltip={dict.formatting_toolbar.link.tooltip}
                    secondaryTooltip={formatKeyboardShortcut(dict.formatting_toolbar.link.secondary_tooltip, dict.generic.ctrl_shortcut)}
                    icon={<RiLink />}
                />
            </Components.Generic.Popover.Trigger>
            <Components.Generic.Popover.Content className={'bn-popover-content bn-form-popover'} variant={'form-popover'}>
                <EditLinkMenuItems url={url} text={text} editLink={update} />
            </Components.Generic.Popover.Content>
        </Components.Generic.Popover.Root>
    )
}
