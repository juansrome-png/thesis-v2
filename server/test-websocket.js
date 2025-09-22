import WebSocket from 'ws';

console.log('Testing WebSocket connection...');

const ws = new WebSocket('ws://localhost:3002');

ws.on('open', () => {
    console.log('✅ WebSocket connected successfully');
    
    // Send subscription message
    const message = JSON.stringify({
        type: 'subscribe',
        symbols: ['AAPL', 'NVDA']
    });
    
    ws.send(message);
    console.log('📤 Sent subscription message:', message);
});

ws.on('message', (data) => {
    console.log('📥 Received message:', data.toString());
});

ws.on('error', (error) => {
    console.log('❌ WebSocket error:', error.message);
});

ws.on('close', (code, reason) => {
    console.log('🔌 WebSocket closed:', code, reason.toString());
});

// Timeout after 5 seconds
setTimeout(() => {
    if (ws.readyState === WebSocket.CONNECTING) {
        console.log('⏰ Connection timeout');
        ws.close();
    }
}, 5000);
