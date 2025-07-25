import { join } from 'node:path'

import { Logger } from '@nestjs/common'

export default () => {
  const isProd = process.env.NODE_ENV === 'production'
  Logger.log('🚀 ~ database config: ~ isProd:', isProd)
  return {
    database: {
      type: 'postgres',
      host: isProd ? '172.28.49.109' : 'localhost',
      port: 5432,
      username: 'postgres',
      database: 'postgres',
      password: 'xiaoer',
      entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')],
      synchronize: true,
    },
  }
}
