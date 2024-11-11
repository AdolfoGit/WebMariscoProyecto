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

export function AgregarProductos() {

  const [productData, setProductData] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate=useNavigate();
  const [EstadoProd]=useState('Inactivo');
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
        //console.log(product1Data)
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };

  const elimnarProducto=(idProducto)=>{
    const data= new FormData();
    data.append("idProducto",idProducto);
    data.append("Estado",EstadoProd);
    fetch(
      apiurll + "/api/CasaDelMarisco/CambiarEstadoProducto?idProducto=" + idProducto + "&Estado=" + EstadoProd,
      {
        method:'POST',
        body:data,
      }
    )
    .then((res) => res.json())
    .then((result) => {
        //console.log(result);
        if (result === 'Producto actualizado') {
            Swal.fire({
                icon: 'success',
                title: 'Registro Completo',
                text: 'Realizado con exito',
            });
           obtenterDatosProductos();
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Registro incompleto',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
    })
  }

  const handleOpen = () => navigate('/dashboard/insertarproducto');
  
  return (
    <div className="mt-12 pt-4 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className=" flex mb-8 p-3">
          <Typography variant="h6" color="white" className="text-sm lg:text-xl">
            Tabla de Productos
          </Typography>
          <Button color="blue" size="sm" loading={false} onClick={handleOpen}><i className=" fa-solid fa-plus fa-beat mr-2" ></i>Agregar Producto</Button>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["ID","Imagen", "Nombre","Descripcion", "Ingredientes","Precio", "Fecha de ingreso", "Categoria","Disponibilidad","Estado","Opciones"].map((el) => (
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
              {productData !== null &&
                productData.map(
                  (
                    { idProducto, Imagen, Nombre, Descripcion, Ingredientes, Precio, FechaIntroduccion, Categoria, Disponibilidad, Estado },
                    key
                  ) => {
                    const className = `py-3 px-5 ${
                      key === productData.length - 1 ? "" : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={idProducto}>
                        <td className={className}>
                          <Typography variant="h7" color="blue-gray" className="font-semibold">
                            {idProducto}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Avatar src={Imagen} size="md" variant="square" />
                        </td>
                        <td className={className}>
                          <Typography className="text-sm font-semibold">
                            {Nombre}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm leading-7 min-w-[20rem]">
                            {Descripcion}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm min-w-[20rem]">
                            {Ingredientes}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography variant="small" className="text-md font-semibold">
                            $ {Precio}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm">
                            {FechaIntroduccion}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm text-center">
                            {Categoria === 1 ? "Platillo" : "Bebida"}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm text-center">
                            {Disponibilidad}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className="text-sm text-center">
                            {Estado}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div>
                            <Menu placement="left-start" className="text-center">
                              <MenuHandler>
                                <IconButton size="md" variant="text" color="blue-gray">
                                  <EllipsisVerticalIcon strokeWidth={3} className="h-8 w-8" />
                                </IconButton>
                              </MenuHandler>
                              <MenuList>
                                <div className="flex row items-start justify-start">
                                  <Button color="red" variant="text" className="text-md" onClick={() => elimnarProducto(idProducto)}>
                                    Eliminar
                                  </Button>
                                  <Button color="green" variant="text" className="text-md" onClick={() => navigate('/dashboard/editarproducto', { state: { idProducto } })}>
                                    Editar
                                  </Button>
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
     
    </div>
  );
}

export default AgregarProductos;


