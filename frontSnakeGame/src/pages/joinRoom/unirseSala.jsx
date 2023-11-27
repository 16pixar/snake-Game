// src/components/UnirseSala.js
import React, { useState } from 'react';
import "./join.css";
const UnirseSala = () => {
  // Estados para almacenar el ID de la sala y el color de la serpiente
  const [salaId, setSalaId] = useState('');
  const [colorSerpiente, setColorSerpiente] = useState('');

  // Manejadores de cambio para actualizar los estados cuando el usuario ingresa datos
  const handleSalaIdChange = (e) => {
    setSalaId(e.target.value);
  };

  const handleColorSerpienteChange = (e) => {
    setColorSerpiente(e.target.value);
  };

  // Manejador para procesar la acción cuando el usuario hace clic en "Unirse a la Sala"
  const unirseASala = () => {
    // Aquí puedes implementar la lógica para unirse a la sala con la salaId y el colorSerpiente
    // por ejemplo, puedes enviar esta información al servidor.
    console.log('Unirse a la sala con ID:', salaId, 'y color de serpiente:', colorSerpiente);
  };

  return (
    <div className='conatiner'>
      <h2>Unirse Sala</h2>
      <div className='s'>
        <label htmlFor="salaId">ID de Sala:</label>
        <input
          type="text"
          id="salaId"
          value={salaId}
          onChange={handleSalaIdChange}
        />
      </div>
      <div>
        <label htmlFor="colorSerpiente">Color de Serpiente:</label>
        <input
          type="text"
          id="colorSerpiente"
          value={colorSerpiente}
          onChange={handleColorSerpienteChange}
        />
      </div>
      <button onClick={unirseASala}>Unirse a la Sala</button>
    </div>
  );
};

export default UnirseSala;
