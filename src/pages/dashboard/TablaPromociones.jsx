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



export  function TablaPromociones (){

    const [promocionesData, setPromocionesData] = useState(null);
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const navigate=useNavigate();
    const [EstadoPromocion]=useState('Inactivo');
    useEffect(() => {
      obtenerDatosPromociones();
    }, []); // Se ejecuta solo una vez al montar el componente
  // Se ejecuta solo una vez al montar el componente
  
  
    const obtenerDatosPromociones = async () => {
      try {
        const response = await fetch(
          `${apiurll}/api/CasaDelMarisco/TraerPromociones`,
          {
            method: 'GET',
            // No es necesario incluir el body para una solicitud GET
          }
        );
  
        if (response.ok) {
          const product1Data = await response.json();
          setPromocionesData(product1Data);
        } else {
          console.error('Error al obtener datos de los usuarios:', response.statusText);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
  

    
    const elimnarProducto=(idPromocion)=>{ 
        const data= new FormData();
        data.append("idPromocion",idPromocion);
        data.append("Estado",EstadoPromocion);
        fetch(
        apiurll + "/api/CasaDelMarisco/CambiarEstadoPromociones?idPromocion=" + idPromocion + "&Estado=" + EstadoPromocion,
        {
            method:'POST',
            body:data,
        }
        )
        .then((res) => res.json())
        .then((result) => {
            //console.log(result);
            if (result === 'Cambiado') {
                Swal.fire({
                    icon: 'success',
                    title: 'Completado con exito',
                    text: 'El estado se cambio',
                });
            obtenerDatosPromociones();
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro incompleto',
                    text: 'Ha ocurrido un error verifique los datos',
                });
            }
        })
    }
    const handleOpen = () => navigate('/dashboard/agregarPromocion');

    return(
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className=" flex mb-8 p-8">
            <Typography variant="h6" color="white" className="text-2xl">
              Tabla de Promociones
            </Typography>
            <Button color="blue" size="lg" loading={false} onClick={handleOpen}><i className="fa-solid fa-plus fa-beat mr-2" ></i>Agregar Promocion</Button>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["ID",'Imagen',"Nombre", "Fecha de Terminacion","IdProducto", "Descripcion","Fecha de Publicacion", "Descuento", "Estado","Imagen"].map((el) => (
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
                {promocionesData !== null &&
                  promocionesData.map(
                    ({ idPromocion, Nombre, FechaDeFin, IdProducto, Descripcion, FechaPublicacion, Descuento, Estado, Imagen }) => {
                      const className = `py-3 px-5 ${
                        idPromocion === promocionesData.length - 1 ? "" : "border-b border-blue-gray-50"
                      }`;

                      return (
                        <tr key={idPromocion}>
                          <td className={className}>
                            <Typography variant="h5" color="blue-gray" className="font-semibold">
                              {idPromocion}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Avatar src={Imagen}></Avatar>
                          </td>
                          <td className={className}>
                            <Typography className="text-xl font-semibold">
                              {Nombre}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography variant="small" className="text-xl text-bold">
                              {FechaDeFin}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xl text-bold">
                              {IdProducto}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xl text-bold">
                              {Descripcion}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xl text-center text-bold">
                              {FechaPublicacion}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xl text-center text-bold">
                              {Descuento}%
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xl text-center text-bold">
                              {Estado}
                            </Typography>
                          </td>
                          <td className={className}>
                            <div>
                              <Menu placement="left-start" className="text-center">
                                <MenuHandler>
                                  <IconButton size="md" variant="text" color="blue-gray">
                                    <EllipsisVerticalIcon strokeWidth={3} fill="currentColor" className="h-8 w-8" />
                                  </IconButton>
                                </MenuHandler>
                                <MenuList>
                                  <div className="flex row items-start justify-start">
                                    <Button
                                      color="red"
                                      variant="text"
                                      className="text-md text-left"
                                      onClick={() => elimnarProducto(idPromocion)}
                                    >
                                      Eliminar
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
    )
}
export default TablaPromociones;