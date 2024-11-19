/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
/*
.##.....##..######..########.########.
.##.....##.##....##.##.......##.....##
.##.....##.##.......##.......##.....##
.##.....##..######..######...########.
.##.....##.......##.##.......##...##..
.##.....##.##....##.##.......##....##.
..#######...######..########.##.....##
*/

import { Page } from './page'

/**
 * 用户相关
 */
export interface CreateUserPayload {
    username: string
    password: string
}

export interface LoginPayload {
    username: string
    password: string
}

export interface LoginRes {
    data: {
        access_token: string
    }
}

export interface User {
    username: string
    email: string
}
export interface CurrentUserRes {
    data: User
}

/*
.########.....###.....######...########
.##.....##...##.##...##....##..##......
.##.....##..##...##..##........##......
.########..##.....##.##...####.######..
.##........#########.##....##..##......
.##........##.....##.##....##..##......
.##........##.....##..######...########
*/
/**
 * 页面相关
 */
/**
 * 创建页面
 */
export interface CreatePagePayload {
    emoji: string
    title: string
}

/**
 * 更新页面
 */
export interface UpdatePagePayload {
    pageId: string
    title: string
}

/**
 * 页面列表
 */
export interface PageListRes {
    data: {
        pages: Page[]
        count: number
    }
}

/**
 * 页面关系图谱
 */
export interface WithLinksPage extends Page {
    links: string[]
}
export interface PageGraphRes {
    data: WithLinksPage[]
}
