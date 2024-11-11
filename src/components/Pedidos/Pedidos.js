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
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  

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
    console.log(pedidos)
  }, []);

  return (
    <Container className={classes.root}  style={{ marginBottom: '40px',marginTop:'20px' }} >
      <Typography variant="h6" gutterBottom>
        Historial de Pedi2
      </Typography>
      <button onClick={openModal} className="btn btn-primary">Open Modal</button>

      {isOpen && (
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">

                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Formulario de Evaluación</h2>
      <form className="space-y-6">
        {/* Pregunta 1 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
          ¿Consideras que los pasos para completar tu compra fueron claros?
          </label>
          <div className="flex justify-between">
            <label className="flex flex-col items-center">
              <input type="radio" name="navegacion" value="1" required className="mb-1" />
              <span className="text-sm text-gray-600">Totalmente claros</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="navegacion" value="2" className="mb-1" />
              <span className="text-sm text-gray-600">Claros</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="navegacion" value="3" className="mb-1" />
              <span className="text-sm text-gray-600">Poco claros</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="navegacion" value="4" className="mb-1" />
              <span className="text-sm text-gray-600">Nada claros
              </span>
            </label>
          </div>
        </div>

        {/* Pregunta 2 */}
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">
          ¿El diseño de la aplicación te resultó visualmente agradable?
          </label>
          <div className="flex justify-between">
            <label className="flex flex-col items-center">
              <input type="radio" name="compra" value="1" required className="mb-1" />
              <span className="text-sm text-gray-600">1</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="compra" value="2" className="mb-1" />
              <span className="text-sm text-gray-600">2</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="compra" value="3" className="mb-1" />
              <span className="text-sm text-gray-600">3</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="compra" value="4" className="mb-1" />
              <span className="text-sm text-gray-600">4</span>
            </label>

          </div>
        </div>

        {/* Pregunta 3 */}
          <label className="block text-lg font-medium text-gray-700 mb-2">
          ¿Te resultó conveniente el uso de esta alicación?
          </label>
          <div className="flex justify-between">
            <label className="flex flex-col items-center">
              <input type="radio" name="pago" value="1" required className="mb-1" />
              <span className="text-sm text-gray-600">Muy conveniente</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="pago" value="2" className="mb-1" />
              <span className="text-sm text-gray-600">Conveniente</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="pago" value="3" className="mb-1" />
              <span className="text-sm text-gray-600">Poco conveniente</span>
            </label>
            <label className="flex flex-col items-center">
              <input type="radio" name="pago" value="4" className="mb-1" />
              <span className="text-sm text-gray-600">Nada conveniente</span>
            </label>
           
          </div>


      </form>
    </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200">
          Enviar Evaluación
        </button>
                  <button type="button" onClick={closeModal} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Deactivate</button>
                        </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
