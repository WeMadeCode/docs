/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { createReactInlineContentSpec } from '@miaoma-doc/react'
import { Link } from 'react-router-dom'

// The Mention inline content.
export const Mention = createReactInlineContentSpec(
    {
        type: 'mention',
        propSchema: {
            id: {
                default: 'Unknown',
            },
            title: {
                default: 'Unknown',
            },
            icon: {
                default: '📖',
            },
        },
        content: 'none',
    },
    {
        render: props => {
            const { id, icon, title } = props.inlineContent.props
            return (
                <Link to={`/doc/${id}`} className={`px-2 py-[2px] mx-1 text-sm bg-purple-200 rounded-full`}>
                    <span className="mr-1">{icon}</span>
                    {title}
                </Link>
            )
        },
    }
)
