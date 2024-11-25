/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { createReactInlineContentSpec } from '@miaoma-doc/react'

import { MentionContent } from './MentionContent'

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
    {
        type: 'mention',
        propSchema: {
            id: {
                default: 'Unknown',
            },
        },
        content: 'none',
    },
    {
        render: props => {
            const { id } = props.inlineContent.props
            return <MentionContent pageId={id} />
        },
    }
)
