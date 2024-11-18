/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { Avatar, AvatarFallback, AvatarImage } from '@miaoma-doc/shadcn-shared-ui/components/ui/avatar'
import { Button } from '@miaoma-doc/shadcn-shared-ui/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@miaoma-doc/shadcn-shared-ui/components/ui/collapsible'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@miaoma-doc/shadcn-shared-ui/components/ui/dropdown-menu'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from '@miaoma-doc/shadcn-shared-ui/components/ui/sidebar'
import { useToast } from '@miaoma-doc/shadcn-shared-ui/hooks/use-toast'
import { useQuery } from '@tanstack/react-query'
import {
    ArrowUpRight,
    ChevronRight,
    FileStack,
    MessageCircleQuestion,
    MoreHorizontal,
    Search,
    Settings,
    StarOff,
    Trash2,
    Waypoints,
} from 'lucide-react'
import { NavLink, useNavigate } from 'react-router-dom'

import * as srv from '@/services'
import { miaoConfetti } from '@/utils/miao-confetti'

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

export function Aside() {
    const navigate = useNavigate()
    const { toast } = useToast()
    const { isMobile } = useSidebar()
    const { data: currentUser } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const res = await srv.currentUser()
            return res.data
        },
    })

    const handleConfetti = () => {
        miaoConfetti.firework()
    }
    const handleLogout = () => {
        toast({
            title: '退出登录',
        })
        localStorage.removeItem('token')
        // queryClient.clear()
        navigate(`/account/login?redirect=${window.location.pathname}`)
    }
    return (
        <Sidebar variant="inset">
            <SidebarHeader>
                <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-2">
                    <a href="/" className="flex items-center gap-2 ">
                        <img className="w-8" src="/logo.png" />
                        <p className="font-semibold text-lg">妙码协同文档</p>
                    </a>
                </div>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a>
                                <Search />
                                <span>搜索</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to={`/doc`}>
                                <FileStack />
                                <span>全部文档</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavLink to={`/doc/graph`}>
                                <Waypoints />
                                <span>文档图谱</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>所有文档</SidebarGroupLabel>
                    <SidebarMenu>
                        {pages.map(item => (
                            <Collapsible key={item.name}>
                                <SidebarMenuItem key={item.name}>
                                    <SidebarMenuButton asChild>
                                        <NavLink
                                            key={`/doc/${item.id}`}
                                            to={`/doc/${item.id}`}
                                            title={item.name}
                                            // className={({ isActive }) => cn(isActive ? 'bg-red-500' : 'bg-green-500')}
                                        >
                                            <span className="text-lg">{item.emoji}</span>
                                            <span className="text-xs">{item.name}</span>
                                        </NavLink>
                                    </SidebarMenuButton>
                                    {item.links && (
                                        <>
                                            <CollapsibleTrigger asChild>
                                                <SidebarMenuAction
                                                    className="left-2 bg-sidebar-accent text-sidebar-accent-foreground data-[state=open]:rotate-90"
                                                    showOnHover
                                                >
                                                    <ChevronRight />
                                                </SidebarMenuAction>
                                            </CollapsibleTrigger>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.links.map(page => (
                                                        <SidebarMenuSubItem key={page.name}>
                                                            <SidebarMenuSubButton asChild>
                                                                <a href="#">
                                                                    <span className="text-lg">{page.emoji}</span>
                                                                    <span>{page.name}</span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    ))}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <SidebarMenuAction showOnHover>
                                                <MoreHorizontal />
                                                <span className="sr-only">More</span>
                                            </SidebarMenuAction>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="w-56 rounded-lg"
                                            side={isMobile ? 'bottom' : 'right'}
                                            align={isMobile ? 'end' : 'start'}
                                        >
                                            <DropdownMenuItem>
                                                <StarOff className="text-muted-foreground" />
                                                <span>Remove from Favorites</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <ArrowUpRight className="text-muted-foreground" />
                                                <span>Open in New Tab</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <Trash2 className="text-muted-foreground" />
                                                <span>Delete</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </SidebarMenuItem>
                            </Collapsible>
                        ))}
                        {/* <SidebarMenuItem>
                            <SidebarMenuButton className="text-sidebar-foreground/70">
                                <MoreHorizontal />
                                <span>More</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem> */}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full h-fit flex justify-start gap-3 rounded-lg px-2 py-1 text-muted-foreground transition-all hover:text-primary"
                            onClick={handleConfetti}
                        >
                            {currentUser && (
                                <>
                                    <Avatar>
                                        <AvatarImage src={`https://robohash.org/${currentUser.username}?set=set1&size=100x100`} />
                                        <AvatarFallback>{currentUser.username}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-left">
                                        <span className="text-lg">{currentUser.username}！</span>
                                        庆祝一下 🎉
                                    </p>
                                </>
                            )}
                        </Button>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <Settings />
                            设置
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton>
                            <MessageCircleQuestion />
                            关于
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <Button variant="outline" size="sm" className="w-full mt-1" onClick={handleLogout}>
                            退出登录
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
