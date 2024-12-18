import { Typography } from '@material-tailwind/react';
import React, { useState, useEffect } from 'react';
import { useUser } from "../../UserContext";
import ReactDOM from 'react-dom';
import Swal from "sweetalert2";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM }) ;
const isTestEnv = process.env.NODE_ENV === 'test';
import {loadStripe} from '@stripe/stripe-js'
import PaymentForm from '../paymentform';
import { Elements } from '@stripe/react-stripe-js';
import FeedbackModal from '../Pedidos/Formulario';
import { useNavigate } from 'react-router-dom';

const CarritoDetalle = () => {
  const { user } = useUser();
  const [isLoading, setLoading] = useState(true);
  const [carrito, setCarrito] = useState([]);
  const [direcciones,setDirecciones]= useState();
  const [total,setTotal]= useState(20);
  const [Direccion, setDireccion] = useState(direcciones && direcciones[0] ? direcciones[0].DireccionID : '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();
  const [stripePromise, setStripePromise] = useState(null)
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const obtenerDirecciones = async () => {

    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerDirecciones?UsuarioID=${user.idUsuario}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();     
      if (Array.isArray(data)) {
        setDirecciones(data);
      } else {
        console.error("La respuesta de la API no es un array:", data);
        setDirecciones([]);
      }
     
    } catch (error) {
      console.error("Error al obtener reservaciones:", error);
    } finally {
      setLoading(false); 
    }

  };

  const agregarAlCarrito = async (producto) => {
    const data = new FormData();
    data.append("idUsuario",user.idUsuario)
    data.append("idProducto",producto.idProducto)

    fetch(
      apiurll + "/api/CasaDelMarisco/AgregarProductosCarrito",
      {
        method: "POST",
        body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
      if (result === 'Exito') {
        obtenerProductoCarrito();
      } else {
        console.error("La respuesta de la API no es un array:", data);

      }
      })
      .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error al procesar la solicitud',
          });
      });
    
  };

  const eliminarDelCarrito = (productoAEliminar) => {
    const data = new FormData();
    data.append("idUsuario",user.idUsuario)
    data.append("idProducto",productoAEliminar.idProducto)
    data.append("idCarritoProductos",productoAEliminar.idCarritoProductos)

    fetch(
      apiurll + "/api/CasaDelMarisco/QuitarProductosCarrito",
      {
        method: "POST",
        body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
      if (result === 'Exito') {
        obtenerProductoCarrito();
      } else {
        console.error("La respuesta de la API no es un array:", data);

      }
      })
      .catch((error) => {
          console.error('Error al realizar la solicitud:', error);
          Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Ha ocurrido un error al procesar la solicitud',
          });
      });
    
  };

  const obtenerProductoCarrito = async () => {
    const id = obtenerIdUsuario(user);

    if (id !== null) {
      try {
        const response = await fetch(
          apiurll + `/api/CasaDelMarisco/TraerCarritoPorUsuario?idUsuario=${id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setCarrito(data);
        } else {
          console.error("El resultado de la API no es un array:", data);
        }
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
      } finally {
        setLoading(false); // Marcar el estado de carga como falso una vez que se completa la solicitud
      }
    } else {
      setLoading(false); // Marcar el estado de carga como falso si no hay un id válido
    }
  };
  

  const createOrder = (data, actions) => {
    console.log('Valor de total:', total);
    const amount = parseFloat(total);
    console.log('Monto parseado:', amount);
  
    if (isNaN(amount) || amount <= 0) {
      console.error('Monto inválido:', amount);
      throw new Error('Monto inválido');
    }
  
    return actions.order.create({
      purchase_units: [{
        amount: {
          value: amount.toFixed(2)
        }
      }],
      application_context: {
        shipping_preference: 'NO_SHIPPING'
      }
    });
  };
  
  const onApprove = async (data, actions) => {
    try {
      const idCarritoBien = carrito[0].idCarrito;
      const data= new FormData();
      data.append("idTipoPago",1)
      data.append("idUsuario",user.idUsuario)
      data.append("idCarrito",idCarritoBien)  
      data.append("Total",total)
      data.append("idDireccion",Direccion)

      const response = await fetch(
        apiurll + "/api/CasaDelMarisco/AgregarPedido",
        {
          method: "POST",
          body: data, 
        }
      );
      const result = await response.json();
      if (result === 'Exito') {
        const order = await actions.order.capture();
        
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'El pedido se ha guardado y procesado correctamente',
        });
        
        return order;
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al procesar la solicitud',
      });
      }
    
    } catch (error) {
      console.error('Error al capturar la orden:', error);
      alert(`Error al completar el pago: ${error.message}`);
      throw error;
    }
  };
  const onSuccessss = async () => {
    try {
      const idCarritoBien = carrito[0].idCarrito;
      const data = new FormData();
      data.append("idTipoPago", 1);
      data.append("idUsuario", user.idUsuario);
      data.append("idCarrito", idCarritoBien);
      data.append("Total", total);
      data.append("idDireccion", Direccion);
      console.log(user.idUsuario, idCarritoBien, total, Direccion);
  
      const response = await fetch(apiurll + "/api/CasaDelMarisco/AgregarPedido", {
        method: "POST",
        body: data,
      });
      const result = await response.json();
  
      if (result === 'Exito') {
        // Verificar si el usuario ya ha completado el feedback
        const feedbackCheckResponse = await fetch(`${apiurll}api/CasaDelMarisco/VerificarUsuarioFeedBack?IdUsuario=${user.idUsuario}`);
        const feedbackCheckResult = await feedbackCheckResponse.json();
  
        if (!feedbackCheckResult.Existe) {
          // Si el usuario no ha dado feedback, abrir el modal de feedback
          setIsFeedbackOpen(true);
          setIsModalOpen(false); // Ocultar el formulario de pago
        } else {
          // Si el usuario ya ha dado feedback, solo cerramos el modal de pago
          Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'El pedido se ha guardado y procesado correctamente',
          });
          setIsModalOpen(false); // Ocultar el formulario de pago
          navigate('/pedidos');

        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al procesar la solicitud',
        });
      }
    } catch (error) {
      console.error('Error al capturar la orden:', error);
      alert(`Error al completar el pago: ${error.message}`);
      throw error;
    }
  };
  
  


  const calcularTotal = () => {
    if (!carrito || carrito.length === 0) return 0;
  
    const subtotal = carrito.reduce((acc, item) => acc + item.Precio, 0);
    const iva = subtotal * 0.16;
    const envio = 1;
    const total = subtotal + iva + envio;
  
    return {
      subtotal: subtotal.toFixed(2),
      iva: iva.toFixed(2),
      envio: envio.toFixed(2),
      total: total.toFixed(2)
    };
  };


  useEffect(() => {
    obtenerProductoCarrito(); 
    obtenerDirecciones();
    const totales = calcularTotal();
    setTotal(parseFloat(totales.total));
    
    }, [carrito]);

    useEffect(() => {
      if (!stripePromise) {
        setStripePromise(loadStripe('pk_test_51Q2bhrL6Uwo5yj7nQJIPVxVbUWiz48NmkIB4rwvZkVFGZoFO9mEjngGKbeTzG1KtQCgWIiwhgjv3T4KrQDDgIUeO002GVJR4iS'));
      }
    }, []); // Solo se ejecuta una vez al montar el componente
    
    useEffect(() => {
      if (direcciones && direcciones.length > 0) {
        setDireccion(direcciones[0].DireccionID); // Configura el valor inicial
      }
    }, [direcciones]);


  return (
    <div className='lg:mr-10 lg:ml-10 m-2 pt-4 lg:pt-2'>
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-4 gap-4 lg:p-4  ">
        <div className='lg:col-span-3 w-full  shadow-lg rounded-[10px] p-5 mr-10'>
          {/* Header */}
          <FeedbackModal
            isOpen={isFeedbackOpen}
            onClose={() => setIsFeedbackOpen(false)}
            userId={user.idUsuario}
          />
          <div className="flex w-full mb-2">
            <div className=" font-bold">Producto</div>
            <div className=" font-bold ">Cantidad</div>
            <div className=" font-bold ">Total</div>
          </div>

          {/* Product rows */}
          <div className="flex flex-col ">
            {isLoading ? (
              <p>Cargando...</p>
            ) : carrito != null ? (
              carrito.map((carritoInfo) => (
                <div key={carritoInfo.idCarritoProductos} className="flex justify-beetwen border-t border-gray-400  lg:p-2 ">
                  <div className=" flex items-center p-2 lg:p-4">
                    <img src={carritoInfo.Imagen}
                      className="w-12 h-12 lg:w-20 lg:h-20 pl-2 rounded-md object-cover mr-2 lg:mr-4"
                      alt={`Imagen de ${carritoInfo.Nombre}`}
                    />
                    <div className='flex-col'>
                      <Typography variant='text' className='text-sm lg:text-md font-bold'>{carritoInfo.Nombre}</Typography>
                      <Typography className="text-sm lg:text-md text-gray-800 font-semibold">${carritoInfo.PrecioUnitario}</Typography>
                    </div>
                  </div>
                  <div className=' flex items-center justify-center'>
                    <div className='flex items-center'>
                      <button className="p-2 rounded-full" onClick={() => eliminarDelCarrito(carritoInfo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      <input
                        type='number'
                        className='w-8 text-center mx-2'
                        value={carritoInfo.Cantidad}
                        disabled={true}
                      />
                      <button className="p-2 rounded-full" onClick={() => agregarAlCarrito(carritoInfo)}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className=' flex items-center justify-center'>
                    <Typography variant='text' className='text-sm lg:text-md font-bold'>${carritoInfo.Precio}</Typography>
                  </div>
                </div>
              ))
            ) : (
              <p>No hay productos en el carrito.</p>
            )}

           
          </div>
          <Typography variant='text' className='text-md font-bold mb-2'>Elije tu dirección para la entrega de tus pedidos</Typography>
          <select
            onChange={(e) => setDireccion(e.target.value)}
            value={Direccion}
            className='text-md w-100'
          >
            {direcciones != null ? (
              direcciones.map((midirecciones) => (
                <option key={midirecciones.DireccionID} value={midirecciones.DireccionID}>
                  calle {midirecciones.Calle}, colonia {midirecciones.Colonia}, numero interior {midirecciones.NumeroInterior}
                </option>
              ))
            ) : (
              <option>No hay direcciones disponibles.</option>
            )}
          </select>
        </div>

       <div className=" lg:col-span-2 p-5  h-[28rem] rounded-[10px] lg:ml-10 shadow-lg">
          <div className="">
            <Typography variant='text' className="text-2xl font-semibold mb-4">Detalle de la orden</Typography>
            <div className='border-t border-y border-gray-300 pt-4 pb-4'>
              <div className="flex justify-between mb-1">
                <span>Subtotal</span>
                <span>${calcularTotal().subtotal}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Costo del envío</span>
                <span>$30.00</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Iva</span>
                <span>{calcularTotal().iva}</span>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <span className="font-semibold">Total</span>
              <span className="font-semibold">${calcularTotal().total}</span>
            </div>

            <div className="relative z-10 mt-4 mb-4  ">
              <button onClick={openModal}className=" w-full mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                Pagar con tarjeta
              </button>
              {isModalOpen && (
              <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
                  <button onClick={closeModal} className="text-red-500 float-right font-bold">X</button>
                  <Elements stripe={stripePromise}>
                    <PaymentForm 
                      amount={calcularTotal().total} 
                      name={user.Nombre} 
                      email={user.Correo}
                      onSuccess={onSuccessss}
                    />
                  </Elements>
                </div>
              </div>
            )}
              {!isTestEnv && (
                <PayPalButton 
                  createOrder={(data, actions) => createOrder(data, actions)}
                  onApprove={(data, actions) => onApprove(data, actions)}                
                  fundingSource="paypal"
                />
              )}

             </div>
           

          </div>
        </div>
      </div>
    </div>
  );
};

export default CarritoDetalle;
