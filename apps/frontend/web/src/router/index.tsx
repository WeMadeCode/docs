/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { createBrowserRouter, Navigate } from 'react-router-dom'

import { Layout } from '@/layout'
import { DocList } from '@/views/Doc'
import { Doc } from '@/views/Doc/[id]'

import AuthRoute from './AuthRoute'

// 这里是为了解决 react-router-dom 的类型问题

type PickRouter<T> = T extends (...args: any[]) => infer R ? R : never

type A = typeof createBrowserRouter

export const router: PickRouter<A> = createBrowserRouter([
    {
        path: '/',
        element: (
            <AuthRoute>
                <Layout />
            </AuthRoute>
        ),
        children: [
            {
                path: 'doc',
                element: <DocList />,
            },
            {
                path: 'doc/:id',
                element: <Doc />,
            },
            {
                path: '/',
                element: <Navigate to="/doc" replace />,
            },
        ],
    },
    {
        path: '/account/login',
        element: <div>登录注册</div>,
    },
])
