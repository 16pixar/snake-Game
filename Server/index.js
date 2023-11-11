const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server, {
    cors: { origin: '*' },
});

io.on('connection', (socket) => { 
    console.log('A user connected');
});

server.listen(3000);