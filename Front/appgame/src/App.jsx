
import './App.css'

import { Routes, Route } from 'react-router-dom'; // Rutas de la app
import Layout from './components/Layout';
import CrearSala from './pages/createRoom/CrearSala';
import UnirseSala from './pages/joinRoom/UnirseSala';
import ComoJugar from './pages/help/ComoJugar';
import CrearPersonaje from './pages/createPlayer/CrearPersonaje';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<><h1>Snake Game<hr /></h1><Layout /></>}/>
        <Route path="/crearPersonaje" element={<CrearPersonaje />} />
        <Route path="/crearSala" element={<CrearSala />} />
        <Route path="/unirseSala" element={<UnirseSala />} />
        <Route path="/Como jugar" element={<ComoJugar/>} />
    
        <Route path="*" element={<h1>Error 404: Not Found</h1>} />  
      </Routes> 

    </div>
  );
}

export default App
