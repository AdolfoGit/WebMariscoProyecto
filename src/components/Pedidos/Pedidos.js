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

const Pedidos= () => {

  const classes = useStyles();
  const [isLoading, setLoading] = useState(true);
  const { user } = useUser();
  const [pedidos, setPedidos] = useState([]);

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  
  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("pedidosDB", 1);
  
      request.onerror = (event) => {
        console.error("Error al abrir la base de datos:", event.target.error);
        reject(event.target.error);
      };
  
      request.onsuccess = (event) => {
        console.log("Base de datos abierta con éxito");
        resolve(event.target.result);
      };
  
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains("pedidos")) {
          db.createObjectStore("pedidos", { keyPath: "IdPedido" });
        }
      };
    });
  }


  async function guardarPedidosEnIndexedDB(pedidos) {
    try {
      const db = await openDatabase();
      const transaction = db.transaction(["pedidos"], "readwrite");
      const store = transaction.objectStore("pedidos");
  
      pedidos.forEach((pedido) => {
        store.put(pedido); // Guardar cada pedido en el almacén
      });
  
      transaction.oncomplete = () => {
        console.log("Pedidos almacenados en IndexedDB");
      };
  
      transaction.onerror = (event) => {
        console.error(
          "Error al almacenar pedidos en IndexedDB:",
          event.target.error
        );
      };
    } catch (error) {
      console.error("Error en IndexedDB:", error);
    }
  }

  // Función para obtener pedidos de IndexedDB
  async function obtenerPedidosDeIndexedDB() {
    try {
      const db = await openDatabase();
      const transaction = db.transaction("pedidos", "readonly");
      const store = transaction.objectStore("pedidos");

      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = (event) => {
          resolve(event.target.result); // Devuelve los pedidos almacenados
        };
        request.onerror = (event) => {
          console.error(
            "Error al obtener pedidos de IndexedDB:",
            event.target.error
          );
          reject(event.target.error);
        };
      });
    } catch (error) {
      console.error("Error en IndexedDB:", error);
      return [];
    }
  }

  

  const obtenerPedidos = async () => {
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerPedidos?UsuarioID=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      
      // Manejar tanto un solo pedido como múltiples pedidos
      if (data.Pedidos) {
        setPedidos(Array.isArray(data.Pedidos) ? data.Pedidos : [data.Pedidos]);
        guardarPedidosEnIndexedDB(Array.isArray(data.Pedidos) ? data.Pedidos : [data.Pedidos])
        console.log(pedidos)
      } else {
        setPedidos([]);
      }
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
      const pedidosGuardados = await obtenerPedidosDeIndexedDB();
      if (pedidosGuardados.length > 0) {
        setPedidos(pedidosGuardados);
      } else {
        console.error("No hay productos guardados en IndexedDB.");
      }
    } finally {
      setLoading(false);
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
          <div className="flex flex-wrap justify-start gap-6  mt-4 ">
            {pedidos.map((pedido) => (
              <div key={pedido.IdPedido} className="bg-white rounded-lg shadow-lg p-10 w-full max-w-sm">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white h-24 w-24 rounded-full p-2 mr-3">
                    <img src='https://scontent.fpbc2-1.fna.fbcdn.net/v/t39.30808-6/454348975_471022365692065_5380072197498364793_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFTW77Y7Oc_V1PP53rY6EfllKKjr-2y7MuUoqOv7bLsy6zs0jUcTLmS2x93OsGvz1IcvY1yzDjGv7M688081B3q&_nc_ohc=0MKdVX2lPygQ7kNvgGZpwmW&_nc_zt=23&_nc_ht=scontent.fpbc2-1.fna&_nc_gid=A_7bqFv1GfcNJqvONAosfNu&oh=00_AYAJ8fPZHCA_ISlmRsKGxO51U_WknzzYbGz3Q_HRxqCplQ&oe=671DF36E' alt="Logo" className="w-full h-full object-cover rounded-full"/>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">La Casa Del Marisco</h2>
                    <Typography className="text-xl text-gray-600">
                      {new Date(pedido.Fecha).toLocaleString()}
                    </Typography>
                  </div>
                </div>
                
                <div className="mb-4 relative">
                  <div className="space-y-8">
                    <div className="flex items-center relative">
                      <svg className="w-6 h-6 text-blue-500 ml-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography variant='text' className="text-md text-end">
                      20 de Diciembre Col. Comaltepec, Huejutla
                      </Typography>
                    </div>
                    <div className="flex items-center relative">
                      <svg className="w-6 h-6 text-gray-400 ml-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <Typography variant='text' className="text-md text-end">
                      {pedido.Direccion.Calle} {pedido.Direccion.NumeroExterior}, Col. {pedido.Direccion.Colonia}, {pedido.Direccion.Ciudad}
                      </Typography>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {pedido.Productos.map((producto) => (
                    <div key={producto.Id} className="flex justify-between">
                      <Typography variant='text' className='text-md'>{producto.Nombre}</Typography>
                      <Typography variant='text' className='text-md font-bold'>${producto.Precio.toFixed(2)}</Typography>
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
