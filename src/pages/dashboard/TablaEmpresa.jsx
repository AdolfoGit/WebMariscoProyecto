import React, {useState, useEffect}from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Button,
  Menu,
  MenuHandler,
  IconButton,
  MenuList
} 
from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';




export function TablaEmpresa(){
    const [empresaData, setEmpresaData] = useState(null);
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const navigate=useNavigate();
   
    useEffect(() => {
      obtenerDatosEmpresa();
    }, []); // Se ejecuta solo una vez al montar el componente
  // Se ejecuta solo una vez al montar el componente
  
  
    const obtenerDatosEmpresa = async () => {
      try {
        const response = await fetch(
          `${apiurll}/api/CasaDelMarisco/TraerDatosEmpresa`,
          {
            method: 'GET',
            // No es necesario incluir el body para una solicitud GET
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          setEmpresaData(data);
        } else {
          console.error('Error al obtener datos de los usuarios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
  
    return(
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className=" flex mb-8 p-8">
            <Typography variant="h6" color="white" className="text-2xl">
              Informacion acerca de la empresa Mision/Vision
            </Typography>
          
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID","Mision", "Vision","Direccion", "Telefono","Horario","Editar"].map((el) => (
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

                      <tr>
                          <td >
                        <Typography
                                variant="h5"
                                color="blue-gray"
                                className="font-semibold text-center"
                              >
                                {empresaData?.idDatos}
                              </Typography>
                        </td>
                     
                        <td >
                          <Typography className=" text-xl font-normal min-w-[50rem] p-3">
                            {empresaData?.Mision}
                          </Typography>
                          
                        </td>
                        <td >
                          <Typography  variant="small"
                              className="text-xl font-normal min-w-[50rem] p-3">
                             {empresaData?.Vision}
                          </Typography>
                      
                        </td>
                        <td >
                         <Typography className='text-xl text-bold min-w-[10rem] p-3'>
                           {empresaData?.Direccion}
                         </Typography>
                        </td>
                        <td >
                         <Typography className='text-xl font-normal text-center'>
                           {empresaData?.Telefono}
                         </Typography>
                        </td>
                        <td  >
                          <Typography className='text-xl text-center text-bold'>
                            {empresaData?.Horario}
                          </Typography>
                        </td>
                      
                        <td >
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
                                    <Button color="red" variant='text' className='text-md text-left' > Editar</Button>                                  </div>
                                </MenuList>
                              </Menu>
                            </div>
                        </td>
                      </tr>
                  
              </tbody>
            </table>
          </CardBody>
        </Card>
       
        </div>
    )
}
export default TablaEmpresa;