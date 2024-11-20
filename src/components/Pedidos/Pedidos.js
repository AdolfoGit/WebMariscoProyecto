import React, { useState ,useEffect} from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useUser } from "../../UserContext";
const useStyles = styled({
  root: {
    marginTop: '20px',
  
  },
});

import logo from '../../img/logo.jpg'

const Pedidos= () => {

  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();
  const [pedidos, setPedidos] = useState([]);

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    

  const obtenerPedidos = async () => {
    const pedidosUrl = `${apiurll}/api/CasaDelMarisco/TraerPedidos?UsuarioID=${user.idUsuario}`;

    const pedidosUrl2=`https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerPedidos?UsuarioID=${user.idUsuario}`
  
    // Intenta obtener los datos desde el caché primero
    const pedidosDesdeCache = await obtenerDatosDesdeCache(pedidosUrl2);
    if (pedidosDesdeCache) {
      setLoading(false); 
      return; // Si encontramos datos en el caché, no hacemos la solicitud a la API
    }
  
    try {
      const response = await fetch(pedidosUrl, { method: "GET" });
      const data = await response.json();
  
      if (data.Pedidos) {
        setPedidos(Array.isArray(data.Pedidos) ? data.Pedidos : [data.Pedidos]);
        console.log("Pedidos obtenidos desde la API:", data.Pedidos);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error("Error al obtener pedidos desde la API:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Función para obtener los datos desde el caché
  const obtenerDatosDesdeCache = async (url) => {
    if ('caches' in window) {
      try {
        const cache = await caches.open('api-precache');
        const cachedResponse = await cache.match(url);
  
        if (cachedResponse) {
          const cachedData = await cachedResponse.json();
          setPedidos(Array.isArray(cachedData.Pedidos) ? cachedData.Pedidos : [cachedData.Pedidos]);
          console.log("Datos obtenidos desde el caché:", cachedData);
          return cachedData; // Retorna los datos si se encuentran en el caché
        } else {
          console.log("No se encontraron datos en el caché para esta URL.");
          return null;
        }
      } catch (cacheError) {
        console.error("Error al obtener los datos desde el caché:", cacheError);
        return null;
      }
    }
  };
  
    
  useEffect(() => {
    obtenerPedidos(); 
    console.log(pedidos)
  }, []);

  return (
    <Container className={classes.root}  style={{ marginBottom: '40px',marginTop:'20px' }} >
      <Typography variant="h6" gutterBottom>
        Historial de Pedidos
      </Typography>
      
      <div className='justify-center'>
        {isLoading ? (
          <Typography>Cargando pedidos...</Typography>
        ) : pedidos.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-4  mt-4 ">
            {pedidos.map((pedido) => (
              <div key={pedido.IdPedido} className="bg-white rounded-lg shadow-lg p-4 w-[23rem]">
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-white h-24 w-24 rounded-full p-2 mr-3">
                    <img src={logo} alt="Logo" className="w-1/2 h-1/2 object-cover rounded-full"/>
                  </div>
                  <div>
                    <h2 className="text-md font-bold">La Casa Del Marisco</h2>
                    <Typography className="text-md text-gray-600">
                      {new Date(pedido.Fecha).toLocaleString()}
                    </Typography>
                  </div>
                </div>
                
                <div className="mb-4 relative">
                  <div className="space-y-8">
                    <div className="flex items-center relative">
                      <svg className="w-6 h-6 text-blue-500 ml-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography variant='text' className="text-sm text-end">
                      20 de Diciembre Col. Comaltepec, Huejutla
                      </Typography>
                    </div>
                    <div className="flex items-center relative">
                      <svg className="w-6 h-6 text-gray-400 ml-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography variant='text' className="text-sm text-end">
                      {pedido.Direccion.Calle} {pedido.Direccion.NumeroExterior}, Col. {pedido.Direccion.Colonia}, {pedido.Direccion.Ciudad}
                      </Typography>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {pedido.Productos.map((producto) => (
                    <div key={producto.Id} className="flex justify-between">
                      <Typography variant='text' className='text-sm'>{producto.Nombre}</Typography>
                      <Typography variant='text' className='text-sm font-bold'>${producto.Precio.toFixed(2)}</Typography>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between font-bold text-lg border-t pt-4">
                  <Typography variant='text' className='text-lg font-bold'>Total</Typography>
                  <Typography variant='text' className='text-lg font-bold'>${pedido.Total.toFixed(2)}</Typography>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Typography>No hay pedidos disponibles.</Typography>
        )}
      </div>
      
    </Container>
  );
};

export default Pedidos;
