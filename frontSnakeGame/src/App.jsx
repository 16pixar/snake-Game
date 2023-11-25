import './App.css'

import { Routes, Route } from 'react-router-dom'; // Rutas de la app
import Layout from './components/Layout';
import CrearSala from './pages/createRoom/crearSala';
import UnirseSala from './pages/joinRoom/unirseSala';
function App() {
  return (
    <div >

      <Routes>
        <Route path="/" element={<><Layout /></>}/>
        <Route path="/crearSala" element={<CrearSala />} />
        <Route path="/unirseSala" element={<UnirseSala />} />
     

    
        <Route path="*" element={<h1>Error 404: Not Found</h1>} />  
      </Routes> 

    </div>
  );
}

export default App
