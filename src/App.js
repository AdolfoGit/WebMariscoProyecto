import './App.css' 
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';

import Home from './components/Inicio/Inicio';
import Cookies from './components/Cookies/Cookies';
import Politicas from './components/Empresa/Politicas';
import Header from './components/home/header/Header';
import Footer from './components/ComponentesClave/Fotter';
import Nosotros from './components/Empresa/Nosotros';
import Login from './components/Usuarios/Login';
import Registrar from './components/Usuarios/Registrar';
import Terminos from './components/Empresa/Terminos';
import CookieBanner from './components/Cookies/CookiBanner';
import Ofertas from './components/Ofertas/Ofertas';
import Perfil from './components/Usuarios/Perfil';
import VisuReservacion from './components/Reservaciones/Reservaciones';
import Pedidos from './components/Pedidos/Pedidos'; 
import NotFoundPage from './components/CodigoError/NotFoundPage';
import Bienvenida from './components/Usuarios/pantallaMultifactor';

import Ayuda from './components/Empresa/Ayuda';
import Token from './components/Usuarios/Token';
import Error500 from './components/CodigoError/Error500';
import Actualizar from './components/Usuarios/actualizar';
import ListaUsuarios from './components/Administrador/Usuarios';
import DetailsProduct from './components/Productos/DetailsProduct'
import { UserProvider } from './UserContext';

import Reservaciones from './components/Reservaciones/Reservaciones';
import ProtectorRutas from './components/Usuarios/ProtectorRutas';
import ProtectorRutasAdmin from './components/Usuarios/ProtectorRutasAdmin';
import ProductoNuevo from './components/Productos/ProductoNuevo';
import Breadcrumbs from './components/ComponentesClave/Breadcrums'
import Carrito from './components/Productos/Carrito';
import TokenSMS from './components/Usuarios/TokenSMS';
import ActualizarSMS from './components/Usuarios/ActualizarSMS';
import MenuRecuperacion from './components/Usuarios/MenuRecuperacion';
import Mision from './components/Empresa/Nosotros';
import TokenRegistro from './components/Usuarios/ValidarUsuario/TokenRegistro';

import { BarChart, BoxIcon, LayoutDashboard, LifeBuoy, Package, Settings, Sidebar, UserCircle,Boxes } from 'lucide-react';
import SidebarN from './components/Administrador/Dashboard';
import { SidebarItem } from './components/Administrador/Dashboard';
import  Dashboard  from './layouts/dashboard';
import FormProducto from './pages/dashboard/FormNuevoProducto';
import FooterNuevo from './components/ComponentesClave/FotterNuevo';
import ImageUpload from './supabase/carga';
import Direcciones from './components/Usuarios/Direcciones';
import CarritoDetalle from './components/Productos/CarritoDetalle';
import RegistrarDireccion from './components/Usuarios/maps';

function App  (){

  return (
    <>
        <UserProvider>
            
        <Router>
         
          <Header/>
       
          
          <Routes>
            
            <Route path="/"   element={<Home/>} />
            <Route path="/politicas" element={<Politicas />} />
            <Route path="/Img" element={<ImageUpload />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nosotros" element={<Nosotros />} />
            
            <Route element={<ProtectorRutasAdmin/>}>
              <Route path="/dashboard/*" element={<Dashboard />} />
             
            </Route>
          <Route element={<ProtectorRutas/>}>
             <Route path="/reservaciones" element={<VisuReservacion />} />
             <Route path="/direcciones" element={<Direcciones />} />
             <Route path="/direcciones2" element={<RegistrarDireccion/>} />
             <Route path="/perfil" element={<Perfil/>}/>
             <Route path="/pedidos" element={<Pedidos />} /> 
             <Route path='/carrito' element={<Carrito/>} />
             <Route path='/detalleCarrito' element={<CarritoDetalle/>}></Route>

            </Route> 
            <Route path="/productos" element={<ProductoNuevo  />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/registrar" element={<Registrar />} />
            <Route path="/terminos" element={<Terminos />} />

            <Route path="/menuRecuperacion"element={<MenuRecuperacion />} /> 
         

            <Route path="/ayuda" element={<Ayuda/>} /> 
            <Route path="/token" element={<Token/>} /> 
            <Route path="/tokenSMS" element={<TokenSMS/>} /> 

            <Route path="/actualizar" element={<Actualizar/>} /> 
            <Route path="/actualizarSMS" element={<ActualizarSMS/>} /> 
            <Route path="/tokenRegistro" element={<TokenRegistro/>} /> 

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="/500" element={<Error500 />} />
            <Route path='*' element={<Navigate to='/404'/>} /> 
           <Route path='/listausuarios' element={<ListaUsuarios/>}></Route>
           <Route path='/multifactor' element={<Bienvenida/>}></Route>
           <Route path='/detalleProduct' element={<DetailsProduct/>}></Route> 

          </Routes>
         
        
        
       <FooterNuevo/>
          
       </Router>
        </UserProvider>

      
    </>
  );
};


export default App;

