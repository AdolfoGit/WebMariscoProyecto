import React, { useEffect, useState } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
import ofertaImagen1 from '../home/img/bebida.jpg';
import { Typography } from '@material-tailwind/react';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '200px',  
}));

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
    <div className='flex '>
      <div>

        <figure className="relative h-96 w-90">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="nature image"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            Sara Lamalo
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
            20 July 2022
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          Growth
        </Typography>
      </figcaption>
        </figure>
      

      </div>
      <div>

        <figure className="relative h-96 w-90">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="nature image"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            Sara Lamalo
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
            20 July 2022
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          Growth
        </Typography>
      </figcaption>
        </figure>
      

      </div>
      <div>

        <figure className="relative h-96 w-90">
      <img
        className="h-full w-full rounded-xl object-cover object-center"
        src="https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
        alt="nature image"
      />
      <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
        <div>
          <Typography variant="h5" color="blue-gray">
            Sara Lamalo
          </Typography>
          <Typography color="gray" className="mt-2 font-normal">
            20 July 2022
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray">
          Growth
        </Typography>
      </figcaption>
        </figure>
      

      </div>
    </div>
  );
};

export default Ofertas;
