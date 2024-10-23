import React, { useState} from 'react';
import {
  Card,
  Button,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

import { PhotoIcon } from '@heroicons/react/24/solid'
import { uploadFilesUsuarios } from "../../firebase/firebase";

export function FormProducto (){
    const navigate=useNavigate();
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

    const [nombre,setNombre]=useState();
    const [precio,setPrecio]=useState();
    const [descripcion,setDescripcion]=useState();
    const [ingredientes,setIngredientes]=useState();
    const [categoria,setCategoria]=useState();
    const [disponibilidad,setDisponibilidad]=useState();
    const [estado,setEstado]=useState();
    const [File, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    
    const cancelarProceso=()=>{
        setImageURL(null);
        navigate('/dashboard/Productos');
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
         // Verificar si el archivo seleccionado es una imagen
    if (!File.type.startsWith("image")) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El archivo seleccionado no es una imagen.",
        });
        return;
      }

        const resultImage = await uploadFilesUsuarios(File);
      

        const data =new FormData();
        data.append("Nombre",nombre)
        data.append("Ingredientes",ingredientes);
        data.append("Descripcion",descripcion);
        data.append("Precio",precio);
        data.append("Disponibilidad",disponibilidad);
        data.append("Categoria",categoria);
        data.append("Estado",estado);
        data.append("Imagen",resultImage);

        fetch(
            apiurll + "api/CasaDelMarisco/AgregarProductos?Nombre=" + nombre+ "&Ingredientes=" + ingredientes + "&Descripcion=" + descripcion + "&Precio=" + precio + "&Disponibilidad=" + disponibilidad + "&Categoria=" + categoria + "&Estado=" + estado +
            "&Imagen=" + resultImage,
            {
                method: "POST",
                body: data,
            }
        )
        .then((res) => res.json())
        .then((result) => {
            //console.log(result);
            if (result === 'Agregado!!') {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Completo',
                    text: 'Realizado con exito',
                });
                navigate('/dashboard/Productos')
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
            
                <div className="sm:col-span-4 sm:col-start-1">
                <label  className="block text-2xl font-medium leading-6 text-gray-900">
                    Nombre del Producto
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

                <div className="col-span-full">
                <label htmlFor="about" className="block text-2xl font-medium leading-6 text-gray-900">
                    Ingredientes
                </label>
                <div className="mt-2">
                    <textarea
                    id="about"
                    value={ingredientes}
                    onChange={(e) => setIngredientes(e.target.value)}
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border border-gray-900  py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-8"
                 
                    />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">Escribe los ingredientes de forma seguida sin parrafos</p>
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
                                        Disponibilidad
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="number"
                                        value={disponibilidad}
                                        onChange={(e) => setDisponibilidad(e.target.value)}
                                        className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        />
                                    </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                    <label htmlFor="postal-code" className="block text-2xl font-medium leading-6 text-gray-900">
                                        Estado:
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        value={estado}
                                        type="text"
                                        onChange={(e) => setEstado(e.target.value)}
                                        className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                        />
                                        <p className="mt-3 text-sm leading-6 text-gray-600">Solo hay dos estados ya sea Activo o Inactivo</p>
                                    </div>
                                    </div>
                                    </div>
                                        <Button color='amber' className='mt-2 text-white' onClick={()=> setImageURL(null)}>Eliminar Foto</Button>
                                    </>
                                ) : (
                                   
                                    <div>
                                        <div className="sm:col-span-1  mb-5">
                                        <label htmlFor="region" className="block text-2xl font-medium leading-6 text-gray-900">
                                            Disponibilidad
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            type="number"
                                            value={disponibilidad}
                                            onChange={(e) => setDisponibilidad(e.target.value)}
                                            className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                            />
                                        </div>
                                        </div>
                                        <div className="sm:col-span-1">
                                        <label htmlFor="postal-code" className="block text-2xl font-medium leading-6 text-gray-900">
                                            Estado:
                                        </label>
                                        <div className="mt-2">
                                            <input
                                            value={estado}
                                            type="text"
                                            onChange={(e) => setEstado(e.target.value)}
                                            className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6"
                                            />
                                            <p className="mt-3 text-sm leading-6 text-gray-600">Solo hay dos estados ya sea Activo o Inactivo</p>
                                        </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        </div>


                        <div className='col-span-3 flex-col  sm:flex-row'>
                            <div className="sm:col-span-3 mb-5">
                                <label htmlFor="username" className="block text-2xl font-medium leading-6 text-gray-900">
                                    Precio
                                </label>
                                <div className="mt-2">
                                    <div className=" border border-gray-900 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <span className=" text-2xl flex select-none items-center pl-3 text-gray-500 ">$</span>
                                    <input
                                        type="number"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 text-2xl placeholder:text-gray-400 focus:ring-0  sm:leading-6"

                                    />
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="city" className="block text-2xl font-medium leading-6 text-gray-900">
                                    Categoria
                                </label>
                                <div className="mt-2">
                                    <select
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                                    >
                                    <option value={1}>Platillo</option>
                                    <option value={2}>Bebida</option>
                                    <option value={3}>Postre</option>
                                    </select>
                                </div>
                            </div>
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

export default FormProducto;