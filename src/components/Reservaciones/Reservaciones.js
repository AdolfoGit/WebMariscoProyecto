import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import {Chip} from "@material-tailwind/react";

const Reservaciones = () => {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  //const apiurll = "http://localhost:5029";
  const navigate = useNavigate();

  const estadoColor = (estado) => {
    let color = '';
    if (estado === 'Agendada') {
      color = "green"; 
    } else if (estado === 'Cancelada') {
      color = 'red';
    } else if(estado==='Pendiente'){
      color = 'blue';
    }
    return color;
  };

  const estadoTexto = (estado) => {
    let texto = '';
    if (estado === 'Agendada') {
      texto = "Agendada"; 
    } else if (estado === 'Pendiente') {
      texto = 'Pendiente';
    } else if (estado==='Cancelada'){
      texto = 'Cancelada';
    }
    return texto;
  };
  const { user, logoutUser } = useUser();
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const [servicio, setServicios] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);

  const [nombre, setNombre] = useState("");
  const [NPersonas, setNPersonas] = useState("");
  const [Fecha, setFecha] = useState("");
  const [NMesa, setNMesa] = useState("");
  const [Servicios, setServicio] = useState("");
  const [Pago, setPago] = useState("");
  const [InformacionAdicional, setInformacionAdicional] = useState("");
  const [loading, setLoading] = useState(true);
  const [nombreError, setNombreError] = useState("");
  const [NPersonasError, setNPersonasError] = useState("");
  const [FechaError, setFechaError] = useState("");
  const [NMesaError, setNMesaError] = useState("");
  const [ServiciosError, setServicioError] = useState("");
  const [PagoError, setPagoError] = useState("");
  const [InformacionAdicionalError, setInformacionAdicionalError] =
    useState("");
    const [EstadoN, setEstadoN] = useState("Pendiente");
    const [Correo, setCorreo] = useState("Pendiente");

    
    const [idReservacion, setIdReservacion] = useState(null); // Estado para almacenar el idReservacion seleccionado
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleCancelReservation = (idReservacion, Correo) => {
    setCorreo(Correo);
    setIdReservacion(idReservacion);
  };

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
      fetch(apiurll + "/api/CasaDelMarisco/AgregarReservacion", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          Swal.fire({
            icon: "success",
            title: "Listo, reservación agregada",
            text: "Verifique todos los datos en el apartado de reservaciones.",
          });
          // Llamada a la función para recargar la página
          window.location.reload();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Parece que hubo un error en su registro",
        text: "Verifique todos los datos antes de registrarse.",
      });
    }
  };

  const CancelarReservacion = () => {
    const data = new FormData();
    data.append("idReservacion", idReservacion);
    data.append("Estado", EstadoN);
    data.append("Correo", Correo);

    try {
      fetch(apiurll + "api/CasaDelMarisco/CambiarEstadoReservacion", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result === "Reservacion pendiente") {
            Swal.fire({
              icon: "success",
              title: "La cancelación ha sido exitosa",
              showConfirmButton: false,
              timer: 2500,
            }).then(() => {
              window.location.reload();
            });
          }
        });
    } catch {
      Swal.fire({
        icon: "warning",
        title: "Lo sentimos",
        text: "Parece que hay un error en el servidor. Por favor, inténtelo de nuevo más tarde.",
      });
    }
  };

  function incrementProgress() {
    setProgress((prevProgress) => prevProgress + 15); // Ajusta según tu necesidad
  }

  const validateNombre = (nombre) => {
    if (nombre === "") {
      setNombreError("Complete este campo");
      return false;
    }
    if (!nombre) {
      setNombreError("Nombre no definido o nulo");
      return false;
    } else {
      if (nombre.length < 2) {
        setNombreError("Mínimo de 2 caracteres");
        return false;
      } else {
        const nombreRegex = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ\s]+$/;
        if (nombreRegex.test(nombre)) {
          setNombreError("");
          incrementProgress();
          return true;
        } else {
          setNombreError("No puede contener números");
          return false;
        }
      }
    }
  };

  const validateNPersonas = (value) => {
    if (!value) {
      setNPersonasError("Complete este campo");
      return false;
    } else {
      // Puedes agregar más validaciones según tus requisitos
      // Ejemplo: validar que sea un número entero positivo
      const isInteger = /^[1-9]\d*$/.test(value);
      if (isInteger) {
        setNPersonasError("");
        incrementProgress();
        return true;
      } else {
        setNPersonasError("Ingrese un número válido");
        return false;
      }
    }
  };
  const validateNMesa = (value) => {
    if (!value) {
      setNMesaError("Complete este campo");
      return false;
    }
    if (value > 10 || value < 0) {
      setNMesaError("Deb de estar entre la mesa 1 y 10");
      return false;
    } else {
      incrementProgress();
      setNMesaError("");
      return true; // Reemplaza con las validaciones específicas para NMesa
    }
  };

  const ObtenerServicios = () => {
    fetch(apiurll + "/api/CasaDelMarisco/ObtenerServicios", {
      method: "GET",
    })
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

  function Disponibilidad(nmesa, fecha) {
    if (nmesa === "" || fecha === "") {
      Swal.fire({
        icon: "error",
        title: "Parece que no ingresaste una fecha o mesa valida",
        text: "Verifique todos los datos antes de ver la disponibilidad",
      });
    } else {
      const formData = new FormData();
      formData.append("Fecha", fecha);
      formData.append("NMesa", nmesa);
      fetch(
        apiurll +
          "/api/CasaDelMarisco/VerificarReservaciones?NMesa=" +
          nmesa +
          "&Fecha=" +
          fecha,
        {
          method: "POST",
          body: formData,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.Result == "1") {
            Swal.fire({
              icon: "error",
              title: "Oh no",
              text: "Parece que ya existe una reservacion en la fecha, hora y mesa indicada",
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Disponible",
              text: "Si tenemos disponibilidad para su reservación",
            });
            setIsButtonDisabled(false);
          }
        });
    }
  }

  const validateFecha = (value) => {
    const formData = new FormData();
    formData.append("Fecha", Fecha);
    formData.append("NMesa", NMesa);
    if (!value) {
      setFechaError("Complete este campo");
      return false;
    } else {
      // Valida el formato de la fecha y hora
      const isValidDateTime = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}:\d{2})$/.test(
        value
      );

      if (isValidDateTime) {
        // Obtiene la fecha y hora actual y la fecha y hora ingresada
        const currentDateTime = new Date();
        const selectedDateTime = new Date(value);

        // Compara las fechas y horas
        if (selectedDateTime > currentDateTime) {
          setFechaError("");

          // Validar el rango específico de horas
          const selectedHour = selectedDateTime.getHours();
          const minHour = 12;
          const maxHour = 22;

          if (selectedHour >= minHour && selectedHour <= maxHour) {
            incrementProgress();
            return true; // La fecha y hora son válidas (a partir del momento actual y en el rango de horas)
          } else {
            setFechaError(
              "Seleccione una hora entre las 12:00 PM y las 10:00 PM"
            );
            return false;
          }
        } else {
          setFechaError(
            "Seleccione una fecha después de hoy para verificar disponibilidad"
          );
          return false;
        }
      } else {
        setFechaError("Formato de fecha y hora no válido");
        return false;
      }
    }
  };

  const validateServicio = (value) => {
    if (!value) {
      setServicioError("Seleccione un servicio");
      return false;
    } else {
      setServicioError("");
      incrementProgress();
      return true;
    }
  };
  const validatePago = (value) => {
    if (!value) {
      setPagoError("Seleccione un método de pago");
      return false;
    } else {
      setPagoError("");
      incrementProgress();
      return true;
    }
  };
  const validateInformacion = (value) => {
    if (!value) {
      setInformacionAdicionalError("Por favor llene este apartado");
      return false;
    } else {
      setInformacionAdicionalError("");
      incrementProgress();
      return true;
    }
  };

  useEffect(() => {
    setShowProgress(true);

    ObtenerServicios();
  }, []);
  const obtenerReservacionesUsuario = async () => {
    const id = obtenerIdUsuario(user);

    if (id !== null) {
      try {
        const response = await fetch(
          apiurll + `/api/CasaDelMarisco/TraerReservaciones?idUsuario=${id}`,
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
  useEffect(() => {
   obtenerReservacionesUsuario()

    obtenerReservacionesUsuario();
  }, [user]);

  return (
    <div className="container mt-3 mb-5">
      <div class="row">
        <div class="col m-5">
          <h1>Reservaciones</h1>
        </div>
        <div class="col-md-auto"></div>
        <div class="col col-lg-2">
          <button
            className="btn btn-warning  m-5"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            style={{ color: "black" }}
          >
            <i class="fa-regular fa-calendar-plus"></i> <h4> Agendar cita</h4>
          </button>
        </div>
      </div>
      <div className="mb-5">
        {reservaciones.map((reservacion) => (
          <div className="card mb-5" key={reservacion.idReservacion}>
            <div
              className="card-body"
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <div>
                  <h2 className="card-title m-2">
                    Nombre de quien reserva: {reservacion.NombreReserva}
                  </h2>
                  <h3 className="card-text  m-2">
                    Número de personas: {reservacion.NPersonas}
                  </h3>
                </div>
                <div>
                  <h3 className="card-text m-2">Fecha: {reservacion.Fecha}</h3>
                  <h3 className="card-text m-2">
                    Número de mesa: {reservacion.NMesa} 
                  </h3>
                    <h3 className="card-text m-2">
                      Estado
                    </h3>
                  <Chip
                        variant="gradient"
                        color={estadoColor(reservacion.Estado)}
                        value={estadoTexto(reservacion.Estado)}
                        className="py-0.5 px-2 text-[10px] font-medium w-40 mb-3"
                      />
                  <Button
                    type="button"
                    color="orange"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                    onClick={() =>
                      handleCancelReservation(reservacion.idReservacion, reservacion.CorreoElectronico)
                    }
                  >
                    Cancelar reserva
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="card-text  m-2">
                  Servicio: {reservacion.NombreServicio}
                </h3>
                <h3 className="card-text m-2">
                  Método de pago: {reservacion.MetodoPago}
                </h3>
                <h3 className="card-text m-2">
                  Información Adicional: {reservacion.InformacionAdicional}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Cancelar reservación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div className="modal-body">
                <p>¿Estás seguro de cancelar la reservación?</p>

                {/* Mostrar el idReservacion */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={CancelarReservacion}
                >
                Cancelar reserva
                </button>
              </div>
            </form>
          </div>
        </div>
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
            <form onSubmit={handleSubmit}>
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
                  {nombreError && (
                    <p className="error-message">{nombreError}</p>
                  )}
                </div>
                <div class="mb-3">

                  <label for="NPersonas" class="form-label">
                    Número de personas
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="NMesa"
                    name="NMesa"
                    onChange={(e) => setNPersonas(e.target.value)}
                    onBlur={() => validateNPersonas(NPersonas)}
                  >
                    <option value="">Seleccione el numero de personas</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                 {NPersonasError && (
                    <p className="error-message">{NPersonasError}</p>
                  )}
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

                <div className="mb-3">
                  <label for="NMesa" class="form-label">
                    Número de mesa
                  </label>
                  <select
                    class="form-select"
                    aria-label="Default select example"
                    id="NMesa"
                    name="NMesa"
                    onChange={(e) => setNMesa(e.target.value)}
                    onBlur={() => validateNMesa(NMesa)}
                  >
                    <option value="">Seleccione su mesa</option>
                    <option value="1">Mesa 1</option>
                    <option value="2">Mesa 2</option>
                    <option value="3">Mesa 3</option>
                    <option value="4">Mesa 4</option>
                    <option value="5">Mesa 5</option>
                    <option value="6">Mesa 6</option>
                    <option value="7">Mesa 7</option>
                    <option value="8">Mesa 8</option>
                    <option value="9">Mesa 9</option>
                    <option value="10">Mesa 10</option>
                  </select>
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
                  {ServiciosError && (
                    <p className="error-message">{ServiciosError}</p>
                  )}
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
                    onBlur={() => validateInformacion(InformacionAdicional)}
                  />
                </div>
                {InformacionAdicionalError && (
                  <p className="error-message">{InformacionAdicionalError}</p>
                )}

                {showProgress && (
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${progress}%` }}
                      aria-valuenow={progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                )}
              </div>
              <div class="modal-footer">
                <button
                  type="submit"
                  class="btn btn-warning"
                  disabled={isButtonDisabled}
                >
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
            <button
              type="button"
              class="btn btn-warning"
              onClick={Disponibilidad.bind(null, NMesa, Fecha)}
            >
              Ver disponibilidad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservaciones;
