// src/components/CrearPersonaje.js
import React from 'react';

import {io} from 'socket.io-client'; // Permite la comunicación entre el cliente y el servidor
import {useState, useEffect} from 'react'; // Permite usar estados y efectos

const socket = io('http://localhost:3000');

const CrearPersonaje = () => {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));

  }, []);

  return (
    <div>
      <h2>{isConnected ? 'Conectado' : 'No conectado'}</h2>
      <h2>Crear Personaje<del> Exito</del></h2>
    </div>
  );
};

export default CrearPersonaje;
