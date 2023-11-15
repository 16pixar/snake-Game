const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' },
});

//Acá va la implementación y lo que despliega la terminal
app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    // Aquí puedes agregar lógica adicional para gestionar eventos de Socket.IO
    // Por ejemplo, escuchar eventos 'disconnect', 'message', etc.
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
