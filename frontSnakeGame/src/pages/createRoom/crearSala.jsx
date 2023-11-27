import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import "./room.css";
//Back 
import createGame from "../../../../server/public/game.js";
import renderScreen, { setupScreen } from "../../../../server/public/render-screen.js";
import createKeyboardListener from "../../../../server/public/keyboard-listener.js";
//server
const serverNode = 'https://73ff-186-159-181-247.ngrok-free.app'

const playerName = getNickName();
// se declara el socket con el nombre del jugador y el  puerto del servidor
const socket = io('http://localhost:3000',{
    query: {
      userName: playerName,
    },
  });


function App() {
  //verifica el estado del socket desde el servidor para mostrarlo en el front 
  const [isConnected, setIsConnected] = useState(false)
  const game = createGame();
  const keyboardListener = createKeyboardListener(document);

  
  //estados en uso se toma en cuenta el estado del socket para mostrarlo en el front
  useEffect(() => {
    // mopdulos en base a la conexion del socket con el servidor 
    socket.on('connect', () => {
      const playerId = socket.id;

			const screen = document.getElementById("screen");
			const scoreTable = document.getElementById("score-table");

			setupScreen(screen, game);
			renderScreen(screen, scoreTable, game, requestAnimationFrame, playerId);
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      console.log("Unsubscribing All");
				keyboardListener.unsubscribeAll();
				location.reload();
				
      setIsConnected(false)
    })

    socket.on("setup", (state) => {
      const playerId = socket.id;
      game.setState(state);

      keyboardListener.registerPlayerId(playerId);

      console.log("Subscribing to KeyboardListener");

      keyboardListener.subscribe(game.movePlayer);
      keyboardListener.subscribe((command) => {
        socket.emit("move-player", command);
      });
    });

    
    socket.on("play", (command) => {
      const playerId = socket.id;

      if (playerId !== command.playerId) {
        game.play(command);
      }
    });

    socket.on("add-player", (command) => {
      game.addPlayer(command);
    });

    socket.on("remove-player", (command) => {
      game.removePlayer(command);
    });

    socket.on("move-player", (command) => {
      const playerId = socket.id;

      if (playerId !== command.playerId) {
        game.movePlayer(command);
      }
    });

    socket.on("add-fruit", (command) => {
      game.addFruit(command);
    });

    socket.on("remove-fruit", (command) => {
      game.removeFruit(command);
    });

  },[])

  
  
  return (
    
    <>
      
      <div className="score-container">
        <table id="score-table"></table>
      </div>
      <div className="game-container">
        <canvas id="screen" width="10" height="10"></canvas>
      </div>

      <div className='estado'>{isConnected?`Conectado: ${playerName}`:"No conectado:Recargue Pagína"}</div>

    </>
  );
}
//funcion para obtener el nombre del jugador
//E: no recibe nada
//S: retorna el nombre del jugador
//R: no recibe parametros
function getNickName() {
  const readNickName = sessionStorage.getItem("NickName") || prompt("Enter your nickname:");

  if (!readNickName) return getNickName();

  sessionStorage.setItem("NickName", readNickName || defaultValue);
  return sessionStorage.getItem("NickName");
}


export default App
