import { mod } from "./utils.js";
let moving = false;

export default function createGame() {
	const state = {
		players: {},
		fruits: {},
		maxFruits: 1,
		maximumNumberOfWinners: 3,
		screen: {
			width: 25,
			height: 25,
		},
	};

	const observers = [];

	function start() {
		const frequency = 500;

		setInterval(addFruit, frequency);
	}

	function subscribe(observerFunction) {
		observers.push(observerFunction);
	}

	function notifyAll(command) {
		for (const observerFunction of observers) {
			observerFunction(command);
		}
	}

	function setState(newState) {
		Object.assign(state, newState);
	}

	function addPlayer(command) {
		const playerId = command.playerId;
		const playerName = command.playerName;

		const playerX = "playerX" in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
		const playerY = "playerY" in command ? command.playerY : Math.floor(Math.random() * state.screen.height);
		const score = 0;

		state.players[playerId] = {
			x: playerX,
			y: playerY,
			playerName,
			score,
		};

		notifyAll({
			type: "add-player",
			playerId: playerId,
			playerX: playerX,
			playerY: playerY,
			score,
			playerName,
		});
	}

	function removePlayer(command) {
		const playerId = command.playerId;

		delete state.players[playerId];

		notifyAll({
			type: "remove-player",
			playerId: playerId,
		});
	}

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

	function removeFruit(command) {
		const fruitId = command.fruitId;

		delete state.fruits[fruitId];

		notifyAll({
			type: "remove-fruit",
			fruitId: fruitId,
		});
	}

	function movePlayer(command) {

		notifyAll(command);

		const acceptedMoves = {
			ArrowUp(player) {
				player.y = mod(state.screen.height, player.y - 1);
				console.log(player.y);
			},
			ArrowRight(player) {
				player.x = mod(state.screen.width, player.x + 1);
				console.log(player.x);
			},
			ArrowDown(player) {
				player.y = mod(state.screen.height, player.y + 1);
				console.log(player.y);
			},
			ArrowLeft(player) {
				player.x = mod(state.screen.width, player.x - 1);
				console.log(player.x);
			},
		};

		const keyPressed = command.keyPressed;
		const playerId = command.playerId;
		const player = state.players[playerId];
		const moveFunction = acceptedMoves[keyPressed];

		if (player) {

			if (moving) return;

			checkForFruitCollision(playerId);
			moveFunction(player);

			moving = true;

			setTimeout(() => {
				moving = false;
			}, 2);
		}
	}

	function checkForFruitCollision(playerId) {
		const player = state.players[playerId];

		for (const fruitId in state.fruits) {
			const fruit = state.fruits[fruitId];
			// console.log(`Checking ${playerId} score ${player.score} and ${fruitId}`)

			if (player.x === fruit.x && player.y === fruit.y) {
				// console.log(`COLLISION between ${playerId} and ${fruitId}`)
				removeFruit({ fruitId: fruitId });
				player.score += 1;
			}
		}
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
		start,
	};
}
