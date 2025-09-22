console.log('External script is running!');
document.getElementById('test').innerHTML = 'External JavaScript is working!';

// Test WebSocket
try {
    console.log('Testing WebSocket...');
    const ws = new WebSocket('ws://localhost:3002');
    console.log('WebSocket created, readyState:', ws.readyState);
    
    ws.onopen = function() {
        console.log('WebSocket opened!');
        document.getElementById('test').innerHTML = 'WebSocket Connected!';
    };
    
    ws.onerror = function(error) {
        console.log('WebSocket error:', error);
        document.getElementById('test').innerHTML = 'WebSocket Error!';
    };
    
} catch (error) {
    console.log('WebSocket creation failed:', error);
    document.getElementById('test').innerHTML = 'WebSocket Failed: ' + error.message;
}
