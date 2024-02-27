import React from 'react';
import platillo from '../home/img/foto2.png'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlatillosHome from './PlatillosDelInicio';
import '../estilos.css';

import Pinterest from '../Pinteres'
const Home = () => {
  
  return (
   <div className='transition-screen active'>
   <section className='home'>
      <div className='container flex'>
         <div className='left '>
            <h1>BROCHETA DE CAMARON
            </h1>
            <div className='socialIcon'>
               <i className='fab fa-facebook-f facebook'></i>
               <i className='fab fa-instagram instagram'></i>
               <i className='fab fa-twitter twitter'></i>
            </div><br/>
            <p>¡Disfruta de estas brochetas de camarón a la parrilla con la frescura y el sabor tropical de la salsa de mango y aguacate! Puedes decorar con hojas de cilantro adicionales y rodajas de limón para dar un toque final.</p>
            <button className='btn btn-warning espacio'>ORDENAR</button><button className='btn btn-outline-warning'>Registrarse</button>
         </div>
         <div className='rigth'>
            <div className='img'>
                  <img src={platillo}/>
            </div>
         </div>
      </div>
   </section>
   <PlatillosHome/>
   <Pinterest/>
   </div>
  );
};

export default Home;
