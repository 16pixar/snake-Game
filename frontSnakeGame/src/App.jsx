import './App.css'

import { Routes, Route } from 'react-router-dom'; // Rutas de la app
import Layout from './components/Layout';
import CrearSala from './pages/createRoom/crearSala';
import UnirseSala from './pages/joinRoom/unirseSala';
import CrearPersonaje from './pages/createPlayer/CrearPersonaje';
import TraditionalGame from './pages/Tradidional/traditionalGame';
import Estadisticas from './pages/estadisticas/estadisticas';
import PreLoad from './pages/preLoad/preLoad';
import TraditionalGameLen from './pages/Tradidional/traditionalGameLen';

function App() {
  return (
    <div >

      <Routes>
        <Route path="/" element={<><Layout /></>}/>
        <Route path="/preLoad" element={<PreLoad />} />
        <Route path="/crearSala" element={<CrearSala />} />
        <Route path="/unirseSala" element={<UnirseSala />} />
        <Route path='/CrearPersonaje' element={<CrearPersonaje />} />
        <Route path='/TraditionalGame' element={<TraditionalGame />} />
        <Route path='/Estadisticas' element={<Estadisticas />} />
        <Route path='/TraditionalGameLen' element={<TraditionalGameLen />} />
       
      </Routes> 

    </div>
  );
}

export default App
