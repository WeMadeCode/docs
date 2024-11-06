/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { RiExternalLinkFill } from 'react-icons/ri'

import { useComponentsContext } from '../../../editor/ComponentsContext'
import { useDictionary } from '../../../i18n/dictionary'
import { sanitizeUrl } from '../../../util/sanitizeUrl'
import { LinkToolbarProps } from '../LinkToolbarProps'

export const OpenLinkButton = (props: Pick<LinkToolbarProps, 'url'>) => {
    const Components = useComponentsContext()!
    const dict = useDictionary()

    return (
        <Components.LinkToolbar.Button
            className={'bn-button'}
            mainTooltip={dict.link_toolbar.open.tooltip}
            label={dict.link_toolbar.open.tooltip}
            isSelected={false}
            onClick={() => {
                window.open(sanitizeUrl(props.url, window.location.href), '_blank')
            }}
            icon={<RiExternalLinkFill />}
        />
    )
}
