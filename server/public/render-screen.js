// Aqui van las funciones encargadas de mostrar el juego en el navegador con respecto a los sockets


//
export function setupScreen(canvas, game) {
	const {
		screen: { width, height },
	} = game.state;
	canvas.width = width;
	canvas.height = height;
}
//
export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
	const context = screen.getContext("2d");
	context.fillStyle = "white";
	const {
		screen: { width, height },
	} = game.state;
	context.clearRect(0, 0, width, height);

	// Reset the all the board as color white
	for (let x = 0; x < width; x++) {
		for (let y = 0; y < height; y++) {
			context.fillStyle = "white";
			context.fillRect(x, y, 1, 1);
		}
	}

	for (const playerId in game.state.players) {
		const player = game.state.players[playerId];
		context.fillStyle = "#837599";
		context.fillRect(player.x, player.y, 1, 1);
	}

	for (const fruitId in game.state.fruits) {
		const fruit = game.state.fruits[fruitId];
		context.fillStyle = "green";
		context.fillRect(fruit.x, fruit.y, 1, 1);
	}

	const currentPlayer = game.state.players[currentPlayerId];
	if (currentPlayer) {
		context.fillStyle = "red";
		context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);

		//console.log("Tamaño de pq prevMoves: " + currentPlayer.prevMoves.length);

		const prevMovesReversed = currentPlayer.prevMoves.slice().reverse();

		//console.log("-------------------");
		//console.log(" >> Actual position: " + currentPlayer.x + " " + currentPlayer.y);

		let originalX = currentPlayer.x;
		let originalY = currentPlayer.y;

		// Print all the tail
		for (let i = 0; i < prevMovesReversed.length; i++) {
			//console.log(prevMovesReversed[i]);

			if (prevMovesReversed[i] === "down") {
				context.fillStyle = "red";
				context.fillRect(originalX, originalY + 1, 1, 1);
				originalY++;
			}
			if (prevMovesReversed[i] === "left") {
				context.fillStyle = "red";
				context.fillRect(originalX - 1, originalY, 1, 1);
				originalX--;
			}
			if (prevMovesReversed[i] === "up") {
				context.fillStyle = "red";
				context.fillRect(originalX, originalY - 1, 1, 1);
				originalY--;
			}
			if (prevMovesReversed[i] === "right") {
				context.fillStyle = "red";
				context.fillRect(originalX + 1, originalY, 1, 1);
				originalX++;
			}
		}
	}

	updateScoreTable(scoreTable, game, currentPlayerId);

	requestAnimationFrame(() => {
		renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId);
	});
}

function updateScoreTable(scoreTable, game, currentPlayerId) {
	let scoreTableInnerHTML = `
        <tr class="scoretable">
            <td id="scoretableTitle">Top Players</td>
            <td id="scoretablePoints">Points</td>
        </tr>
    `;

	const playersArray = [];

	for (let socketId in game.state.players) {
		const player = game.state.players[socketId];
		playersArray.push({
			playerId: socketId,
			playerName: player.playerName,
			x: player.x,
			y: player.y,
			score: player.score,
		});
	}

	const playersSortedByScore = playersArray.sort((first, second) => {
		if (first.score < second.score) {
			return 1;
		}

		if (first.score > second.score) {
			return -1;
		}

		return 0;
	});

	const topScorePlayers = playersSortedByScore.slice(0, game.state.maximumNumberOfWinners);

	scoreTableInnerHTML = topScorePlayers.reduce((stringFormed, player) => {
		return (
			stringFormed +
			`
            <tr class="${player.playerId === currentPlayerId ? "current-player" : ""}">
                <td>${player.playerName}</td>
                <td>${player.score}</td>
            </tr>
        `
		);
	}, scoreTableInnerHTML);

	const currentPlayerFromTopScore = topScorePlayers[currentPlayerId];

	if (currentPlayerFromTopScore) {
		scoreTableInnerHTML += `
    <tr class="current-player">
      <td>${
				currentPlayerFromTopScore.playerName === undefined ? currentPlayerId : currentPlayerFromTopScore.playerName
			}</td>
      <td>${currentPlayerFromTopScore.score}</td>
    </tr>
    `;
	}

	scoreTable.innerHTML = scoreTableInnerHTML;
}
