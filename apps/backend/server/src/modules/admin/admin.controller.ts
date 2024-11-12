/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Body, Controller, Post } from '@nestjs/common'

import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Post('register')
    async add(@Body() body) {
        const newUser = await this.adminService.register(body)
        return { data: newUser, success: true }
    }
}
