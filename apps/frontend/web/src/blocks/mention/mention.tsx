/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { createReactInlineContentSpec } from '@miaoma-doc/react'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

import { Page } from '@/types/page'

interface MentionContentProps {
    pageId: string
}

function MentionContent(props: MentionContentProps) {
    const { pageId } = props
    const { data: pages } = useQuery<Page[]>({
        queryKey: ['pages'],
    })

    const page = useMemo(() => {
        return pages?.find(page => page.pageId === pageId)
    }, [pages])

    return (
        <Link to={`/doc/${pageId}`} className={`px-2 py-[2px] mx-1 text-sm bg-purple-200 rounded-full`}>
            <span className="mr-1">{page?.emoji}</span>
            {page?.title}
        </Link>
    )
}

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
