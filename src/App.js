import React from 'react';
import './App.css' 
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Inicio/Inicio';
import Cookies from './components/Cookies/Cookies';
import Politicas from './components/Empresa/Politicas';
import Header from './components/home/header/Header';
import Fotter from './components/ComponentesClave/Fotter';
import Nosotros from './components/Empresa/Nosotros';
import Login from './components/Usuarios/Login';
import Registrar from './components/Usuarios/Registrar';
import Terminos from './components/Empresa/Terminos';
import CookieBanner from './components/Cookies/CookiBanner';
import Ofertas from './components/Ofertas/Ofertas';
import Perfil from './components/Usuarios/Perfil';
import VisuReservacion from './components/Reservaciones/Reservaciones';
import Productos2 from './components/Productos/Productos';
import Pedidos from './components/Pedidos/Pedidos'; 
import RecuperarContra from './components/Usuarios/RecuperarContra'
import NotFoundPage from './components/CodigoError/NotFoundPage';
import Bienvenida from './components/Usuarios/pantallaMultifactor';

import Ayuda from './components/Empresa/Ayuda';
import Token from './components/Usuarios/Token';
import Error500 from './components/CodigoError/Error500';
import Actualizar from './components/Usuarios/actualizar';
import ListaUsuarios from './components/Administrador/Usuarios';
import DetailsProduct from './components/Carousel/DetailsProduct'

function App  (){

  return (
    <>
      <Router>
         
          <Header/>
        
          <Routes>
            <Route path="/"   element={<Home/>} />
            <Route path="/politicas" element={<Politicas />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/reservaciones" element={<VisuReservacion />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/productos" element={<Productos2/>} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/pedidos" element={<Pedidos />} /> 
            <Route path="/recuperar" element={<RecuperarContra />} /> 
            <Route path="/ayuda" element={<Ayuda/>} /> 
            <Route path="/token" element={<Token/>} /> 
            <Route path="/actualizar" element={<Actualizar/>} /> 
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/500" element={<Error500 />} />
            <Route path='*' element={<Navigate to='/404'/>} /> 
           <Route path='/listausuarios' element={<ListaUsuarios/>}></Route>
           <Route path='/multifactor' element={<Bienvenida/>}></Route>
           <Route path='/detalleProduct' element={<DetailsProduct/>}></Route>
          </Routes>
          <Fotter/>
          <CookieBanner/> 
      </Router>
    </>
  );
};

export default App;
