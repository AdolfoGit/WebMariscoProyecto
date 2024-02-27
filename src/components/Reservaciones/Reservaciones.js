import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUser } from "../../UserContext";

const Reservaciones = () => {
  const { user } = useUser();

const [servicio, setServicios] = useState([]);
const [reservaciones, setReservaciones] = useState([]);

const [nombre, setNombre] = useState('');
const [NPersonas, setNPersonas] = useState('');
const [Fecha, setFecha] = useState('');
const [NMesa, setNMesa] = useState('');
const [Servicios, setServicio] = useState('');
const [Pago, setPago] = useState('');
const [InformacionAdicional, setInformacionAdicional] = useState('');
const [loading, setLoading] = useState(true);
const [nombreError, setNombreError] = useState('');
const [NPersonasError, setNPersonasError] = useState('');
const [FechaError, setFechaError] = useState('');
const [NMesaError, setNMesaError] = useState('');
const [ServiciosError, setServicioError] = useState('');
const [PagoError, setPagoError] = useState('');


  const handleSubmit = (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("Nombre", nombre);
    formData.append("NPersonas", NPersonas);
    formData.append("Fecha", Fecha);


    formData.append("NMesa", NMesa);
    formData.append("Telefono", user.Telefono);
    formData.append("CorreoElectronico", user.Correo);
    formData.append("IdServicio", Servicios);
    formData.append("MetodoPago", Pago);
    formData.append("InformacionAdicional", InformacionAdicional);
    formData.append("IdUsuario", user.idUsuario);
  
    // Validar campos antes de enviar el formulario
    if (
      validateNombre(nombre) &&
      validateNPersonas(NPersonas) &&
      validateNMesa(NMesa) &&
      validateFecha(Fecha) &&
      validatePago(Pago) &&
      validateServicio(Servicios)
    ) {
      fetch("https://www.lacasadelmariscoapi.somee.com/api/CasaDelMarisco/AgregarReservacion", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
        });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Parece que hubo un error en su registro',
        text: 'Verifique todos los datos antes de registrarse.',
      });
    }
  };
  
  

  const validateNombre = (nombre) => {
    
    if (nombre === '') {
      setNombreError('Complete este campo');
      return false;
    } 
    if (!nombre) {
      setNombreError('Nombre no definido o nulo');
      return false;
    } 
    else {
      if (nombre.length < 2) {
        setNombreError('Mínimo de 2 caracteres');
        return false;
      } else {
        const nombreRegex = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ\s]+$/;
        if (nombreRegex.test(nombre)) {
          setNombreError('');
          return true;
        } else {
          setNombreError('No puede contener números');
          return false;
        }
      }
    }
  };
  
  const validateNPersonas = (value) => {
    if (!value) {
      setNPersonasError('Complete este campo');
      return false;
    } else {
      // Puedes agregar más validaciones según tus requisitos
      // Ejemplo: validar que sea un número entero positivo
      const isInteger = /^[1-9]\d*$/.test(value);
      if (isInteger) {
        setNPersonasError('');
        return true;
      } else {
        setNPersonasError('Ingrese un número válido');
        return false;
      }
    }
  };
  const validateNMesa = (value) => {
    if (!value) {
      setNMesaError('Complete este campo');
      return false;
    }if(value > 10 || value <0) {
      setNMesaError('Deb de estar entre la mesa 1 y 10');
      return false;
    }
    else {
      setNMesaError('');
      return true; // Reemplaza con las validaciones específicas para NMesa
    }
  };

  const ObtenerServicios = () => {
    fetch(
      "https://lacasadelmariscoapi.somee.com/api/CasaDelMarisco/ObtenerServicios",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setServicios(data);
      })
      .catch((error) => {
        console.error("Error al obtener servicios:", error);
      });
  };

  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const ObtenerReservaciones = () => {
    const id = obtenerIdUsuario(user);
    console.log(id)


    fetch(`http://localhost:5029/api/CasaDelMarisco/TraerReservaciones?idUsuario=${id}`, {
      method: "GET",
    })
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        setReservaciones(data);
      } else {
        console.error("El resultado de la API no es un array:", data);
      }
    })
    .catch((error) => {
      console.error("Error al obtener reservaciones:", error);
    });
  };
  
  
  const validateFecha = (value) => {
    if (!value) {
      setFechaError('Complete este campo');
      return false;
    } else {
      // Valida el formato de la fecha y hora
      const isValidDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})$/.test(value);
      if (isValidDateTime) {
        // Obtiene la fecha y hora actual y la fecha y hora ingresada
        const currentDateTime = new Date();
        const selectedDateTime = new Date(value);
  
        // Compara las fechas y horas
        if (selectedDateTime > currentDateTime) {
          setFechaError('');
          return true; // La fecha y hora son válidas (a partir del momento actual)
        } else {
          setFechaError('Seleccione una fecha después de hoy para verificar disponibilidad');
          return false;
        }
      } else {
        setFechaError('Formato de fecha y hora no válido');
        return false;
      }
    }
  };
  
  const validateServicio = (value)=>{
    if (!value){
      setServicioError('Seleccione un servicio')
      return false;
    }
    else{
      setServicioError('')
      return true;
    }
  }
  const validatePago = (value)=>{
    if (!value){
      setPagoError('Seleccione un método de pago')
      return false;
    }
    else{
      setPagoError('')
      return true;
    }
  }
  
  useEffect(() => {

    ObtenerServicios();
  }, []);
  useEffect(() => {
    const obtenerReservacionesUsuario = async () => {
      const id = obtenerIdUsuario(user);

      if (id !== null) {
        try {
          const response = await fetch(
            `https://www.lacasadelmariscoapi.somee.com/api/CasaDelMarisco/TraerReservaciones?idUsuario=${id}`,
            {
              method: "GET",
            }
          );
          const data = await response.json();

          if (Array.isArray(data)) {
            setReservaciones(data);
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

    obtenerReservacionesUsuario();
  }, [user]);
  
  

  return (
    <div className="container mt-3 mb-5">
      <div class="row">
        <div class="col">
          <h1>Reservaciones</h1>
        </div>
        <div class="col-md-auto"></div>
        <div class="col col-lg-2">
          <button
            className="btn btn-warning"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ color: "black" }}
          >
            <i class="fa-regular fa-calendar-plus"></i> Agendar cita
          </button>
        </div>
      </div>
      <div className="mb-5" >
  {reservaciones.map((reservacion) => (
    <div className="card mb-3" key={reservacion.idReservacion} style={{ display: "flex", gap: "10px" }}>
      <div className="card-body"style={{ display: "flex", gap: "10px" }}>
        <h5 className="card-title">{reservacion.NombreReserva}</h5>
        <h6 className="card-text">Número de personas: {reservacion.NPersonas}</h6>
        <p className="card-text">Fecha: {reservacion.Fecha}</p>
        <p className="card-text">Número de mesa: {reservacion.NMesa}</p>
        <p className="card-text">Servicio: {reservacion.IdServicio}</p>
        <p className="card-text">Método de pago: {reservacion.MetodoPago}</p>
        <p className="card-text">
          Información Adicional: {reservacion.InformacionAdicional}
        </p>
      </div>
    </div>
  ))}
</div>


      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Agendar una reservación
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit} >
              <div class="modal-body">
                <div class="mb-3">
                  <label for="Nombre" class="form-label">
                    Nombre
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="Nombre"
                    aria-describedby=""
                    onChange={(e) => setNombre(e.target.value)}
                    onBlur={() => validateNombre(nombre)}
                  />
                  {nombreError && <p className="error-message">{nombreError}</p>}

                </div>
                <div class="mb-3">
                  <label for="NPersonas" class="form-label">
                    Número de personas
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="NPersonas"
                    aria-describedby=""
                    onChange={(e) => setNPersonas(e.target.value)}
                    onBlur={() => validateNPersonas(NPersonas)}
                  />
                  {NPersonasError && <p className="error-message">{NPersonasError}</p>}

                </div>
                <div class="mb-3">
                  <label for="Fecha" class="form-label">
                    Fecha y hora
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="Fecha"
                    aria-describedby=""
                    onChange={(e) => setFecha(e.target.value)}
                    onBlur={() => validateFecha(Fecha)}
                  />
            {FechaError && <p className="error-message">{FechaError}</p>}

                </div>
                <div class="mb-3">
                  <label for="NMesa" class="form-label">
                    Número de mesa
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="NMesa"
                    aria-describedby=""
                    onChange={(e) => setNMesa(e.target.value)}  
                    onBlur={() => validateNMesa(NMesa)}
                  />
                                    {NMesaError && <p className="error-message">{NMesaError}</p>}

                </div>
                <div className="mb-3">
                  <label for="Servicios" class="form-label">
                    Tipo de servicio
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="Servicios"
                    name="Servicios"
                    onChange={(e) => setServicio(e.target.value)}
                    onBlur={() => validateServicio(Servicios)}

                  >
                  <option value="">Seleccione el servicio a reservar</option>
                    {servicio.map((servicio) => (
                      <option
                        key={servicio.idServicio}
                        value={servicio.idServicio}
                      >
                        {servicio.Nombre}
                      </option>
                    ))}
                  </select>
                  {ServiciosError && <p className="error-message">{ServiciosError}</p>}

                </div>
                <div className="mb-3">
                  <label for="Pago" class="form-label">
                    Método de pago
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="Pago"
                    name="Pago"
                    onChange={(e) => setPago(e.target.value)}
                    onBlur={() => validatePago(Pago)}

                  >
                  <option value="">Seleccione el método de pago</option>

                    <option value="Efectivo">Efectivo</option>
                    <option value="Tarjeta de crédito">
                      Tarjeta de crédito
                    </option>
                    <option value="Tarjeta de debito">Tarjeta de debito</option>
                    <option value="Cheques">Cheques</option>
                  </select>
                  {PagoError && <p className="error-message">{PagoError}</p>}

                </div>
                <div class="mb-3">
                  <label for="InformacionAdicional" class="form-label">
                  Información Adicional
                  </label>
                  <textarea
                    type="text"
                    class="form-control"
                    id="InformacionAdicional"
                    aria-describedby=""
                    onChange={(e) => setInformacionAdicional(e.target.value)}
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button type="submit" class="btn btn-warning">
                  Hacer reservacion
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservaciones;
