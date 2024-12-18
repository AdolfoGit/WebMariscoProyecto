import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon  } from "@heroicons/react/24/outline";
import Swal from 'sweetalert2';

export function Tables() {
  


  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Cantidad de elementos por página
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";


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
        setUserData(userData1);
        //console.log(userData1);
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
        //console.log(result);
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
        //console.log(result);
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
        //console.log(result);
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
    <div className="mt-10 pt-4 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-3">
          <Typography variant="h6" color="white" className="text-xl">
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
                      className="text-[12px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map(({ idUsuario,Icono, Nombre, Correo, Telefono, EstadoCuenta, Rol }, key) => {
                const className = `py-3 px-5 ${
                  key === currentItems.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={idUsuario}>
                    <td className={className}>
                      <Typography
                        variant="h7"
                        color="blue-gray"
                        className="font-semibold"
                      >
                        {idUsuario}
                      </Typography>
                    </td>
                    <td className={className}>
                      <div className="flex items-start gap-4 min-w-[12rem]">
                        <Avatar src={Icono}  size="sm" className="rounded-full" />
                        <div className="flex-1">
                          <Typography
                            variant="h9"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {Nombre}
                          </Typography>
                          <Typography className="font-normal text-blue-gray-500" variant="h9">
                            {Correo}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                        <Typography className='text-md text-bold'> {Telefono}</Typography>
                    </td>
                    <td className={className}>
                      <Typography className="font-semibold text-blue-gray-600" variant="h7">
                        {Rol===2?'Admin':'Usuario'}
                      </Typography>
                    </td>
                    <td className={className} style={{ width: '50px' }}>
                      <Chip
                        variant="gradient"
                        color={estadoColor(EstadoCuenta)}
                        value={estadoTexto(EstadoCuenta)}
                        className="py-0.5 px-2 text-[10px] font-medium w-20"
                      />
                    </td>
                    <td className={className}>
                      <div>
                        <Menu placement="left-start" className='text-center '>
                          <MenuHandler>
                            <IconButton size="md" variant="text" color="blue-gray">
                              <EllipsisVerticalIcon
                                strokeWidth={3}
                                fill="currenColor"
                                className="h-6 w-6"
                              />
                            </IconButton>
                          </MenuHandler>
                          <MenuList className='w-[100px]'>
                            <div className="flex row items-start  justify-start">
                              <Button color="red" variant='text' className='text-sm text-left' onClick={()=>eliminarUser(idUsuario)}> Eliminar</Button>
                              <Button color="blue" variant='text' className='text-sm text-left'onClick={()=>bloquearUser(idUsuario)}> Bloquear</Button>
                              <Button color="orange" variant='text' className='text-sm text-left'onClick={()=>desbloquearUser(idUsuario)}> Desloquear</Button>
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
