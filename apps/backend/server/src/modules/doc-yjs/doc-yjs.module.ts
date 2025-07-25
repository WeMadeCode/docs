import { Module } from '@nestjs/common'

import { DocYjsGateway } from './doc-yjs.gateway'

@Module({
  imports: [],
  providers: [DocYjsGateway],
  exports: [],
})
export class DocYjsModule {}
