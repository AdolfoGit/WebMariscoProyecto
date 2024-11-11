import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';

const useStyles = styled({
  root: {
    marginTop: '20px',
  },
});

const PedidosGeneral = () => {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const [pedidos, setPedidos] = useState([]);


  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const obtenerPedidos = async () => {
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerPedidosGeneral`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      
      // Manejar tanto un solo pedido como múltiples pedidos
      if (data.Pedidos) {
        const pedidosArray = Array.isArray(data.Pedidos) ? data.Pedidos : [data.Pedidos];

        // Ordenar los pedidos por fecha en orden descendente
        pedidosArray.sort((a, b) => new Date(b.Fecha) - new Date(a.Fecha));

        setPedidos(pedidosArray);
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      setPedidos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerPedidos(); 
    console.log(pedidos);
  }, []);

  return (
    <Container className={classes.root} style={{ marginBottom: '10px' }} >
      
      <div className='justify-center'>
        {isLoading ? (
          <Typography>Cargando pedidos...</Typography>
        ) : pedidos.length > 0
        ? (
          <div className="flex flex-wrap justify-start gap-6 mt-5 ">
            {pedidos.map((pedido) => (
              <div key={pedido.IdPedido} className="bg-white rounded-lg shadow-sm p-4 w-[19rem] h-[28rem]">
                <div className="flex items-center justify-center ">
                  <div className="bg-white h-28 w-28 rounded-full p-2 mr-3">
                    <img src='https://scontent.fver2-1.fna.fbcdn.net/v/t39.30808-6/292516079_132638876119670_559404240699732234_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEFRXD2PxO0lcRrhYlzGu6LSp3N4cOKXKJKnc3hw4pcoiSrCUIKPC7GpQqkaPhkDkbf0f2MyZZkCvYGyQsuw73u&_nc_ohc=lbSue5FWP_sQ7kNvgEZ1AWc&_nc_ht=scontent.fver2-1.fna&oh=00_AYDh44jJSGTIMiey5ZazlvYPv8CwoZZqXdo7dGYq4yP10A&oe=669F2D7E' alt="Logo" className="w-full h-full object-cover rounded-full"/>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold">La Casa Del Marisco</h2>
                    <Typography className="text-[8px] text-gray-600">
                      {new Date(pedido.Fecha).toLocaleString()}
                    </Typography>
                  </div>
                </div>
                
                <div className="mb-2 relative">
                  <div className="space-y-8">
                    <div className="flex items-center relative">
                      <svg className="w-6 h-6 text-blue-500 ml-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography variant='text' className="text-xs text-end">
                      20 de Diciembre Col. Comaltepec, Huejutla
                      </Typography>
                    </div>
                    <div className="flex items-center relative">
                      <svg className="w-6 h-6 text-gray-400 ml-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography variant='text' className="text-xs text-end">
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
                  <Typography variant='text' className='text-sm font-bold'>Total</Typography>
                  <Typography variant='text' className='text-sm font-bold'>${pedido.Total.toFixed(2)}</Typography>
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

export default PedidosGeneral;
