window.RufflePlayer = window.RufflePlayer || {};
window.RufflePlayer.config = {
    // Route Flash socket traffic through our WebSocket Proxy
    socketProxy: [
        {
            host: "plazmaburst2.com", // Or target game host
            port: 4500,
            proxyUrl: "ws://localhost:8080" // Your local/hosted bridge port
        }
    ]
};