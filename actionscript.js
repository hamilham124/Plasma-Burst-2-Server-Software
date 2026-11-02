// server.js (Node.js Proxy Server)
const WebSocket = require('ws');
const net = require('net');

const PORTAL_WS_PORT = 8080;          // Port browser connects to
const TARGET_GAME_HOST = '127.0.0.1'; // Plazma Burst 2 / Custom Server IP
const TARGET_GAME_PORT = 4500;        // Game Server TCP Port

const wss = new WebSocket.Server({ port: PORTAL_WS_PORT });

wss.on('connection', (ws) => {
    console.log('Client connected to Web Portal');

    // Open raw TCP socket connection to target game server
    const tcpClient = net.connect(TARGET_GAME_PORT, TARGET_GAME_HOST, () => {
        console.log('Bridge connected to Game Server');
    });

    // Web Socket -> TCP
    ws.on('message', (data) => {
        tcpClient.write(data);
    });

    // TCP -> Web Socket
    tcpClient.on('data', (data) => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(data);
        }
    });

    ws.on('close', () => tcpClient.end());
    tcpClient.on('close', () => ws.close());
    tcpClient.on('error', (err) => console.error('TCP Error:', err.message));
});