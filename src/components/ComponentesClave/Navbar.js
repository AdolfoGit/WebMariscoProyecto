import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; 
import logo from '../img/logo.jpg';
import { useUser } from './UserContext';

const Navbar = () => {
  const { user, loginUser, logoutUser } = useUser();

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} />
        <span>Casa del Marisco</span>
      </div>
      <ul className="nav-links">
        <li><Link to="#" className='link'>Inicio</Link></li>
        <li><Link to="/politicas"  className='link'>Politicas de Privacidad</Link></li>
        <li><Link to="/cookies"  className='link'>Politicas de Cookies</Link></li>
        <li><Link to="#"  className='link'>Acerca de</Link></li>
        <li><Link to="#"  className='link'>Pedidos</Link></li>
        <li><Link to="#" className='login-button'>Login</Link></li>
        <div>
      {user ? (
        <p>Bienvenido, {user.nombre}!</p>
      ) : (
        <p>Inicia sesión para acceder a más funcionalidades.</p>
      )}
      {/* Otro contenido del componente */}
    </div>
    
    
      </ul>

    </nav>
  );
};

export default Navbar;
