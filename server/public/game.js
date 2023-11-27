import { mod } from "./utils.js";
let moving = false;

// Funcion para inicializar el juego
export default function createGame() {
	const state = {
		players: {},
		fruits: {},
		maxFruits: 8,
		maximumNumberOfWinners: 6,
		screen: {
			width: 25,
			height: 25,
		},
		move: "right"
	};

	const observers = [];

	function start() {
		const frequency = 2;
		setInterval(addFruit, frequency);
	}
	// Funcion para suscribir a los observadores
	// E: funcion a suscribir
	// S: suscribe a los observadores
	function subscribe(observerFunction) {
		observers.push(observerFunction);
	}
	// Funcion para notificar a los observadores
	// E: comaando a notificar
	// S: notifica a los observadores
	function notifyAll(command) {
		for (const observerFunction of observers) {
			observerFunction(command);
		}
	}

	function setState(newState) {
		Object.assign(state, newState);
	}
	// Funcion para agregar un jugador
	// E: comando con el id del jugador y el nombre
	// S: agrega un jugador al estado
	// R: el id del jugador debe ser unico
	function addPlayer(command) {
		const playerId = command.playerId;
		const playerName = command.playerName;

		const playerX = "playerX" in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
		const playerY = "playerY" in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
		const score = 0;
		const prevMoves = [];
		const queueTail = [];

		state.players[playerId] = {
			x: playerX,
			y: playerY,
			playerName,
			score,
			prevMoves: [],
			queueTail: []
		};

		notifyAll({
			type: "add-player",
			playerId: playerId,
			playerX: playerX,
			playerY: playerY,
			score,
			playerName,
			prevMoves,
			queueTail
		});
	}
	// Funcion para remover un jugador
	// E: comando con el id del jugador
	// S: remueve un jugador del estado
	function removePlayer(command) {
		const playerId = command.playerId;

		delete state.players[playerId];

		notifyAll({
			type: "remove-player",
			playerId: playerId,
		});
	}
	// Funcion para agregar una fruta
	// E: comando con el id de la fruta, la posicion x y la posicion y
	// S: agrega una fruta al estado
	// R: el id de la fruta debe ser unico
	function addFruit(command) {
		if (Object.keys(state.fruits).length >= state.maxFruits) return;

		const fruitId = command ? command.fruitId : Math.floor(Math.random() * 10000000);
		const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
		const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

		state.fruits[fruitId] = {
			x: fruitX,
			y: fruitY,
		};

		notifyAll({
			type: "add-fruit",
			fruitId: fruitId,
			fruitX: fruitX,
			fruitY: fruitY,
		});
	}
	// Funcion para remover una fruta
	// E: comando con el id de la fruta
	// S: remueve una fruta del estado
	function removeFruit(command) {
		const fruitId = command.fruitId;

		delete state.fruits[fruitId];

		notifyAll({
			type: "remove-fruit",
			fruitId: fruitId,
		});
	}
	// Funcion para mover un jugador
	// E: comando con el id del jugador y la tecla presionada
	// S: mueve un jugador en el estado
	function movePlayer(command) {
		
		notifyAll(command);

		let prevMove = ''
		// Se valida coliision con paredes y se mueve el jugador
		const acceptedMoves = {
			ArrowUp(player) {
				state.move = "up";
				checkWallCollision(player, "arriba");
				player.y = mod(state.screen.height, player.y - 1);
				prevMove = 'up'
				checkForFruitCollision(playerId, prevMove);

				if (player.prevMoves.length > player.score) {
					// Delete the last move
					player.prevMoves.shift();
				}
				player.prevMoves.push("down");

				printTail(player);
			},
			ArrowRight(player) {
				state.move = "right";
				checkWallCollision(player, "derecha"); // primer
				player.x = mod(state.screen.width, player.x + 1);
				prevMove = 'right'
				checkForFruitCollision(playerId, prevMove);

				if (player.prevMoves.length > player.score) {
					player.prevMoves.shift();
				}
				player.prevMoves.push("left");

				printTail(player);
			},
			ArrowDown(player) {
				state.move = "down";
				checkWallCollision(player, "abajo");
				player.y = mod(state.screen.height, player.y + 1);
				prevMove = 'down'
				checkForFruitCollision(playerId, prevMove);

				if (player.prevMoves.length > player.score) {
					player.prevMoves.shift();
				}
				player.prevMoves.push("up");

				printTail(player);
			},
			ArrowLeft(player) {
				state.move = "left";
				checkWallCollision(player, "izquierda");
				player.x = mod(state.screen.width, player.x - 1);
				prevMove = 'left'
				checkForFruitCollision(playerId, prevMove);

				if (player.prevMoves.length > player.score) {
					player.prevMoves.shift();
				}
				player.prevMoves.push("right");

				printTail(player);
			},
		};
		
		
		const keyPressed = command.keyPressed;
		const playerId = command.playerId;
		const player = state.players[playerId];
		const moveFunction = acceptedMoves[keyPressed];

		if (player) {

			if (moving) return;

			checkForFruitCollision(playerId, prevMove);
			moveFunction(player);

			moving = true;

			setTimeout(() => {
				moving = false;
			}, 2);
		}
		
	}

	function printTail(player) {
		//console.log("Tamaño de prevMoves: " + player.prevMoves.length);
	}
	// Funcion para validar colision con paredes
	// E: jugador y direccion
	// S: valida colision con paredes
	// R: el jugador debe estar en el estado
	function checkWallCollision(player, direccion) {
		//console.log(player.x, player.y,"x y",state.screen.width);
		if (player.x === 24 && direccion === "derecha") {
			console.log("game over");
			alert("game over, los datos se van a guardar. de aceptar para volver a jugar");
			window.location.reload();
		}
		if (player.y === 0 && direccion === "arriba") {
			console.log("game over");
			alert("game over, los datos se van a guardar. de aceptar para volver a jugar");
			window.location.reload();
		}
		if (player.y === 24 && direccion === "abajo") {
			console.log("game over ");
			alert("game over, los datos se van a guardar. de aceptar para volver a jugar");
			window.location.reload();
		}
		if (player.x === 0 && direccion === "izquierda") {
			console.log("game over");
			alert("game over, los datos se van a guardar. de aceptar para volver a jugar");
			window.location.reload();
		}
		
	}
	// Funcion para validar colision con frutas
	// E: jugador y direccion
	// S: valida colision con frutas
	// R: el jugador debe estar en el estado
	function checkForFruitCollision(playerId, direccion) {
		const player = state.players[playerId];

		for (const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId];
			// console.log(`Checking ${playerId} score ${player.score} and ${fruitId}`)

			if (player.x === fruit.x && player.y === fruit.y) {

				if (direccion === "up") {
					console.log("Comio arriba, total: " + player.prevMoves.length);
					//player.prevMoves.push("up");
				}
				if (direccion === "right") {
					//player.prevMoves.push("right");
				}
				if (direccion === "down") {
					//player.prevMoves.push("down");
				}
				if (direccion === "left") {
					//player.prevMoves.push("left");
				}

				// console.log(`COLLISION between ${playerId} and ${fruitId}`)
				removeFruit({ fruitId: fruitId });
				player.score += 1;
			}
		}
	}

	function imprimir() {
		//console.log("Hola mundo")
	}

	return {
		addPlayer,
		removePlayer,
		movePlayer,
		addFruit,
		removeFruit,
		state,
		setState,
		subscribe,
		start
	};
}
