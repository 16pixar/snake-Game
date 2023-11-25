import './App.css'

import { Routes, Route } from 'react-router-dom'; // Rutas de la app
import Layout from './components/Layout';
import CrearSala from './pages/createRoom/crearSala';
import UnirseSala from './pages/joinRoom/unirseSala';
import CrearPersonaje from './pages/createPlayer/CrearPersonaje';
import TraditionalGame from './pages/Tradidional/traditionalGame';
import Estadisticas from './pages/estadisticas/estadisticas';
function App() {
  return (
    <div >

      <Routes>
        <Route path="/" element={<><Layout /></>}/>
        <Route path="/crearSala" element={<CrearSala />} />
        <Route path="/unirseSala" element={<UnirseSala />} />
        <Route path='/CrearPersonaje' element={<CrearPersonaje />} />
        <Route path='/TraditionalGame' element={<TraditionalGame />} />
        <Route path='/Estadisticas' element={<Estadisticas />} />
        <Route path="*" element={<h1>Error 404: Not Found</h1>} />  
      </Routes> 

    </div>
  );
}

export default App
