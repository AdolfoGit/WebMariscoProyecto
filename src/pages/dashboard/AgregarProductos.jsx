import React, {useState, useEffect}from 'react';
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
  Dialog,
  CardFooter,
  Input,
  Checkbox,
  Menu,
  MenuHandler,
  IconButton,
  MenuList
} 
from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData} from "../../data/authors-table-data";
import { projectsTableData } from "../../data/projects-table-data";
import { ClassSharp } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

export function AgregarProductos() {

  const [productData, setProductData] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate=useNavigate();
  useEffect(() => {
    obtenterDatosProductos();
  }, []); // Se ejecuta solo una vez al montar el componente
// Se ejecuta solo una vez al montar el componente


  const obtenterDatosProductos = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerProductos`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const product1Data = await response.json();
        setProductData(product1Data);
        console.log(product1Data)
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const handleOpen = () => navigate('/dashboard/insertarproducto');
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className=" flex mb-8 p-8">
          <Typography variant="h6" color="white" className="text-2xl">
            Tabla de Productos
          </Typography>
          <Button color="blue" size="lg" loading={false} onClick={handleOpen}><i class="fa-solid fa-plus fa-beat mr-2" ></i>Agregar Producto</Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID","Imagen", "Nombre","Descripcion", "Ingredientes","Precio", "Fecha de ingreso", "Categoria","Disponibilidad","Opciones"].map((el) => (
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
              {productData !== null && productData.map(
                ({ idProducto,Imagen, Nombre, Descripcion, Ingredientes ,Precio, FechaIntroduccion, Categoria, Disponibilidad }, key) => {
                  const className = `py-3 px-5 ${
                    key === productData.length - 1
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
                              {idProducto}
                            </Typography>
                      </td>
                      <td className={className}>
                      
                          <Avatar src={Imagen} size="md" variant="rounded" />
                    
                    
                      </td>
                      <td className={className}>
                        <Typography className="text-blue-gray-600" variant="h5">
                          {Nombre}
                        </Typography>
                        
                      </td>
                     
                      <td className={className}>
                      <Typography className=" text-blue-gray-600" variant="h5">
                          {Descripcion}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className=" text-blue-gray-600" variant="h5">
                          {Ingredientes}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography  variant="small"
                            className="text-2xl font-medium text-blue-gray-600">
                            {Precio}
                        </Typography>
                    
                      </td>
                      <td className={className}>
                       <Typography variant='h5'>
                         {FechaIntroduccion}
                       </Typography>
                      </td>
                      <td className={className} >
                        {Categoria}
                      </td>
                      <td className={className} >
                        {Disponibilidad}
                      </td>
                      <td className={className}>
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
                            <Button color="red">Eliminar</Button>
                          </div>
                        </MenuList>
                      </Menu>
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

export default AgregarProductos;


