// server.js
const WebSocket = require('ws')
const { setupWSConnection } = require('y-websocket/bin/utils')
const port = 1314

const wss = new WebSocket.Server({ port })
wss.on('connection', ws => {
  setupWSConnection(ws, wss)
})

console.log(`WebSocket server running on ws://localhost:${port}`)
