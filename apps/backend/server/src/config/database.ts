/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { join } from 'node:path'

import { Logger } from '@nestjs/common'

export default () => {
  const isProd = process.env.NODE_ENV === 'production'
  Logger.log('🚀 ~ database config: ~ isProd:', isProd)
  return {
    database: {
      type: 'postgres',
      host: 'localhost',
      // host: isProd ? '172.28.49.109' : '192.168.31.251',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'xiaoer',
      entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
      synchronize: true,
    },
  }
}
