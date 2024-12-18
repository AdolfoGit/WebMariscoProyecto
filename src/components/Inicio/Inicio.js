import React from 'react';
import platillo from '../home/img/foto2.png'
import fondo from '../home/img/fondo2.jpg'
import '../estilos.css';
import { BookingCard } from './PostPlatillos';
import Example from './Example'
import PromoSecciones from './PromoSecciones';
import { useNavigate } from 'react-router-dom';
import { 
   Button,
 } from '@material-tailwind/react';

const Home = () => {

  const nav = useNavigate();

  return (
   <div className='transition-screen active'>
         <div className='absolute top-0 left-0 w-full h-screen lg:h-full bg-cover bg-no-repeat' style={{ backgroundImage: `url(${fondo})`, boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.6)' }}>
         </div>
        <section className='home ' >
          <div className='container flex pl-4 pr-4 lg:pl-10 lg:pr-10'>
            <div className='left'>
              <h1>BROCHETA DE <span className="text-white">CAMARÓN</span></h1>
              <div className='socialIcon'>
                <i className='fab fa-facebook-f facebook'></i>
                <i className='fab fa-instagram instagram'></i>
                <i className='fab fa-twitter twitter'></i>
              </div>
              <br />
              <p className='text-white'>¡Disfruta de estas brochetas de camarón a la parrilla con la frescura y el sabor tropical de la salsa de mango y aguacate! Puedes decorar con hojas de cilantro adicionales y rodajas de limón para dar un toque final de explosión.</p>
              <div className='flex justify-start '>
                <Button color='green' size='sm' className='text-sm' onClick={()=>nav('/productos')}>Explorar platillos</Button>
                <Button color='white' size='sm' variant='outlined' className='ml-2 text-sm' onClick={()=>nav('/productos')}>Ordenar ya!</Button>
              </div>
            </div>
            <div className='right flex justify-center items-center'>
              <div className='animate z-10  '>
                <img src={platillo} alt="Brocheta de camarón" />
              </div>
            </div>
          </div>
        </section>
      <PromoSecciones />
      <BookingCard />
      <Example />
    </div>
  );
};

export default Home;
