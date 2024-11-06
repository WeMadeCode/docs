/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import {
    BlockSchema,
    checkBlockHasDefaultProp,
    checkBlockTypeHasDefaultProp,
    DefaultBlockSchema,
    DefaultInlineContentSchema,
    DefaultStyleSchema,
    InlineContentSchema,
    StyleSchema,
} from '@miaoma-doc/core'
import { ReactNode } from 'react'

import { useComponentsContext } from '../../../../editor/ComponentsContext'
import { useMiaomaDocEditor } from '../../../../hooks/useMiaomaDocEditor'
import { ColorPicker } from '../../../ColorPicker/ColorPicker'
import { DragHandleMenuProps } from '../DragHandleMenuProps'

export const BlockColorsItem = <
    BSchema extends BlockSchema = DefaultBlockSchema,
    I extends InlineContentSchema = DefaultInlineContentSchema,
    S extends StyleSchema = DefaultStyleSchema,
>(
    props: DragHandleMenuProps<BSchema, I, S> & {
        children: ReactNode
    }
) => {
    const Components = useComponentsContext()!

    const editor = useMiaomaDocEditor<BSchema, I, S>()

    if (
        !checkBlockTypeHasDefaultProp('textColor', props.block.type, editor) &&
        !checkBlockTypeHasDefaultProp('backgroundColor', props.block.type, editor)
    ) {
        return null
    }

    return (
        <Components.Generic.Menu.Root position={'right'} sub={true}>
            <Components.Generic.Menu.Trigger sub={true}>
                <Components.Generic.Menu.Item className={'bn-menu-item'} subTrigger={true}>
                    {props.children}
                </Components.Generic.Menu.Item>
            </Components.Generic.Menu.Trigger>

            <Components.Generic.Menu.Dropdown sub={true} className={'bn-menu-dropdown bn-color-picker-dropdown'}>
                <ColorPicker
                    iconSize={18}
                    text={
                        checkBlockTypeHasDefaultProp('textColor', props.block.type, editor) &&
                        checkBlockHasDefaultProp('textColor', props.block, editor)
                            ? {
                                  color: props.block.props.textColor,
                                  setColor: color =>
                                      editor.updateBlock(props.block, {
                                          type: props.block.type,
                                          props: { textColor: color },
                                      }),
                              }
                            : undefined
                    }
                    background={
                        checkBlockTypeHasDefaultProp('backgroundColor', props.block.type, editor) &&
                        checkBlockHasDefaultProp('backgroundColor', props.block, editor)
                            ? {
                                  color: props.block.props.backgroundColor,
                                  setColor: color =>
                                      editor.updateBlock(props.block, {
                                          props: { backgroundColor: color },
                                      }),
                              }
                            : undefined
                    }
                />
            </Components.Generic.Menu.Dropdown>
        </Components.Generic.Menu.Root>
    )
}
