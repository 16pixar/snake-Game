import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client'
//Back 
import createGame from "../../server/public/game.js";
import renderScreen, { setupScreen } from "../../server/public/render-screen.js";
import createKeyboardListener from "../../server/public/keyboard-listener.js";


function App() {
  const [isConnected, setIsConnected] = useState(false)
  const playerName = getNickName();
  const game = createGame();
  const keyboardListener = createKeyboardListener(document);
  const socket = io('http://localhost:3000',{
    query: {
      userName: playerName,
    },
  });

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })
    socket.on('disconnect', () => {
      setIsConnected(false)
    })
  },[])


  
  
  return (
    
    <>
     
      <h1>Vite + React</h1>
      <h2>{isConnected?` ${playerName} Conectado`:"No conectado"}</h2>
      
    </>
  );
}

function getNickName() {
  const readNickName = sessionStorage.getItem("NickName") || prompt("Enter your nickname:");

  if (!readNickName) return getNickName();

  sessionStorage.setItem("NickName", readNickName || defaultValue);
  return sessionStorage.getItem("NickName");
}

export default App
