const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' },
});

// Acá va la implementación y lo que despliega la terminal
app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    // Genera un ID único para el usuario
    const userId = socket.id;

    // Almacena información del usuario en el objeto 'users'
    users[userId] = {
        socket: socket,
        // Puedes agregar más información sobre el usuario aquí
    };

    // Envía un mensaje al cliente recién conectado
    socket.emit('message', 'Welcome to the chat!');

    // Maneja eventos adicionales, por ejemplo, 'disconnect'
    socket.on('disconnect', () => {
        console.log('User disconnected');

        // Elimina al usuario del objeto 'users' al desconectarse
        delete users[userId];
    });
});

// Cambia el puerto en el que escucha el servidor
// Debido a que ngrok usa links de manera temporal, estos datos
// Se deben de cambiar

//Hay que tener el servidor backend en ejecución 
//antes de iniciar Ngrok para que pueda redirigir correctamente las solicitudes.
const PORT = process.env.PORT || 3000;
const NGROK_URL = 'https://a36d-152-231-128-130.ngrok-free.app'; // Reemplaza con la URL de Ngrok

server.listen(PORT, () => {
    console.log(`Server is running on ${NGROK_URL}`);
});
