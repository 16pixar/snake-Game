// src/components/CrearPersonaje.js
import './CrearPersonaje.css';

import React from 'react';
import TextField from '@mui/material/TextField';
//Sockets
import {io} from 'socket.io-client'; // Permite la comunicación entre el cliente y el servidor
import {useState, useEffect} from 'react'; // Permite usar estados y efectos
//Color Picker 
import { ChromePicker } from 'react-color'; // Importa el componente ChromePicker de react-color
//Notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Servidor 
const socket = io('http://localhost:3000');
 

const CrearPersonaje = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000'); // Estado para almacenar el color seleccionado
  const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre ingresado
  const [showGif, setShowGif] = useState(false); // Nuevo estado para controlar la visibilidad del gif

  useEffect(() => {
    socket.on('connect', () => setIsConnected(true));
    }, []);
  
  //Color Picker 
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };
  //Accion del boton 
  const handleListoClick = () => {
    if (!nombre || !selectedColor) {
      // Muestra un mensaje emergente si el nombre o el color están vacíos
      toast.error('Por favor, complete todos los campos');
    } else {
      console.log('Nombre:', nombre);
      console.log('Color seleccionado:', selectedColor);
      setShowGif(true); // Muestra el gif
    }
  };
  return (
    
    <div className="crear-personaje-container">
      <h2>{isConnected ? 'Conectado' : 'No conectado'}</h2>
      <div className="crear-personaje-box">
        <h2 className='tit'>Crear Personaje</h2>
        <TextField label="Nombre" variant="outlined" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        <h2 >Seleccionar Color</h2> {/* Agregado */}
        <div className='selecColor' style={{ marginTop: '5px' }}>
          <ChromePicker color={selectedColor} onChange={handleColorChange} />
        </div>

        
        
        {/* Renderiza el gif solo cuando showGif es true */}
        {showGif && (
          <div className='desingConfirm'>
            <img src="camaraPen.gif" alt="GIF" />
            <button onClick={handleListoClick}>Listo</button>
          </div>
        )}

        {/* Renderiza el botón solo cuando showGif es falso */}
        {!showGif && (
          <button onClick={handleListoClick}>Listo</button>
        )}
        
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar />
      
      </div>
      
    </div>
    
  );
};

export default CrearPersonaje;

