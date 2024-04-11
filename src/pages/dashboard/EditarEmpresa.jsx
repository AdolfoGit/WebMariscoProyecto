import React, { useEffect, useState} from 'react';
import {
  Card,
  CardBody,
  Button,
  Spinner,
} from "@material-tailwind/react";
import Swal from 'sweetalert2';
import { useNavigate, useLocation} from 'react-router-dom';


export function EditarEmpresa(){
    
    const [empresaData, setEmpresaData] = useState(null);
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
            setMision(data.Mision);
            setVision(data.Vision);
            setDireccion(data.Direccion)
            setTelefono(data.Telefono);
            setHorario(data.Horario)
          } else {
            console.error('Error al obtener datos de los usuarios:', response.statusText);
          }
        } catch (error) {
          console.error('Error al obtener datos del usuario:', error);
        }
      };

    const navigate=useNavigate();
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const [mision,setMision]=useState();
    const [vision,setVision]=useState();
    const [direccion,setDireccion]=useState();
    const [telefono,setTelefono]=useState();
    const [Horario,setHorario]=useState();
      
       const handleSubmit = async (e)=>{
        
        e.preventDefault();


        
        const data =new FormData();
        data.append("Mision", mision);
        data.append("Vision",vision)
        data.append("Direccion",direccion);
        data.append("Telefono",telefono);
        data.append("Horario",Horario);
        

        fetch(
            apiurll + "api/CasaDelMarisco/EditarDatosEmpresa?Mision=" + mision + "&Vision=" + vision+ "&Direccion=" + direccion + "&Telefono=" + telefono + "&Horario=" + Horario,
            {
                method: "POST",
                body: data,
            }
        )
        .then((res) => res.json())
        .then((result) => {
            if (result === 'Editado!') {
                Swal.fire({
                    icon: 'success',
                    title: 'Registro Actualizado',
                    text: 'Realizado con exito',
                });
                navigate('/dashboard/empresa')
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
        <div className='mt-8'>
            <Card>
                <CardBody>
                <form className='p-20' onSubmit={handleSubmit} >
                    <div className="space-y-12">
                        <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-md font-bold leading-9 text-gray-900">Ingrese los nuevos datos</h2>            
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        
                            <div className="sm:col-span-4 sm:col-start-1">
                            <label  className="block text-2xl font-medium leading-6 text-gray-900">
                                Direccion
                            </label>
                            <div className="mt-2">
                                <input
                                value={direccion}  
                                onChange={(e)=> setDireccion(e.target.value)}
                                className="text-2xl block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                                />
                            </div>
                            </div>

                            <div className="col-span-full">
                            <label htmlFor="about" className="block text-2xl font-medium leading-6 text-gray-900">
                                Mision
                            </label>
                            <div className="mt-2">
                                <textarea
                                value={mision}
                                onChange={(e)=> setMision(e.target.value)}
                                rows={4}
                                className="block w-full rounded-md border border-gray-900  py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-8"
                            
                                />
                            </div>
                            
                            </div>

                            <div className="col-span-full">
                            <label htmlFor="about" className="block text-2xl font-medium leading-6 text-gray-900">
                                Vision
                            </label>
                            <div className="mt-2">
                                <textarea
                                value={vision}
                                onChange={(e)=>setVision(e.target.value)}
                                rows={5 }
                                className="block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 text-2xl shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-8"
                    
                                />
                            </div>
                           
                            </div>

                            <div className='col-span-3 flex'>
                                <div>
                                    <label className="block text-2xl font-medium leading-6 text-gray-900">Telefono</label>
                                    <input className='col-span-3'
                                    value={telefono}
                                    onChange={(e)=> setTelefono(e.target.value)}
                                    className="text-2xl block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6"
                                    >

                                    </input>
                                </div>
                                <div> 
                                    <label className="block text-2xl font-medium leading-6 text-gray-900">Horario</label>
                                    <input className='col-span-3'
                                    value={Horario}
                                    onChange={(e)=>setHorario(e.target.value)}
                                    className="text-2xl block w-full rounded-md border border-gray-900 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:leading-6">
                                    
                                    </input>
                                </div>
                            </div>
                        
                        </div>
                        </div>

                  
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                        <Button color='red' variant='field' size='lg' onClick={()=> navigate('/dashboard/empresa')} >Cancelar</Button>
                        <Button variant='field' color='green' size='lg' type='submit'>Actualizar Registro</Button>
                    
                    </div>
                </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default EditarEmpresa;