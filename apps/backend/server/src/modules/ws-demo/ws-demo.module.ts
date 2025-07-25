import { Module } from '@nestjs/common'

import { WSDemoGateway } from './ws-demo.gateway'

@Module({
  imports: [],
  providers: [WSDemoGateway],
  exports: [],
})
export class WSDemoModule {}
