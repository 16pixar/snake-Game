import { Link, Outlet } from "react-router-dom";
import './Layout.css';
const Layout = () => {
  return (
    <div> 
      <nav>
        <ul className="custom-list">
          <li>
            <Link to="/crearSala">Crear Sala</Link>
          </li>
          <li>
            <Link to="/unirseSala">Unirse Sala</Link>
          </li>
          <li>
            <Link to="/Como jugar">Como jugar</Link>
          </li>
          <li>
            <Link to="/crearPersonaje">Crear Personaje</Link>
          </li>
        </ul>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Layout;
