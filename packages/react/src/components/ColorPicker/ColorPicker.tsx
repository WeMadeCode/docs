/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { useComponentsContext } from '../../editor/ComponentsContext'
import { useDictionary } from '../../i18n/dictionary'
import { ColorIcon } from './ColorIcon'

const colors = ['default', 'gray', 'brown', 'red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink'] as const

export const ColorPicker = (props: {
    onClick?: () => void
    iconSize?: number
    text?: {
        color: string
        setColor: (color: string) => void
    }
    background?: {
        color: string
        setColor: (color: string) => void
    }
}) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()
    const TextColorSection = () =>
        props.text ? (
            <>
                <Components.Generic.Menu.Label>{dict.color_picker.text_title}</Components.Generic.Menu.Label>
                {colors.map(color => (
                    <Components.Generic.Menu.Item
                        onClick={() => {
                            props?.onClick?.()
                            props.text!.setColor(color)
                        }}
                        data-test={'text-color-' + color}
                        icon={<ColorIcon textColor={color} size={props.iconSize} />}
                        checked={props.text!.color === color}
                        key={'text-color-' + color}
                    >
                        {dict.color_picker.colors[color]}
                    </Components.Generic.Menu.Item>
                ))}
            </>
        ) : null

    const BackgroundColorSection = () =>
        props.background ? (
            <>
                <Components.Generic.Menu.Label>{dict.color_picker.background_title}</Components.Generic.Menu.Label>
                {colors.map(color => (
                    <Components.Generic.Menu.Item
                        onClick={() => {
                            props?.onClick?.()
                            props.background!.setColor(color)
                        }}
                        data-test={'background-color-' + color}
                        icon={<ColorIcon backgroundColor={color} size={props.iconSize} />}
                        key={'background-color-' + color}
                        checked={props.background!.color === color}
                    >
                        {dict.color_picker.colors[color]}
                    </Components.Generic.Menu.Item>
                ))}
            </>
        ) : null

    return (
        <>
            <TextColorSection />
            <BackgroundColorSection />
        </>
    )
}
