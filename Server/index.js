import express from 'express';
import http from 'http';
import * as socketio from 'socket.io';
import cors from 'cors';
import createGame from './public/game.js';
import fs from 'fs/promises';
const app = express();
const server = http.createServer(app);
const io = new socketio.Server(server, {
    cors: {
        origin: '*',
		methods: ["GET", "POST"],		
    }   
});

app.use(express.static("public"));
app.use(cors());

// inicia el juego 
const game = createGame();
game.start();

game.subscribe((command) => {
	io.emit(command.type, command);
});


io.on("connection", (socket) => {
	const playerId = socket.id;
	const playerName = socket.handshake.query.userName;
	console.log(`> Player connected: ${playerName}`);

	game.addPlayer({ playerId: playerId, playerName: playerName });

	socket.emit("setup", game.state);
	
	socket.on("disconnect", () => {
		game.removePlayer({ playerId: playerId });
		console.log(`> Player disconnected: ${playerName}`);
	});

	socket.on("move-player", (command) => {
		command.playerId = playerId;
		command.type = "move-player";

		game.movePlayer(command);
	});
});


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


/// fuera del juego 

app.get('/', (req, res) => {
    res.send('¡Bienvenido al servidor con Socket.IO y Express!');
});
/*
io.on('connection', (socket) => {
    console.log('Usuario conectado');
    // Aquí puedes agregar lógica para manejar eventos de socket
});*/

//json 
// En el servidor
app.post('/Estadisticas', (req, res) => {
	const lista = req.body.lista; // Suponiendo que la lista viene en el cuerpo de la solicitud
	console.log('Guardando lista:', lista);
  
	// Lógica para guardar la lista en un archivo, similar a tu código actual
	// ...
  
	res.send('Lista guardada con éxito');
  });
  