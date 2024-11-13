/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
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
