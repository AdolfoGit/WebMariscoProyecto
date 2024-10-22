import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';


const Ofertas = () => {
  const [promocionesData, setPromociones] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  useEffect(() => {
    obtenerPromociones();
  }, []); // Se ejecuta solo una vez al montar el componente
// Se ej

const obtenerPromociones = async () => {
  try {
    const response = await fetch(
      `${apiurll}/api/CasaDelMarisco/TraerPromociones`,
      {
        method: 'GET',
        // No es necesario incluir el body para una solicitud GET
      }
    );

    if (response.ok) {
      const promociones = await response.json();
      setPromociones(promociones);
      console.log(promociones)
    } else {
      console.error('Error al obtener datos de las ofertas:', response.statusText);
    }
  } catch (error) {
    console.error('Error al obtener datos de las ofertas:', error);
  }
};


  return (
    
    <div className='container'>
       <Typography variant="h2" color="blue-gray" className="mb-2 text-center text-4xl">
          Promociones
        </Typography>
     <div className='container d-flex'>

      {promocionesData !== null && promocionesData.map((promocion) =>(
         <div className='flex'>

         <figure className="relative h-96 w-90">
       <img
         className="h-full w-full rounded-xl object-cover object-center"
         src={promocion.Imagen}
         alt="nature image"
       />
       <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
         <div>
           <Typography variant="h5" color="blue-gray">
            {promocion.Nombre}
           </Typography>
           <Typography variant="h6" color="blue-gray">
            {promocion.Descripcion}
           </Typography>
           <Typography color="gray" className="mt-2 font-normal">
           {`Termina el ${promocion.FechaDeFin.split('T')[0]}`}
           </Typography>
         </div>
         <Typography variant="h5" color="blue-gray">
           {promocion.Descuento}%
         </Typography>
       </figcaption>
         </figure>
       
 
       </div>
      ))}
     </div>
     

    </div>
  );
};

export default Ofertas;
