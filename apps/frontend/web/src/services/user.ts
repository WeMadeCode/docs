/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */

import { CurrentUserRes, LoginPayload, LoginRes } from '@/types/api'
import { request } from '@/utils/request'

/**
 * 用户登录
 * @param data
 * @returns
 */
export const login = async (data: LoginPayload): Promise<LoginRes> => {
    return await request.post('/auth/login', data)
}

/**
 * 获取当前用户信息
 * @returns
 */
export const currentUser = async (): Promise<CurrentUserRes> => {
    return await request.get('/currentUser')
}

/**
 * 用户注册
 * @param data
 * @returns
 */
export const register = async (data: { username: string; password: string }) => {
    return await request.post('/user/register', data)
}

/**
 * 用户退出登录
 * @returns
 */
export const logout = async () => {
    return await request.post('/user/logout')
}
