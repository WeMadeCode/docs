/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { BlockSchema, formatKeyboardShortcut, InlineContentSchema, MiaomaDocEditor, StyleSchema } from '@miaoma-doc/core'
import { useMemo, useState } from 'react'
import { IconType } from 'react-icons'
import { RiBold, RiCodeFill, RiItalic, RiStrikethrough, RiUnderline } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useEditorContentOrSelectionChange } from '../../../hooks/useEditorContentOrSelectionChange'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'

type BasicTextStyle = 'bold' | 'italic' | 'underline' | 'strike' | 'code'

const icons = {
    bold: RiBold,
    italic: RiItalic,
    underline: RiUnderline,
    strike: RiStrikethrough,
    code: RiCodeFill,
} satisfies Record<BasicTextStyle, IconType>

function checkBasicTextStyleInSchema<Style extends BasicTextStyle>(
    style: Style,
    editor: MiaomaDocEditor<BlockSchema, InlineContentSchema, any>
): editor is MiaomaDocEditor<
    BlockSchema,
    InlineContentSchema,
    {
        [k in Style]: {
            type: k
            propSchema: 'boolean'
        }
    }
> {
    return (
        style in editor.schema.styleSchema &&
        editor.schema.styleSchema[style].type === style &&
        editor.schema.styleSchema[style].propSchema === 'boolean'
    )
}

export const BasicTextStyleButton = <Style extends BasicTextStyle>(props: { basicTextStyle: Style }) => {
    const dict = useDictionary()
    const Components = useComponentsContext()!

    const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const basicTextStyleInSchema = checkBasicTextStyleInSchema(props.basicTextStyle, editor)

    const selectedBlocks = useSelectedBlocks(editor)

    const [active, setActive] = useState<boolean>(props.basicTextStyle in editor.getActiveStyles())

    useEditorContentOrSelectionChange(() => {
        if (basicTextStyleInSchema) {
            setActive(props.basicTextStyle in editor.getActiveStyles())
        }
    }, editor)

    const toggleStyle = (style: typeof props.basicTextStyle) => {
        editor.focus()

        if (!basicTextStyleInSchema) {
            return
        }

        if (editor.schema.styleSchema[style].propSchema !== 'boolean') {
            throw new Error('can only toggle boolean styles')
        }
        editor.toggleStyles({ [style]: true } as any)
    }

    const show = useMemo(() => {
        if (!basicTextStyleInSchema) {
            return false
        }
        // Also don't show when none of the selected blocks have text content
        return !!selectedBlocks.find(block => block.content !== undefined)
    }, [basicTextStyleInSchema, selectedBlocks])

    if (!show || !editor.isEditable) {
        return null
    }

    const Icon = icons[props.basicTextStyle] as any // TODO
    return (
        <Components.FormattingToolbar.Button
            className="bn-button"
            data-test={props.basicTextStyle}
            onClick={() => toggleStyle(props.basicTextStyle)}
            isSelected={active}
            label={dict.formatting_toolbar[props.basicTextStyle].tooltip}
            mainTooltip={dict.formatting_toolbar[props.basicTextStyle].tooltip}
            secondaryTooltip={formatKeyboardShortcut(
                dict.formatting_toolbar[props.basicTextStyle].secondary_tooltip,
                dict.generic.ctrl_shortcut
            )}
            icon={<Icon />}
        />
    )
}
