import { NestFactory } from '@nestjs/core'
import { WsAdapter } from '@nestjs/platform-ws'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { HttpExceptionFilter } from './fundamentals/common/filters/http-exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 全局过滤器
  app.useGlobalFilters(new HttpExceptionFilter())

  // 修改 ws 默认适配器，nest 默认是基于 @nestjs/platform-socket.io，我们改为 @nestjs/platform-ws
  app.useWebSocketAdapter(new WsAdapter(app))

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

  await app.listen(8082)
}
bootstrap()
