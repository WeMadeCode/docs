/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { BlockSchema, InlineContentSchema, MiaomaDocEditor, StyleSchema } from '@miaoma-doc/core'
import { useCallback, useMemo, useState } from 'react'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useEditorContentOrSelectionChange } from '../../../hooks/useEditorContentOrSelectionChange'
import { useMiaomaDocEditor } from '../../../hooks/useMiaomaDocEditor'
import { useSelectedBlocks } from '../../../hooks/useSelectedBlocks'
import { useDictionary } from '../../../i18n/dictionary'
import { ColorIcon } from '../../ColorPicker/ColorIcon'
import { ColorPicker } from '../../ColorPicker/ColorPicker'

function checkColorInSchema<Color extends 'text' | 'background'>(
    color: Color,
    editor: MiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>
): editor is MiaomaDocEditor<
    BlockSchema,
    InlineContentSchema,
    Color extends 'text'
        ? {
              textColor: {
                  type: 'textColor'
                  propSchema: 'string'
              }
          }
        : {
              backgroundColor: {
                  type: 'backgroundColor'
                  propSchema: 'string'
              }
          }
> {
    return (
        `${color}Color` in editor.schema.styleSchema &&
        editor.schema.styleSchema[`${color}Color`].type === `${color}Color` &&
        editor.schema.styleSchema[`${color}Color`].propSchema === 'string'
    )
}

export const ColorStyleButton = () => {
    const Components = useComponentsContext()!
    const dict = useDictionary()
    const editor = useMiaomaDocEditor<BlockSchema, InlineContentSchema, StyleSchema>()

    const textColorInSchema = checkColorInSchema('text', editor)
    const backgroundColorInSchema = checkColorInSchema('background', editor)

    const selectedBlocks = useSelectedBlocks(editor)

    const [currentTextColor, setCurrentTextColor] = useState<string>(
        textColorInSchema ? editor.getActiveStyles().textColor || 'default' : 'default'
    )
    const [currentBackgroundColor, setCurrentBackgroundColor] = useState<string>(
        backgroundColorInSchema ? editor.getActiveStyles().backgroundColor || 'default' : 'default'
    )

    useEditorContentOrSelectionChange(() => {
        if (textColorInSchema) {
            setCurrentTextColor(editor.getActiveStyles().textColor || 'default')
        }
        if (backgroundColorInSchema) {
            setCurrentBackgroundColor(editor.getActiveStyles().backgroundColor || 'default')
        }
    }, editor)

    const setTextColor = useCallback(
        (color: string) => {
            if (!textColorInSchema) {
                throw Error('Tried to set text color, but style does not exist in editor schema.')
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            color === 'default' ? editor.removeStyles({ textColor: color }) : editor.addStyles({ textColor: color })

            setTimeout(() => {
                // timeout needed to ensure compatibility with Mantine Toolbar useFocusTrap
                editor.focus()
            })
        },
        [editor, textColorInSchema]
    )

    const setBackgroundColor = useCallback(
        (color: string) => {
            if (!backgroundColorInSchema) {
                throw Error('Tried to set background color, but style does not exist in editor schema.')
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            color === 'default' ? editor.removeStyles({ backgroundColor: color }) : editor.addStyles({ backgroundColor: color })

            setTimeout(() => {
                // timeout needed to ensure compatibility with Mantine Toolbar useFocusTrap
                editor.focus()
            })
        },
        [backgroundColorInSchema, editor]
    )

    const show = useMemo(() => {
        if (!textColorInSchema && !backgroundColorInSchema) {
            return false
        }

        for (const block of selectedBlocks) {
            if (block.content !== undefined) {
                return true
            }
        }

        return false
    }, [backgroundColorInSchema, selectedBlocks, textColorInSchema])

    if (!show || !editor.isEditable) {
        return null
    }

    return (
        <Components.Generic.Menu.Root>
            <Components.Generic.Menu.Trigger>
                <Components.FormattingToolbar.Button
                    className={'bn-button'}
                    data-test="colors"
                    label={dict.formatting_toolbar.colors.tooltip}
                    mainTooltip={dict.formatting_toolbar.colors.tooltip}
                    icon={<ColorIcon textColor={currentTextColor} backgroundColor={currentBackgroundColor} size={20} />}
                />
            </Components.Generic.Menu.Trigger>
            <Components.Generic.Menu.Dropdown className={'bn-menu-dropdown bn-color-picker-dropdown'}>
                <ColorPicker
                    text={
                        textColorInSchema
                            ? {
                                  color: currentTextColor,
                                  setColor: setTextColor,
                              }
                            : undefined
                    }
                    background={
                        backgroundColorInSchema
                            ? {
                                  color: currentBackgroundColor,
                                  setColor: setBackgroundColor,
                              }
                            : undefined
                    }
                />
            </Components.Generic.Menu.Dropdown>
        </Components.Generic.Menu.Root>
    )
}
