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

    const [productData, setProductData] = useState(null);
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const navigate=useNavigate();
    const [EstadoProd,setEstado]=useState('Inactivo');
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
            console.log(result);
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
    const handleOpen = () => navigate('/dashboard/agregarPromocion');

    return(
        <div className="mt-12 mb-8 flex flex-col gap-12">
        <Card>
          <CardHeader variant="gradient" color="gray" className=" flex mb-8 p-8">
            <Typography variant="h6" color="white" className="text-2xl">
              Tabla de Promociones
            </Typography>
            <Button color="blue" size="lg" loading={false} onClick={handleOpen}><i class="fa-solid fa-plus fa-beat mr-2" ></i>Agregar Promocion</Button>
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
                {productData !== null && productData.map(
                  ({ idProducto,Imagen, Nombre, Descripcion, Ingredientes ,Precio, FechaIntroduccion, Categoria, Disponibilidad ,Estado}, key) => {
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
                        
                            <Avatar src={Imagen} size="md" variant='square' />
                      
                      
                        </td>
                        <td className={className}>
                          <Typography className=" text-xl  font-semibold text-bold">
                            {Nombre}
                          </Typography>
                          
                        </td>
                       
                        <td className={className}>
                        <Typography className="text-xl text-bold  font-normal leadig-7 min-w-[20rem]" >
                            {Descripcion}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography className=" text-xl text-bold min-w-[20rem]">
                            {Ingredientes}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography  variant="small"
                              className="text-2xl font-normal text-bold">
                             $ {Precio}
                          </Typography>
                      
                        </td>
                        <td className={className}>
                         <Typography className='text-xl text-bold'>
                           {FechaIntroduccion}
                         </Typography>
                        </td>
                        <td className={className} >
                          <Typography className='text-xl text-center text-bold' >
                            {(Categoria===1?'Platillo':'Bebida')}
                          </Typography>
                        </td>
                        <td className={className} >
                          <Typography className='text-xl text-center text-bold'>
                            {Disponibilidad}
                          </Typography>
                        </td>
                        <td className={className} >
                          <Typography className='text-xl text-center text-bold'>
                            {Estado}
                          </Typography>
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
                                    <Button color="red" variant='text' className='text-md text-left' onClick={()=> elimnarProducto(idProducto)} > Eliminar</Button>
                                    <Button color="green" variant='text' className='text-md text-left' onClick={()=> navigate('/dashboard/editarproducto', { state: { idProducto } })}> Editar</Button>
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