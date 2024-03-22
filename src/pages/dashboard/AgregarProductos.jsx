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

export function AgregarProductos() {

  const [productData, setProductData] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className=" flex mb-8 p-8">
          <Typography variant="h6" color="white" className="text-2xl">
            Tabla de Productos
          </Typography>
          <Button color="blue" size="lg" loading={false} onClick={handleOpen}><i class="fa-solid fa-plus fa-beat mr-2" ></i>Agregar Producto</Button>

          <Dialog
          size="xl"
          open={open}
          handler={handleOpen}
          backdropClass="bg-transparent"
          contentClass="bg-white"
          >
            <Card className="mx-auto w-full max-w-[24rem]">
              <CardBody className="flex flex-col gap-4">
                <Typography variant="h4" color="blue-gray">
                  Sign In
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Enter your email and password to Sign In.
                </Typography>
                <Typography className="-mb-2" variant="h6">
                  Your Email
                </Typography>
                <Input label="Email" size="lg" />
                <Typography className="-mb-2" variant="h6">
                  Your Password
                </Typography>
                <Input label="Password" size="lg" />
                <div className="-ml-2.5 -mt-3">
                  <Checkbox label="Remember Me" />
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <Button variant="gradient" onClick={handleOpen} fullWidth>
                  Sign In
                </Button>
                <Typography variant="small" className="mt-4 flex justify-center">
                  Don&apos;t have an account?
                  <Typography
                    as="a"
                    href="#signup"
                    variant="small"
                    color="blue-gray"
                    className="ml-1 font-bold"
                    onClick={handleOpen}
                  >
                    Sign up
                  </Typography>
                </Typography>
              </CardFooter>
            </Card>
          </Dialog>
        
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

export default AgregarProductos;


