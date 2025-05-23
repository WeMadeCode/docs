/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { AuthService } from './auth.service'

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * 登录
     * @param req
     * @returns
     */
    @UseGuards(AuthGuard('local'))
    @Post('/auth/login')
    async login(@Request() req) {
        return { data: await this.authService.login(req.user), success: true }
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/auth/logout')
    async logout(/* @Request() req */) {
        return { success: await this.authService.logout(/* req.user */) }
    }

    /**
     * 获取用户信息
     * @param req
     * @returns
     */

    // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
    @UseGuards(AuthGuard('jwt'))
    @Get('currentUser')
    currentUser(@Request() req) {
        return { data: req.user }
    }

    // 测试登录后才可访问的接口，在需要的地方使用守卫，可保证必须携带token才能访问
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req) {
        return req.user
    }
}
