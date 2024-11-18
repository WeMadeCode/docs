/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
import { Logger } from '@nestjs/common'
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Request } from 'express'
import { Server } from 'ws'
import { PostgresqlPersistence } from 'y-postgresql'
import * as Y from 'yjs'

import { setPersistence, setupWSConnection } from '../../fundamentals/yjs-postgresql/utils'

const setupPersistence = async () => {
    const isProd = process.env.NODE_ENV === 'production'
    const pgdb = await PostgresqlPersistence.build(
        {
            // host: process.env.PG_HOST,
            // port: parseInt(process.env.PG_PORT, 10),
            // database: process.env.PG_DATABASE,
            // user: process.env.PG_USER,
            // password: process.env.PG_PASSWORD,
            // host: 'localhost',
            host: isProd ? '172.28.49.109' : '192.168.31.48',
            port: 5432,
            user: 'postgres',
            database: 'postgres',
            password: 'xiaoer',
        },
        { tableName: 'yjs-writings', useIndex: false, flushSize: 200 }
    )

    setPersistence({
        bindState: async (docName, ydoc) => {
            Logger.log('🚀 ~ bindState: ~ docName:', docName)
            // Here you listen to granular document updates and store them in the database
            // You don't have to do this, but it ensures that you don't lose content when the server crashes
            // See https://github.com/yjs/yjs#Document-Updates for documentation on how to encode
            // document updates

            // official default code from: https://github.com/yjs/y-websocket/blob/37887badc1f00326855a29fc6b9197745866c3aa/bin/utils.js#L36
            const persistedYdoc = await pgdb.getYDoc(docName)
            const newUpdates = Y.encodeStateAsUpdate(ydoc)
            pgdb.storeUpdate(docName, newUpdates)
            Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc))
            ydoc.on('update', async (update: Uint8Array) => {
                pgdb.storeUpdate(docName, update)
            })
        },
        writeState: async (docName, ydoc) => {
            Logger.log('🚀 ~ writeState: ~ docName, ydoc:', docName, ydoc)
            // This is called when all connections to the document are closed.
            // In the future, this method might also be called in intervals or after a certain number of updates.
            return new Promise(resolve => {
                // When the returned Promise resolves, the document will be destroyed.
                // So make sure that the document really has been written to the database.
                resolve(true)
            })
        },
    })
}

/**
 * 初始化 yjs 的持久化
 */
setupPersistence()

@WebSocketGateway({
    path: 'doc-yjs',
})
export class DocYjsGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server

    @SubscribeMessage('ping')
    ping() {
        return 'pong'
    }

    handleConnection(connection: WebSocket, request: Request) {
        // We can handle authentication of user like below
        // const token = getCookie(request?.headers?.cookie, 'auth_token');
        // const ERROR_CODE_WEBSOCKET_AUTH_FAILED = 4000;
        // if (!token) {
        //   connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
        // } else {
        //   const signedJwt = this.authService.verifyToken(token);
        //   if (!signedJwt) connection.close(ERROR_CODE_WEBSOCKET_AUTH_FAILED);
        //   else {
        //     const docName = getCookie(request?.headers?.cookie, 'roomName');
        //     setupWSConnection(connection, request, { ...(docName && { docName }) });
        //   }
        // }

        setupWSConnection(connection, request)
    }

    handleDisconnect() {
        // Logger.log(`Client disconnected: ${JSON.stringify(client)}`)
        Logger.log(`Client disconnected`)
    }

    // 示例文档更新
    @SubscribeMessage('doc-update')
    docUpdate(client: any, payload: any) {
        Logger.log(`doc-update, payload: ${JSON.stringify(payload)}`)

        return payload
    }
}
