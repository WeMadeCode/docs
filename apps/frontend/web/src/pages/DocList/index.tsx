/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { Button } from '@miaoma-doc/shadcn-shared-ui/components/ui/button'
import { SidebarInset, SidebarTrigger } from '@miaoma-doc/shadcn-shared-ui/components/ui/sidebar'
import { MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'

const pages = [
    {
        id: '1',
        name: 'Notion 与飞书文档协同方案精析，字节前端专家传授百万年薪架构师级项目重难点',
        emoji: '🔭',
        links: [{ id: '', name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈', emoji: '🐚' }],
    },
    {
        id: '2',
        name: 'Ant Design 组件库架构设计与开发实践，高级前端专家带你掌握基建面试技巧',
        emoji: '🔦',
    },
    {
        id: '3',
        name: 'Taro、Tauri 多端开发实践与原理剖析，《Taro 多端开发权威指南》作者带你悟透多端框架原理',
        emoji: '👽',
    },
    {
        id: '4',
        name: 'Nest 服务端开发与原理深度剖析，《NestJS 实战》作者带你领略框架设计之美',
        emoji: '🥤',
    },
    {
        id: '5',
        name: 'Babel 与编译原理详解，字节高级前端专家带你从零实现飞书表格公式执行器',
        emoji: '🚀',
    },
    {
        id: '6',
        name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈',
        emoji: '🐚',
    },
]

export function DocList() {
    return (
        <SidebarInset>
            <div className="flex flex-col w-full h-full">
                <div className="flex flex-row items-center p-6 gap-2">
                    <SidebarTrigger />
                    <h1 className="text-xl text-zinc-500">全部文档</h1>
                </div>
                <div className="flex flex-col">
                    {pages.map(page => (
                        <Link
                            key={page.id}
                            to={`/doc/${page.id}`}
                            className="flex flex-row items-center justify-between py-3 px-6 hover:bg-zinc-50"
                        >
                            <div className="flex flex-row items-center">
                                <span className="text-xl">{page.emoji}</span>
                                <span className="ml-6 text-sm font-semibold">{page.name}</span>
                            </div>
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
                        </Link>
                    ))}
                </div>
            </div>
        </SidebarInset>
    )
}
