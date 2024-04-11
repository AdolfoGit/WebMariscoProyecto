import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowRightIcon, ArrowLeftIcon  } from "@heroicons/react/24/outline";
import { projectsTableData } from "../../data/projects-table-data";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { user } from '@nextui-org/react';

export function ReservacionesPendientes() {
  

  const [active, setActive] = useState(1);

  const [reservacionesData, setReservacionesData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Cantidad de elementos por página
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [Estado,setEstado]=useState('Cancelada');
  const [EstadoB,setEstadoB]=useState('Agendada');
  const [EstadoC,setEstadoC]=useState('Activo');
  const navigate=useNavigate();

  useEffect(() => {
    obtenerDatosUsuarios();
  }, [itemsPerPage]); // Se ejecuta solo una vez al montar el componente

  const obtenerDatosUsuarios = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ObtenerReservacionesPendientes`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const reservaciones = await response.json();
        setReservacionesData(reservaciones);
        console.log(reservaciones);
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

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

  // Calcular índices de inicio y fin de los datos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reservacionesData !== null ? reservacionesData.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const cancelarReservacion=(idReservacion, CorreoElectronico)=>{
    const idInt = parseInt(idReservacion);
    const data = new FormData();
    data.append("idReservacion",idInt);
    data.append("Estado",Estado);
    data.append("Correo",CorreoElectronico);


    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoReservacion",
      {
          method: "POST",
          body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        if (result === 'Reservacion pendiente') {
            Swal.fire({
                icon: 'success',
                title: 'Reservación cancelada',
                text: 'Se ha cancelado la reservación de forma exitosa',
            });
            obtenerDatosUsuarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro incompleto',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }
  const noCancelar=(idReservacion, CorreoElectronico)=>{

    const idInt = parseInt(idReservacion);
    const data = new FormData();
    data.append("idReservacion",idInt);
    data.append("Estado",EstadoB);
    data.append("Correo",CorreoElectronico);
    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoReservacion",
      {
          method: "POST",
          body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        if (result === 'Reservacion pendiente') {
          Swal.fire({
                icon: 'success',
                title: 'Reservación devuelta al cliente',
                text: 'Realizado con exito',
            });
            obtenerDatosUsuarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro incompleto',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }

  const desbloquearUser=(idUser)=>{

    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario",idUsuarioInt);
    data.append("Estado",EstadoC);

    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt+ "&Estado="+ EstadoC,
      {
          method: "POST",
          body: data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        console.log(result);
        if (result === 'Icono actualizado') {
            Swal.fire({
                icon: 'success',
                title: 'Registro Completo',
                text: 'Realizado con exito',
            });
            obtenerDatosUsuarios();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro incompleto',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-8">
          <Typography variant="h6" color="white" className="text-2xl">
            Tabla de Usuarios
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID","A nombre de", "Cliente","Personas", "Fecha",  "Mesa","Telefono","Correo", "Servicio", "Metodo de pago", "Información", "Estado"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="h4"
                      className="text-[14px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map(({ idReservacion,NombreReserva, NombreUsuario, NPersonas,Fecha, NMesa, Telefono, CorreoElectronico, NombreServicio,MetodoPago, InformacionAdicional,Rol, Estado ,Token}, key) => {
                const className = `py-3 px-5 ${
                  key === currentItems.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={idReservacion}>
                    <td className={className}>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {idReservacion}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex items-start gap-4 min-w-[20rem]">
                        <div className="flex-1">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {NombreReserva}
                          </Typography>
                          
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {NombreUsuario}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {NPersonas}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {Fecha}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {NMesa}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {Telefono}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {CorreoElectronico}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {NombreServicio}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {MetodoPago}</Typography>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {InformacionAdicional}</Typography>
                    </td>
                  
                    <td className={className} style={{ width: '100px' }}>
                      <Chip
                        variant="gradient"
                        color={estadoColor(Estado)}
                        value={estadoTexto(Estado)}
                        className="py-0.5 px-2 text-[10px] font-medium w-40"
                      />
                    </td>
                    <td className={className}>
                      <div>
                        <Menu placement="left-start" className='text-center'>
                          <MenuHandler>
                            <IconButton size="md" variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-8 w-8"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList>
                            <div className="flex row items-start justify-start">
                              <Button color="red" variant='text' className='text-md text-left' onClick={()=>cancelarReservacion(idReservacion, CorreoElectronico)}> Cancelar</Button>
                              <Button color="blue" variant='text' className='text-md text-left'onClick={()=>noCancelar(idReservacion, CorreoElectronico )}> No cancelar</Button>
                            </div>
                          </MenuList>
                        </Menu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex items-center gap-4 mr-4 ml-4">
            <Button
              variant="text"

              className="flex items-center gap-2 text-xl"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({length: Math.ceil(reservacionesData?.length / itemsPerPage)}, (_, i) => (
                <Button key={i + 1} onClick={() => paginate(i + 1)} variant={currentPage=== i+1?"filled":"text"}>{i + 1}</Button>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 text-xl"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(reservacionesData?.length / itemsPerPage)}
            >
              Siguiente
            </Button>
          </div>

        </CardBody>

      </Card>
      
    </div>
  );
}

export default ReservacionesPendientes;
