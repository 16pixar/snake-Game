import { Link, Outlet } from "react-router-dom";
//import './Layout.css';
const Layout = () => {
  
  return (
    <div className="App"> 
      <h1>Snake Game<hr /></h1>
      <nav>
        <ul className="custom-list">
          <li>
            <Link to="/preLoad">Crear Sala</Link>
          </li>
          <li>
            <Link to="/unirseSala">Unirse Sala</Link>
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
