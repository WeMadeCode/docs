import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import databaseConfig from './config/database'
import { YjsPostgresqlModule } from './fundamentals/yjs-postgresql/yjs-postgresql.module'
import { ApplicationModule } from './modules/application/application.module'
import { AuthModule } from './modules/auth/auth.module'
// import { WSDemoModule } from './modules/ws-demo/ws-demo.module'
import { DocYjsModule } from './modules/doc-yjs/doc-yjs.module'
import { PageModule } from './modules/page/page.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [databaseConfig] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return config.get('database')
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    ApplicationModule,
    // WSDemoModule,
    DocYjsModule,
    PageModule,
    YjsPostgresqlModule.forRoot(),
  ],
  providers: [],
})
export class AppModule {}
