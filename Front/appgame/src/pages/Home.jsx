// src/components/CrearSala.js
import React from 'react';
import './Home.css'; 
import { Routes, Route } from 'react-router-dom'; // Rutas de la app
import Layout from './components/Layout';
import CrearSala from './components/createRoom/CrearSala';
import UnirseSala from './components/joinRoom/UnirseSala';
import ComoJugar from './components/help/ComoJugar';

const Home = () => {
  return (
    
    <div className="App">
      <div className="RoutesContainer">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/crearSala" element={<CrearSala />} />
          <Route path="/unirseSala" element={<UnirseSala />} />
          <Route path="/Como jugar" element={<ComoJugar />} />
    
          <Route path="*" element={<h1>Error 404: Not Found</h1>} />  
        </Routes>
      </div>

    </div>
  );
};

export default Home;
