export function setupScreen(canvas, game) {
	const {
		screen: { width, height },
	} = game.state;
	canvas.width = width;
	canvas.height = height;
}

export default function renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId) {
	const context = screen.getContext("2d");
	context.fillStyle = "white";
	const {
		screen: { width, height },
	} = game.state;
	context.clearRect(0, 0, width, height);

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
	}

	updateScoreTable(scoreTable, game, currentPlayerId);

	requestAnimationFrame(() => {
		renderScreen(screen, scoreTable, game, requestAnimationFrame, currentPlayerId);
	});
}

function updateScoreTable(scoreTable, game, currentPlayerId) {
	let scoreTableInnerHTML = `
        <tr class="scoretable">
            <td id="scoretableTitle">Top ${game.state.maximumNumberOfWinners} Players</td>
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