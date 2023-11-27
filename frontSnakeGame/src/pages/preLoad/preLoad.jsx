// src/components/CrearPersonaje.js
import './preLoad.css';

//enrutamiento 
import { useNavigate } from 'react-router-dom';

import React from 'react';
import TextField from '@mui/material/TextField';
//Sockets

import {useState, useEffect} from 'react'; // Permite usar estados y efectos
//Color Picker 
import { ChromePicker } from 'react-color'; // Importa el componente ChromePicker de react-color
// drop down
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
//Notificaciones
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Servidor 

const preLoad = () => {
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState('#000000'); // Estado para almacenar el color seleccionado
  
  const [showGif, setShowGif] = useState(false); // Nuevo estado para controlar la visibilidad del gif
  const [idSala, setIdSala] = useState(''); // Nuevo estado para controlar la visibilidad del gif
  const [tiempo, setTiempo] = useState(''); 
  const [largo, setLargo] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedValue2, setSelectedValue2] = useState('');
  //Color Picker 
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };
  //drop down
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleTipoChange = (event) => {
    setSelectedValue2(event.target.value);
  }
  //Accion del boton 
  const handleListoClick = () => {
    if ( selectedColor === '#ffffff' || !idSala || !selectedValue || !selectedValue2) {
      if (selectedColor=== '#ffffff') {
        toast.error('Por favor, seleccione un color diferente al blanco');
      }
      // Muestra un mensaje emergente si el nombre o el color están vacíos
      toast.error('Por favor, complete todos los campos');
    } else {

      console.log('Color seleccionado:', selectedColor);
      console.log('Id de la sala:', idSala);
      console.log('Tematica de juego:', selectedValue);
      console.log('Tipo de juego:', selectedValue2);
      console.log('Tiempo:', tiempo);
      console.log('Largo:', largo);
      
      setShowGif(true); // Muestra el gif
      
      setTimeout(() => {
        if (selectedValue === 'multiplayer') {
          navigate('/crearSala'); // Replace '/otra-pagina' with your desired route
        }
        if (selectedValue === 'tradicional' && selectedValue2 === 'tradicional') {
          navigate('/TraditionalGame', {
            state: {
              selectedColor,
              idSala, 
              selectedValue,
              selectedValue2,
              tiempo
       
            }
          });
        }
        if (selectedValue === 'tradicional' && selectedValue2 === 'multiplayer') {
          navigate('/TraditionalGameLen', {
            state: {
              selectedColor,
              idSala, 
              selectedValue,
              selectedValue2,
              largo
            }
          }); // Replace '/otra-pagina' with your desired route
        }
      }, 2000);
      
    }
  };
  return (
    
    <div className="crear-personaje-container">
 
      <div className="crear-personaje-box">
        <h2 className='tit'>Crear Sala</h2>
        <TextField label="Id de la sala" variant="outlined" value={idSala} onChange={(e) => setIdSala(e.target.value)}/>

        <div className='dropBox'>
          <Select
            value={selectedValue2}
            onChange={handleTipoChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Seleccione' }}>

            <MenuItem value="" disabled>
              Seleccione tipo de Juego
            </MenuItem>
            <MenuItem value="tradicional">Tiempo</MenuItem>
            <MenuItem value="multiplayer">Largo</MenuItem>
  
          </Select>
        </div>

        {selectedValue2 === 'multiplayer' && (
          <div className='apear'>
            <TextField label="Largo de serpiente" variant="outlined" value={largo} onChange={(e) => setLargo(e.target.value)} />
          </div>
        )}

        {selectedValue2 === 'tradicional' && (
          <div className='apear'>
            <TextField label="Tiempo del juego" variant="outlined" value={tiempo} onChange={(e) => setTiempo(e.target.value)}/>
          </div>
        )}
     
        <div className='dropBox'>
          <Select
            value={selectedValue}
            onChange={handleChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Seleccione' }}>

            <MenuItem value="" disabled>
              Seleccione tematica del Juego
            </MenuItem>
            <MenuItem value="tradicional">Tradicional</MenuItem>
            <MenuItem value="multiplayer">Multijugador</MenuItem>
  
          </Select>
        </div>

        


        <h2 >Seleccionar Color</h2> {/* Agregado */}
        <div className='selecColor' style={{ marginTop: '5px' }}>
          <ChromePicker color={selectedColor} onChange={handleColorChange} />
        </div>

        
        
        {/* Renderiza el gif solo cuando showGif es true */}
        {showGif && (
          <div className='desingConfirm'>
            <img src="camaraPen.gif" alt="GIF" />
            <button className='bt' onClick={handleListoClick}>Listo</button>
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

export default preLoad;

