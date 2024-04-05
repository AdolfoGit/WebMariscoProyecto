import React, { useEffect, useState} from 'react';
import {
  Card,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { PhotoIcon,  } from '@heroicons/react/24/solid'
import { uploadFilesProductos } from "../../firebase/firebase";


export function AgregarPromocion (){



    const navigate=useNavigate();
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

    
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        obtenterDatosProductos();
      }, []); // Se ejecuta solo una vez al montar el componente
    // Se ejecuta solo una vez al montar el componente
    const [selectedProductId, setSelectedProductId] = useState(); // Estado para almacenar el ID del producto seleccionado

    const [nombre,setNombre]=useState();
    const [descripcion,setDescripcion]=useState();
    const [fechaFin,setFechaFin]=useState();
    const[descuento,setDescuento]=useState();

    const [File, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);

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
    
    const cancelarProceso=()=>{
        setImageURL(null);
        navigate('/dashboard/Promociones');
    }
    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
          setFile(droppedFile);
        const imageURL = URL.createObjectURL(droppedFile);
        setImageURL(imageURL);
      };
    
    const handleSubmit = async (e)=>{
        
        e.preventDefault();

        const resultImage = await uploadFilesProductos(File);
      
        const data =new FormData();
        data.append("Nombre",nombre)
        data.append("FechaFin",fechaFin);
        data.append("idProducto",selectedProductId)
        data.append("Descripcion",descripcion);
        data.append("Descuento",descuento)
        data.append("Imagen",resultImage);

        fetch(
            apiurll + "api/CasaDelMarisco/AgregarPromociones?Nombre=" + nombre +  "&FechaFin="  + fechaFin + "&idProducto=" + selectedProductId + "&Descripcion=" +  descripcion + "&Descuento=" + descuento +
            "&Imagen=" + resultImage,
            {
                method: "POST",
                body: data,
            }
        )
        .then((res) => res.json())
        .then((result) => {
            console.log(result);
            if (result === 'Agregado!!') {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Completo',
                    text: 'Realizado con exito',
                });
                navigate('/dashboard/Promociones')
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro incompleto',
                    text: 'Ha ocurrido un error verifique los datos',
                });
            }
        })
        .catch((error) => {
            console.error('Error al realizar la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al procesar la solicitud',
            });
        });
        
      

    }

  


    return(
    <Card className='mt-6'>
        <form className='p-20' onSubmit={handleSubmit}>
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-md font-bold leading-9 text-gray-900">Nuevo Producto</h2>
            <p className="mt-1 text-xl leading-6 text-gray-600">
                Complete la siguiente informacion para registrar un nuevo producto en la base de datos
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
                <div className="sm:col-span-2 sm:col-start-1">
                    <label  className="block text-2xl font-medium leading-6 text-gray-900">
                        Nombre del la Promoción
                    </label>
                    <div className="mt-2">
                        <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        
                        className="text-2xl block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                        />
                    </div>
                </div>

                <div className=' sm:col-span-2 '>
                    <label  className="block text-2xl font-medium leading-6 text-gray-900">
                        Fecha de Expiracion
                    </label>
                    <div className="mt-2">
                        <input
                        type="datetime-local"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        
                        className="text-2xl block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                        />
                    </div>
                </div>

                <div className="sm:col-span-2 ">
                <label htmlFor="username" className="block text-2xl font-medium leading-6 text-gray-900">
                        Producto
                    </label>

                    <select 
                        className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"  
                        value={selectedProductId}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                    >
                        {productData !== null && productData.map(({ idProducto,Nombre }) => (
                            <option  value={idProducto} className="flex items-center gap-2">
                                {Nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-span-full">
                <label htmlFor="about" className="block text-2xl font-medium leading-6 text-gray-900">
                    Descripcion del Producto
                </label>
                <div className="mt-2">
                    <textarea
                    value={descripcion}
                     onChange={(e) => setDescripcion(e.target.value)}
  
                    rows={3}
                    className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-8"
        
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Escribe la descripcion de forma seguida sin parrafos</p>
                </div>
 
               
            </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>     
                    <div className="col-span-3">
                        <label htmlFor="cover-photo" className="block text-2xl font-medium leading-6 text-gray-900">
                            Imagen del Producto
                        </label>
                        {imageURL ? (
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <img src={imageURL} alt="Imagen seleccionada" className="mx-auto h-60 w-70 rounded-20 bg-gray-100" />
                            </div>
                        ) : (
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex items-center justify-center text-sm leading-6 text-gray-600">
                                    <label
                                    
                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input  type="file" className="sr-only"   accept="image/*"   onChange={(e) => {
                                         setFile(e.target.files[0]);
                                         const imageURL = URL.createObjectURL(e.target.files[0]);
                                         setImageURL(imageURL);
                                        }} />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        )}
                    </div>

                    <div className='col-span-3  flex flex-col sm:flex-row'>
                        <div className='col-span-3 flex-col sm:flex-row'>
                            <>
                                {imageURL ? (
                                    <>    <div>
                                    <div className="sm:col-span-2 mb-5">
                                    <label htmlFor="region" className="block text-2xl font-medium leading-6 text-gray-900">
                                        Descuento %
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="number"
                                        value={descuento}
                                        onChange={(e) => setDescuento(e.target.value)}
                                        className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        />
                                    </div>
                                    </div>

                                    </div>
                                        <Button color='amber' className='mt-2 text-white' onClick={()=> setImageURL(null)}>Eliminar Foto</Button>
                                    </>
                                ) : (
                                   
                                    <div>
                                        <div className="sm:col-span-1  mb-5">
                                        <label htmlFor="region" className="block text-2xl font-medium leading-6 text-gray-900">
                                            Descuento %
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            value={descuento}
                                            onChange={(e) => setDescuento(e.target.value)}
                                            className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                            />
                                        </div>
                                        </div>
                                     
                                    </div>
                                )}
                            </>
                        </div>

                 
                    </div>

                   
                </div>
            </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
            <Button color='red' variant='field' size='lg' onClick={()=> cancelarProceso()}>Cancelar</Button>
            <Button variant='field' color='green' size='lg' type='submit'>Registrar</Button>
          
        </div>
        </form>
    </Card>
    )
}

export default AgregarPromocion;