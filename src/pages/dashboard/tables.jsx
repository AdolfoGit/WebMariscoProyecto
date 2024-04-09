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

export function Tables() {
  

  const [active, setActive] = useState(1);

  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Cantidad de elementos por página
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const [Estado,setEstado]=useState('Ofline');
  const [EstadoB,setEstadoB]=useState('Bloqueado');
  const [EstadoC,setEstadoC]=useState('Activo');
  const navigate=useNavigate();

  useEffect(() => {
    obtenerDatosUsuarios();
  }, [itemsPerPage]); // Se ejecuta solo una vez al montar el componente

  const obtenerDatosUsuarios = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerUsuarios`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const userData1 = await response.json();
        setUserData(userData);
        console.log(userData1);
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const estadoColor = (estado) => {
    let color = '';
    if (estado === 'Activo') {
      color = "green"; 
    } else if (estado === 'Bloqueado') {
      color = 'red';
    } else if(estado==='Ofline'){
      color = 'blue-gray';
    }
    return color;
  };

  const estadoTexto = (estado) => {
    let texto = '';
    if (estado === 'Activo') {
      texto = "Online"; 
    } else if (estado === 'Bloqueado') {
      texto = 'Bloqueado';
    } else if (estado==='Ofline'){
      texto = 'Ofline';
    }
    return texto;
  };

  // Calcular índices de inicio y fin de los datos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData !== null ? userData.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const eliminarUser=(idUser)=>{
    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario",idUsuarioInt);
    data.append("Estado",Estado);

    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt+ "&Estado="+ Estado,
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
  const bloquearUser=(idUser)=>{

    const idUsuarioInt = parseInt(idUser, 10);
    const data = new FormData();
    data.append("idUsuario",idUsuarioInt);
    data.append("Estado",EstadoB);

    fetch(
      apiurll + "api/CasaDelMarisco/CambiarEstadoUsuario?idUsuario=" + idUsuarioInt+ "&Estado="+ EstadoB,
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
                {["ID","Usuario", "Telefono","Rol", "Estado",  "Opciones"].map((el) => (
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
              {currentItems.map(({ idUsuario,Icono, Nombre, Correo, Telefono, EstadoCuenta, Rol ,Token}, key) => {
                const className = `py-3 px-5 ${
                  key === currentItems.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={idUsuario}>
                    <td className={className}>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {idUsuario}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex items-start gap-4 min-w-[20rem]">
                        <Avatar src={Icono}  size="md" className="rounded-full" />
                        <div className="flex-1">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {Nombre}
                          </Typography>
                          <Typography className="font-normal text-blue-gray-500" variant="h6">
                            {Correo}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                        <Typography className='text-xl text-bold'> {Telefono}</Typography>
                    </td>
                    <td className={className}>
                      <Typography className="font-semibold text-blue-gray-600" variant="h5">
                        {Rol===2?'Admin':'Usuario'}
                      </Typography>
                    </td>
                    <td className={className} style={{ width: '100px' }}>
                      <Chip
                        variant="gradient"
                        color={estadoColor(EstadoCuenta)}
                        value={estadoTexto(EstadoCuenta)}
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
                              <Button color="red" variant='text' className='text-md text-left' onClick={()=>eliminarUser(idUsuario)}> Eliminar</Button>
                              <Button color="blue" variant='text' className='text-md text-left'onClick={()=>bloquearUser(idUsuario)}> Bloquear</Button>
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
              {Array.from({length: Math.ceil(userData?.length / itemsPerPage)}, (_, i) => (
                <Button key={i + 1} onClick={() => paginate(i + 1)} variant={currentPage=== i+1?"filled":"text"}>{i + 1}</Button>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 text-xl"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(userData?.length / itemsPerPage)}
            >
              Siguiente
            </Button>
          </div>

        </CardBody>

      </Card>
      
    </div>
  );
}

export default Tables;
