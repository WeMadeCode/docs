/*
 *   Copyright (c) 2024 妙码学院 @Heyi
 *   All rights reserved.
 *   妙码学院官方出品，作者 @Heyi，供学员学习使用，可用作练习，可用作美化简历，不可开源。
 */
// server.js
const WebSocket = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils')
const port = 1314

const wss = new WebSocket.Server({ port })
wss.on('connection', ws => {
    setupWSConnection(ws, wss)
})

console.log(`WebSocket server running on ws://localhost:${port}`)
