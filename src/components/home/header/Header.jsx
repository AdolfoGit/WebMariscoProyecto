import React, { useState } from 'react';
import logo from '../img/LogoVersion2.png';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


// Importa el hook useUser para obtener la información del usuario
import { useUser } from '../../../UserContext';

// Saber dónde estoy
import { useLocation } from 'react-router-dom';

import MenuFlotante from './MenuFlotante';

export const Header = () => {
  
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();

  // Obtén la información del usuario desde el contexto
  const { user } = useUser();

  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    header.classList.toggle('active', window.scrollY > 200);
  });


  return (
    <>
      <header className="header">
      {user && user.Rol ===2 ? (
        <>

                  <div className="nav">
                  <ul className={sidebar ? 'nav-links-sidebar' : 'nav-links'} onClick={() => setSidebar(false)}>


                  <li className='username'>{user.Nombre}</li>
                  <Link to='perfil'><AccountCircleOutlinedIcon className='HeaderIcon' /></Link>
                  </ul>
                  </div>

        </>
              ) : (
                <>
                 <div className="container flex">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="nav">
            <ul className={sidebar ? 'nav-links-sidebar' : 'nav-links'} onClick={() => setSidebar(false)}>
              <li className={location.pathname === '/' ? 'active' : ''}><Link to='/'>Inicio</Link></li>   
                   <li>
                     <MenuFlotante/>
                  </li>
                   <li className={location.pathname === '/productos' ? 'active' : ''}><Link to='/productos'>Menus</Link></li>
                   <li className={location.pathname === '/ofertas' ? 'active' : ''}><Link to='/ofertas'>Ofertas</Link></li>
                 
              {user ? (
                <>
                  <li className={location.pathname === '/pedidos' ? 'active' : ''}><Link to='/pedidos'>Pedidos</Link></li>
                  <li className={location.pathname === '/reservaciones' ? 'active' : ''}><Link to='/reservaciones'>Reservaciones</Link></li  >
                  <li className='username'>{user.Nombre}</li>
                  <li className='icon'>
                <Link to='carrito'><SearchOutlinedIcon className='HeaderIcon' /></Link>
                <Link to='/carrito'><LocalGroceryStoreOutlinedIcon className='HeaderIcon' /></Link>
                <Link to='perfil'><AccountCircleOutlinedIcon className='HeaderIcon' /></Link>
              </li>
                </>
              ) : (
                <li className={location.pathname === '/login' ? 'active' : ''}>
                  <Link to='/login'>
                    <button className='btn btn-outline-warning cd'>Login</button>
                  </Link>
                </li>
                
              )}
              
             
            </ul>
          </div>
          <button className='navbar-items-icon btn' onClick={() => setSidebar(!sidebar)}>
            {sidebar ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
                </>
                
              )}
      
      </header>
    </>
  );
};

export default Header;
