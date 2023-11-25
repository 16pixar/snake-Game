import { Link, Outlet } from "react-router-dom";
//import './Layout.css';
const Layout = () => {
  return (
    <div className="App"> 
      <h1>Snake Game<hr /></h1>
      <nav>
        <ul className="custom-list">
          <li>
            <Link to="/crearSala">Crear Sala</Link>
          </li>
          <li>
            <Link to="/unirseSala">Unirse Sala</Link>
          </li>
          <li>
            <Link to="/crearPersonaje">Crear Personaje</Link>
          </li>
          <li>
            <Link to="/TraditionalGame">Juego Tradicional</Link>
          </li>
          <li>
            <Link to="/estadisticas">Estadisticas</Link>
          </li>
         
        </ul>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Layout;
