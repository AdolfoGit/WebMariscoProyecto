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
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData} from "../../data/authors-table-data";
import { projectsTableData } from "../../data/projects-table-data";

export function Tables() {

  const [userData, setUserData] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  useEffect(() => {
    obtenerDatosUsuarios();
  }, []); // Se ejecuta solo una vez al montar el componente
// Se ejecuta solo una vez al montar el componente


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
        const userData = await response.json();
        setUserData(userData);
        console.log(userData)
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
    } else {
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
              {userData !== null && userData.map(
                ({ idUsuario,Icono, Nombre, Correo, Telefono, EstadoCuenta, Rol ,Token}, key) => {
                  const className = `py-3 px-5 ${
                    key === userData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr>
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
                        {Telefono}
                      </td>
                      <td className={className}>
                        <Typography className="font-semibold text-blue-gray-600" variant="h5">
                          {Rol}
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
                          <div className="flex">
                          <Button color="orange">Editar</Button>
                            <Button color="red">Cambiar Estado</Button>
                          </div>
                         
                        </MenuList>
                      </Menu>
                      </div>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Projects Table
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["companies", "members", "budget", "completion", ""].map(
                  (el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {projectsTableData.map(
                ({ img, name, members, budget, completion }, key) => {
                  const className = `py-3 px-5 ${
                    key === projectsTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={name}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" />
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            {name}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        {members.map(({ img, name }, key) => (
                          <Tooltip key={name} content={name}>
                            <Avatar
                              src={img}
                              alt={name}
                              size="xs"
                              variant="circular"
                              className={`cursor-pointer border-2 border-white ${
                                key === 0 ? "" : "-ml-2.5"
                              }`}
                            />
                          </Tooltip>
                        ))}
                      </td>
                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {budget}
                        </Typography>
                      </td>
                      <td className={className}>
                        <div className="w-10/12">
                          <Typography
                            variant="small"
                            className="mb-1 block text-xs font-medium text-blue-gray-600"
                          >
                            {completion}%
                          </Typography>
                          <Progress
                            value={completion}
                            variant="gradient"
                            color={completion === 100 ? "green" : "gray"}
                            className="h-1"
                          />
                        </div>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                        >
                          <EllipsisVerticalIcon
                            strokeWidth={2}
                            className="h-5 w-5 text-inherit"
                          />
                        </Typography>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Tables;
