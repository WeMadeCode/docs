/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PageEntity } from '../../entities/page.entity'
import { PageController } from './page.controller'
import { PageService } from './page.service'

@Module({
    imports: [TypeOrmModule.forFeature([PageEntity])],
    controllers: [PageController],
    providers: [PageService],
    exports: [],
})
export class PageModule {}
