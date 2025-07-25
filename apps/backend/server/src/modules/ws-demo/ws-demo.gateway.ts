import { Logger } from '@nestjs/common'
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server } from 'ws'

@WebSocketGateway({
  path: 'ws-demo',
})
export class WSDemoGateway {
  @WebSocketServer() server: Server

  @SubscribeMessage('ping')
  ping() {
    return 'pong'
  }

  @SubscribeMessage('doc-update')
  docUpdate(client: any, payload: any) {
    Logger.log(`doc-update, payload: ${JSON.stringify(payload)}`)

    return payload
  }
}
