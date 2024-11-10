/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import '@miaoma-doc/shadcn/style.css'

import { locales } from '@miaoma-doc/core'
import { useCreateMiaomaDoc } from '@miaoma-doc/react'
import { MiaomaDocView } from '@miaoma-doc/shadcn'
import { Separator } from '@miaoma-doc/shadcn-shared-ui/components/ui/separator'
import { SidebarInset, SidebarTrigger } from '@miaoma-doc/shadcn-shared-ui/components/ui/sidebar'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { SharePopover } from '@/components/SharePopover'

import { AvatarList } from './AvatarList'
import { cursorRender } from './cursorRender'

const pages = [
    {
        id: '1',
        name: 'Notion 与飞书文档协同方案精析，字节前端专家传授百万年薪架构师级项目重难点',
        url: '#',
        emoji: '🔭',
        links: [{ id: '', name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈', emoji: '🐚', url: '#' }],
    },
    {
        id: '2',
        name: 'Ant Design 组件库架构设计与开发实践，高级前端专家带你掌握基建面试技巧',
        url: '#',
        emoji: '🔦',
    },
    {
        id: '3',
        name: 'Taro、Tauri 多端开发实践与原理剖析，《Taro 多端开发权威指南》作者带你悟透多端框架原理',
        url: '#',
        emoji: '👽',
    },
    {
        id: '4',
        name: 'Nest 服务端开发与原理深度剖析，《NestJS 实战》作者带你领略框架设计之美',
        url: '#',
        emoji: '🥤',
    },
    {
        id: '5',
        name: 'Babel 与编译原理详解，字节高级前端专家带你从零实现飞书表格公式执行器',
        url: '#',
        emoji: '🚀',
    },
    {
        id: '6',
        name: '服务端渲染（SSR）与前后端同构技术原理揭秘，字节前端专家带你光速进阶全栈',
        url: '#',
        emoji: '🐚',
    },
]

export const Doc = () => {
    const params = useParams()
    const doc = useMemo(() => new Y.Doc(), [])
    const provider = useRef(new WebsocketProvider('ws://localhost:1314', `miaoma-doc-${params.id}`, doc)).current
    const [remoteUsers, setRemoteUsers] = useState<Map<number, { name: string; color: string }>>()

    const page = useMemo(() => {
        return pages.find(page => page.id === params.id)
    }, [params?.id])

    const userName = useMemo(() => {
        const storedName = sessionStorage.getItem('miaomadoc-user-name')
        if (storedName) {
            return storedName
        } else {
            const randomName = `heyi-${Math.floor(Math.random() * 1000)}`
            sessionStorage.setItem('miaomadoc-user-name', randomName)
            return randomName
        }
    }, [])

    const randomColor = useMemo(() => {
        const r = Math.floor(Math.random() * 256)
        const g = Math.floor(Math.random() * 256)
        const b = Math.floor(Math.random() * 256)
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
    }, [])

    const editor = useCreateMiaomaDoc(
        {
            dictionary: locales.zh,
            collaboration: {
                // The Yjs Provider responsible for transporting updates:
                provider,
                // Where to store BlockNote data in the Y.Doc:
                fragment: doc.getXmlFragment(`document-store-${params.id}`),
                // Information (name and color) for this user:
                user: {
                    name: userName,
                    color: randomColor,
                },
                renderCursor: cursorRender,
            },
        },
        [params.id, provider]
    )

    useEffect(() => {
        provider.connect()
        const changeHandler = () => {
            const states = provider.awareness.getStates()
            const users = new Map<number, { name: string; color: string }>()
            const cursors = new Map<number, { x: number; y: number; windowSize: { width: number; height: number } }>()
            for (const [key, value] of states) {
                // 排除自己
                if (key === provider.awareness.clientID) {
                    continue
                }
                users.set(key, value.user)
                cursors.set(key, value.cursor)
            }
            setRemoteUsers(users)
        }
        // @TODO: 这里需要优化，避免频繁更新
        provider.awareness.on('change', changeHandler)

        return () => {
            provider.awareness.off('change', changeHandler)
            provider.disconnect()
        }
    }, [provider])

    useEffect(() => {
        editor.onChange(value => {
            console.log(value)
        })
    }, [editor])

    return (
        <SidebarInset>
            <header className="flex flex-row justify-between items-center h-[52px] px-[16px] border-b border-b-zinc-100">
                <div className="flex flex-row items-center gap-2">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex flex-row flex-auto items-center text-sm">
                        <em className="mr-2">{page?.emoji}</em>
                        <p className="overflow-hidden whitespace-nowrap max-w-[300px] text-ellipsis" title={page?.name}>
                            {page?.name}
                        </p>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4">
                    {remoteUsers && <AvatarList remoteUsers={remoteUsers} />}
                    <SharePopover />
                </div>
            </header>
            <div className="w-[60%] mx-auto">
                <h1 className="py-12 px-[54px] leading-[3.25rem] text-4xl font-bold">
                    <span className="mr-4">{page?.emoji}</span>
                    <span>{page?.name}</span>
                </h1>
                <MiaomaDocView editor={editor} theme="light" />
            </div>
        </SidebarInset>
    )
}
