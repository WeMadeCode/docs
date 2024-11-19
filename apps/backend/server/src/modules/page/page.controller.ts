/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, UsePipes } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { nanoid } from 'nanoid'

import { PageEntity } from '../../entities/page.entity'
import { UserEntity } from '../../entities/user.entity'
import { ZodValidationPipe } from '../../pipes/zod-validation.pipe'
import { CreatePageDto, createPageSchema, DeletePageDto, deletePageSchema } from './page.dto'
import { PageService } from './page.service'

/**
 * 经典 Restful 风格的控制器
 * 通过装饰器 @Controller('page') 指定了路由前缀
 * 即该控制器下的所有路由都会以 /page 为前缀
 * post 请求 /page 会触发 create 方法，表示创建
 * put 请求 /page 会触发 update 方法，表示更新
 * get 请求 /page 会触发 list 方法，表示获取列表
 * delete 请求 /page 会触发 delete 方法，表示删除
 */

@Controller('page')
@UseGuards(AuthGuard('jwt'))
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Get('graph')
    async graph() {
        const graph = await this.pageService.graph()
        return { data: graph, success: true }
    }

    @Post()
    @UsePipes(new ZodValidationPipe(createPageSchema))
    async create(@Body() body: CreatePageDto, @Request() req) {
        const user = new UserEntity()
        user.id = req.user.id
        const page = new PageEntity(body)
        Reflect.set<PageEntity, 'pageId'>(page, 'pageId', 'page' + nanoid(6))

        const newUser = await this.pageService.create({ ...page, user })
        return { data: newUser, success: true }
    }

    @Put()
    async update(@Body() body) {
        const newPage = await this.pageService.update(body)
        return { data: newPage, success: true }
    }

    @Get(':pageId')
    async fetch(@Param() params, @Request() req) {
        const page = await this.pageService.fetch({ pageId: params.pageId, userId: req.user.id })
        return { data: page, success: true }
    }

    @Get()
    async list(@Request() req) {
        const list = await this.pageService.list({ userId: req.user.id })
        return { data: list, success: true }
    }

    @Delete()
    @UsePipes(new ZodValidationPipe(deletePageSchema))
    async delete(@Body() body: DeletePageDto, @Request() req) {
        const newUser = await this.pageService.delete({ pageId: body.pageId, userId: req.user.id })
        return { data: newUser, success: true }
    }
}
