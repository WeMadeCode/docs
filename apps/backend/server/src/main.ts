/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './fundamentals/common/filters/http-exception.filter'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    // 全局过滤器
    app.useGlobalFilters(new HttpExceptionFilter())

    app.setGlobalPrefix('api')

    // 设置swagger文档相关配置
    const swaggerOptions = new DocumentBuilder()
        .setTitle('妙码学院企业级文档编辑器 API 文档')
        .setDescription('妙码学院企业级文档编辑器 API 文档')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, swaggerOptions)
    SwaggerModule.setup('doc', app, document)

    await app.listen(8080)
}
bootstrap()
