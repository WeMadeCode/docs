/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { Button } from '@miaoma-doc/shadcn-shared-ui/components/ui/button'
import { SidebarInset, SidebarTrigger } from '@miaoma-doc/shadcn-shared-ui/components/ui/sidebar'
import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNowStrict } from 'date-fns'
import { MoreVertical, Plus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import * as srv from '@/services'
import { randomEmoji } from '@/utils/randomEmoji'

export function DocList() {
    const navigate = useNavigate()
    const { data: pages, refetch } = useQuery({
        queryKey: ['pages'],
        queryFn: async () => {
            return (await srv.fetchPageList()).data.pages
        },
    })

    /**
     * 新建文档
     */
    const handleCreate = async () => {
        const res = await srv.createPage({
            emoji: randomEmoji(),
            title: '未命名文档@妙码学院-合一',
        })
        navigate(`/doc/${res.data.pageId}`)
        refetch()
    }

    return (
        <SidebarInset>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row justify-between p-6">
                    <div className="flex flex-row items-center gap-2">
                        <SidebarTrigger />
                        <h1 className="text-xl text-zinc-500">全部文档</h1>
                    </div>
                    <Button size="sm" onClick={handleCreate}>
                        <Plus size={16} />
                        新建文档
                    </Button>
                </div>
                <div className="flex flex-col">
                    {pages?.map(page => (
                        <Link
                            key={page.pageId}
                            to={`/doc/${page.pageId}`}
                            className="flex flex-row items-center justify-between py-3 px-6 hover:bg-zinc-50"
                        >
                            <div className="flex flex-row items-center">
                                <span className="text-xl">{page.emoji}</span>
                                <span className="ml-6 text-sm font-semibold">{page.title}</span>
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <span className="text-sm text-zinc-500">{formatDistanceToNowStrict(page.createdAt)}前</span>

                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-zinc-500"
                                    onClick={ev => {
                                        ev.stopPropagation()
                                        ev.preventDefault()
                                    }}
                                >
                                    <MoreVertical size={16} />
                                </Button>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </SidebarInset>
    )
}
