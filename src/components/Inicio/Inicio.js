import React from 'react';
import platillo from '../home/img/foto2.png'
import fondo from '../home/img/fondo2.jpg'
import '../estilos.css';
import { BookingCard } from './PostPlatillos';
import Example from './Example'
import PromoSecciones from './PromoSecciones';
import { 
   Button,
 } from '@material-tailwind/react';

const Home = () => {

  return (
   <div className='transition-screen active'>
         <div className='absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat' style={{ backgroundImage: `url(${fondo})`, boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.6)' }}>
         {/* Capa de fondo que cubre todo */}
         </div>
        <section className='home'>
          <div className='container flex pl-20 pr-20'>
            <div className='left'>
              <h1>BROCHETA DE <span className="text-white">CAMARÓN</span></h1>
              <div className='socialIcon'>
                <i className='fab fa-facebook-f facebook'></i>
                <i className='fab fa-instagram instagram'></i>
                <i className='fab fa-twitter twitter'></i>
              </div>
              <br />
              <p className='text-white'>¡Disfruta de estas brochetas de camarón a la parrilla con la frescura y el sabor tropical de la salsa de mango y aguacate! Puedes decorar con hojas de cilantro adicionales y rodajas de limón para dar un toque final.</p>
              <Button color='green' className='text-xl'>Explora nuestros platillos</Button>
              <Button color='white' variant='text' className='ml-5 text-xl'>Ordenar ya!</Button>
            </div>
            <div className='right'>
              <div className='animate z-10'>
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
