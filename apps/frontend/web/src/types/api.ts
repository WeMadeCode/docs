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

export interface CurrentUserRes {
    data: {
        username: string
        email: string
    }
}
