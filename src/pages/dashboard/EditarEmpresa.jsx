import React, { useEffect, useState} from 'react';
import {
  Card,
  Button,
  Spinner,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { useNavigate, useLocation} from 'react-router-dom';

import { PhotoIcon, } from '@heroicons/react/24/solid'
import { uploadFilesProductos } from "../../firebase/firebase";

export function EditarEmpresa(){
    const location = useLocation();
    const idProducto = location.state.idProducto;

    const navigate=useNavigate();
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
    const [result, setResult] = useState(null); 
  
    
    const traerProducto=()=>{
        const proData=new FormData();
        proData.append("idProducto",idProducto);

        fetch(
            apiurll + "api/CasaDelMarisco/TraerProductoPorID?idProducto=" +idProducto,
            {
                method: 'POST',
                body: proData,
            }
        ) .then((res) => res.json())
        .then((result) => {
            setResult(result);
            setNombre(result.Nombre);  
            setIngredientes(result.Ingredientes);       
            setDescripcion(result.Descripcion);
            setPrecio(result.Precio);
            setDisponibilidad(result.Disponibilidad);
            setCategoria(result.Categoria);
            setEstado(result.Estado);
            setImageURL(result.Imagen);
            
        })
        .catch((error) => {
            console.error('Error al realizar la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Erro al realizar la solicitud',
            });
        })
        .finally(() => {
            setIsLoading(false); // Marcar la carga como completada
        });
    }

    useEffect(() => {
        traerProducto();
      }, []);

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

        const resultImage2 = await uploadFilesProductos(File);
      
        
        const data =new FormData();
        data.append("idProducto", idProducto);
        data.append("Nombre",nombre)
        data.append("Ingredientes",ingredientes);
        data.append("Descripcion",descripcion);
        data.append("Precio",precio);
        data.append("Disponibilidad",disponibilidad);
        data.append("Categoria",categoria);
        data.append("Estado",estado);
        data.append("Imagen",imageURL===result.Imagen? imageURL:resultImage2);

        fetch(
            apiurll + "api/CasaDelMarisco/EditarEmpresa?idProducto=" + idProducto + "&Nombre=" + nombre+ "&Ingredientes=" + ingredientes + "&Descripcion=" + descripcion + "&Precio=" + precio + "&Disponibilidad=" + disponibilidad + "&Categoria=" + categoria + "&Estado=" + estado +
            "&Imagen=" + (imageURL===result.Imagen? imageURL:resultImage2),
            {
                method: "POST",
                body: data,
            }
        )
        .then((res) => res.json())
        .then((result) => {
            if (result === 'Editado!!') {
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
        <>
        {isLoading ? (<div className="flex justify-center items-center h-screen"><Spinner color='amber' className='h-20  w-20'/></div>):(
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
      
                
              </div>
      
              <div className="mt-6 flex items-center justify-end gap-x-6">
                  <Button color='red' variant='field' size='lg' onClick={()=> cancelarProceso()}>Cancelar</Button>
                  <Button variant='field' color='green' size='lg' type='submit'>Actualizar</Button>
                
              </div>
              </form>
            </Card>
        )}
        </>
    )
}

export default EditarEmpresa;