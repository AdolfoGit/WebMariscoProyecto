import React, { useEffect, useState } from 'react';
import { Typography } from '@material-tailwind/react';


const Ofertas = () => {
  const [promocionesData, setPromociones] = useState([]);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const hoy = new Date();
const proximas = new Date();
proximas.setDate(hoy.getDate() + 7);

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
    <div className="container mx-auto px-4">
    <Typography variant="h2" color="blue-gray" className="mb-8 text-center text-4xl font-semibold">
      Promociones
    </Typography>

    
  
    <div className="flex flex-col justify-center lg:flex-row gap-6">
      {/* Columna de Promociones Nuevas y Más Relevantes */}
      <div className="flex-1 space-y-8">

         {/* Sección de Nuevas Promociones */}
         <div>
          <Typography variant="h3" color="green-600" className="mb-4 text-2xl font-semibold">
            Nuevas
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promocionesData && promocionesData
              .filter(promocion => new Date(promocion.FechaDeFin) > proximas)
              .map((promocion) => (
                <div className="relative border border-green-600 rounded-lg shadow-lg overflow-hidden" key={promocion.idPromocion}>
                  <figure className="h-60 w-full">
                    <img className="h-full w-full object-cover" src={promocion.Imagen} alt={promocion.Nombre} />
                    <figcaption className="absolute bottom-0 w-full bg-green-600 bg-opacity-75 text-white p-2 text-sm">
                      <Typography variant="h6" color="white" className="font-semibold">{promocion.Nombre}</Typography>
                      <Typography color="white" className="text-xs">{promocion.Descripcion}</Typography>
                      <Typography className="mt-1 text-xs">{`Termina el ${promocion.FechaDeFin.split('T')[0]}`}</Typography>
                      <Typography variant="h6" className="mt-1 font-bold">{promocion.Descuento}% OFF</Typography>
                    </figcaption>
                  </figure>
                </div>
              ))}
          </div>
        </div>
        {/* Sección de Promociones Más Relevantes */}
        <div>
          <Typography variant="h3" color="red-600" className="mb-4 text-2xl font-semibold">
            Más Relevantes
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {promocionesData && promocionesData
              .filter(promocion => new Date(promocion.FechaDeFin) >= hoy && new Date(promocion.FechaDeFin) <= proximas)
              .map((promocion) => (
                <div className="relative border border-red-600 rounded-lg shadow-lg overflow-hidden" key={promocion.idPromocion}>
                  <figure className="h-60 w-full">
                    <img className="h-full w-full object-cover" src={promocion.Imagen} alt={promocion.Nombre} />
                    <figcaption className="absolute bottom-0 w-full bg-red-600 bg-opacity-75 text-white p-2 text-sm">
                      <Typography variant="h6" color="white" className="font-semibold">{promocion.Nombre}</Typography>
                      <Typography color="white" className="text-xs">{promocion.Descripcion}</Typography>
                      <Typography className="mt-1 text-xs">{`Termina el ${promocion.FechaDeFin.split('T')[0]}`}</Typography>
                      <Typography variant="h6" className="mt-1 font-bold">{promocion.Descuento}% OFF</Typography>
                    </figcaption>
                  </figure>
                </div>
              ))}
          </div>
        </div>
  
       
      </div>
  
      {/* Columna de Promociones Ya Pasadas */}
      <div className="flex-1">
        <Typography variant="h3" color="gray" className="mb-4 text-2xl font-semibold">
          Ya Pasaron
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {promocionesData && promocionesData
            .filter(promocion => new Date(promocion.FechaDeFin) < hoy)
            .map((promocion) => (
              <div className="relative border border-gray-400 rounded-lg shadow-lg opacity-75 overflow-hidden" key={promocion.idPromocion}>
                <figure className="h-60 w-full">
                  <img className="h-full w-full object-cover grayscale" src={promocion.Imagen} alt={promocion.Nombre} />
                  <figcaption className="absolute bottom-0 w-full bg-gray-600 bg-opacity-75 text-white p-2 text-sm">
                    <Typography variant="h6" color="white" className="font-semibold">{promocion.Nombre}</Typography>
                    <Typography color="white" className="text-xs">{promocion.Descripcion}</Typography>
                    <Typography className="mt-1 text-xs">{`Terminó el ${promocion.FechaDeFin.split('T')[0]}`}</Typography>
                    <Typography variant="h6" className="mt-1 font-bold">{promocion.Descuento}% OFF</Typography>
                  </figcaption>
                </figure>
              </div>
            ))}
        </div>
      </div>
    </div>
  </div>
  
  
  
  
  );
};

export default Ofertas;
