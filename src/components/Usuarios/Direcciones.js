import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Textarea, Typography} from "@material-tailwind/react";
import {Chip} from "@material-tailwind/react";

const Reservaciones = () => {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  //const apiurll = "http://localhost:5029";
  const navigate = useNavigate();

  const { user, logoutUser } = useUser();
 
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [numeroExterior, setNumeroExterior] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEsado] = useState("");
  const [cp, setCP] = useState("");
  const [InformacionAdicional, setInformacionAdicional] = useState("");
  const [loading, setLoading] = useState(true);
  const [direcciones,setDirecciones]= useState();


  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Calle", calle);
    formData.append("Colonia", colonia);
    formData.append("NumeroInterior", numeroInterior);
    formData.append("NumeroExterior", numeroExterior);
    formData.append("CP", cp);
    formData.append("Estado", estado);
    formData.append("Ciudad", municipio);
    
    formData.append("UsuarioID", user.idUsuario);

    
      fetch(apiurll + "/api/CasaDelMarisco/AgregarDireccion", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((result) => {
         if(result=="Exito"){
            Swal.fire({
              icon: "success",
              title: "Accion realizado con exito",
              text: "",
            });
            // Llamada a la función para recargar la página
            window.location.reload();
         }else{
            Swal.fire({
              icon: "failed",
              title: "No se realizo ",
              text: "Verifique todos los datos en el apartado de reservaciones.",
            });
         
         }
        });
  };





  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };


 
 

  const obtenerDirecciones = async () => {
    const id = obtenerIdUsuario(user);

    if (id !== null) {
      try {
        const response = await fetch(
          apiurll + `/api/CasaDelMarisco/TraerDirecciones?UsuarioID=${id}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();

        if (Array.isArray(data)) {
          setDirecciones(data);
          
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

  const TABLE_HEAD = ["No.", "Calle", "Colonia", ""];
 
  const TABLE_ROWS = [
    {
      name: "John Michael",
      job: "Manager",
      date: "23/04/18",
    },
    {
      name: "Alexa Liras",
      job: "Developer",
      date: "23/04/18",
    },
    {
      name: "Laurent Perrier",
      job: "Executive",
      date: "19/09/17",
    },
    {
      name: "Michael Levi",
      job: "Developer",
      date: "24/12/08",
    },
    {
      name: "Richard Gran",
      job: "Manager",
      date: "04/10/21",
    },
  ];

  return (
    <div className="container mt-3 mb-5">
      <div class="row">
        <div class="col ml-2">
          <h1>Reservaciones</h1>
        </div>
        <div class="col-md-auto"></div>
        <div class="col col-lg-2 ">
          <Button 
            className="flex items-center gap-2 text-[9px]"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"    
            color="green"     
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            Agregar nueva direccion
          </Button>
        </div>
        <div className="mt-3">
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map(({ name, job, date }, index) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
      
                  return (
                    <tr key={name}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {job}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          as="a"
                          href="#"
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        >
                          Edit
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
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
           
            <form onSubmit={handleSubmit}>
              <div class="modal-body pr-16 pl-16 pt-16 pb-3">
                <h1 className="font-bold mb-2 text-3xl">Datos de envio</h1>
                <div class="grid grid-cols-3 gap-3">
                  <div className="col-span-2 ">
                    <label for="Nombre" class="form-label text-[15px] text-gray-600">
                      Calle
                    </label>
                    <input
                      type="text"
                      style={{height:'30px'}}
                      class="form-control rounded-lg w-full text-xl"
                      placeholder="ingresa tu calle aqui"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setCalle(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  
                  </div>
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        Numero Exterior
                    </label>
                    <input
                      type="number"
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="203"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setNumeroExterior(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Numero Interior
                    </label>
                    <input
                      type="text"
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Hidalgo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setNumeroInterior(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                  <div className=" col-span-2">
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        Colonia
                    </label>
                    <input
                      type="text"
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="5 de Mayo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setColonia(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                    
                  </div>
                  <div className="">
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Municipio
                    </label>
                    <input
                      type="text"
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Huejutla"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setMunicipio(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  
                  </div>
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Estado
                    </label>
                    <input
                      type="text"
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Hidalgo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setEsado(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                 
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        C.P.
                    </label>
                    <input
                      type="number"
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="43000"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setCP(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                  <div className="col-span-3">
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        Referencias
                    </label>
                    <textarea
                      type="text"
                      
                      class="form-control rounded-lg borde-0 h-40 text-xl"
                      placeholder="Referencias a lado de un pozo color azul"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setInformacionAdicional(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  
                  </div>
                </div>

              
              </div>
              <div class="modal-footer pr-16 pl-16 mb-3">
                    <div className="grid grid-cols-4 gap-2 w-full ">
                      <div className="col-span-2 ">
                        <Button 
                        color="green"
                        type="submit"
                        className="text-[12px] w-full "
                        variant="filled">
                          Guardar
                        </Button>
                      </div>
                      <div className="col-span-2">
                        <Button 
                        color="red"
                        type="button"
                        className="text-[12px] w-full"
                        data-bs-dismiss="modal"
                        variant="filled">
                          Cerrrar
                        </Button>
                      </div>
                    </div>
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservaciones;
