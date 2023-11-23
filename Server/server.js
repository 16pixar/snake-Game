const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: '*' },
});

const users = {}; // declaración de la variable


const usedUsernames = new Set();



// random
function generateRandomUsername() {
    const adjectives = ['Happy', 'Funny', 'Silly', 'Clever', 'Brave'];
    const nouns = ['Bear', 'Fox', 'Cat', 'Dog', 'Rabbit'];
    let username;

    do {
        const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const noun = nouns[Math.floor(Math.random() * nouns.length)];
        username = `${adjective}${noun}`;
    } while (usedUsernames.has(username));

    usedUsernames.add(username);
    return username;
}




// Manejo del evento GET para la ruta '/'
app.get('/', (req, res) => {
    res.send('Hola usuario!!!!\nBienvenido al sitio del juego snake!!!!\nEste proyecto sigue en desarrollo, por favor sea paciente!!!!');
});


io.on('connection', (socket) => {
    console.log('A user connected');

    // Manejo de errores
    socket.on('error', (err) => {
        console.error('Socket error:', err);
    });

    // Obtener la IP del usuario desde el socket
    const userIp = socket.handshake.address;

    // Generar un nombre de usuario aleatorio
    const username = generateRandomUsername();

    // Registrar al usuario
    users[userIp] = {
        username: username,
        requestId: Math.floor(Math.random() * 1000),
    };

    // Mostrar mensaje de bienvenida en la consola
    console.log(`Bienvenido ${username} con IP ${userIp} y solicitud ID ${users[userIp].requestId}`);

    // Envía un mensaje al cliente recién conectado
    socket.emit('message', 'Welcome to the chat!');

    // Maneja eventos adicionales, por ejemplo, 'disconnect'
    socket.on('disconnect', () => {
        console.log('User disconnected');

        // Elimina al usuario del objeto 'users' al desconectarse
        delete users[userIp];
    });

    // Agrega un mensaje de registro específico de Socket.IO
    console.log('Socket.IO is ready!');

});

// Cambia el puerto en el que escucha el servidor
// Debido a que ngrok usa links de manera temporal, estos datos
// Se deben de cambiar

//Hay que tener el servidor backend en ejecución 
//antes de iniciar Ngrok para que pueda redirigir correctamente las solicitudes.
const PORT = process.env.PORT || 3000;
const NGROK_URL = 'https://f226-152-231-128-130.ngrok-free.app/'; // Reemplaza con la URL de Ngrok

server.listen(PORT, () => {
    console.log(`Server is running on ${NGROK_URL}`);
});
