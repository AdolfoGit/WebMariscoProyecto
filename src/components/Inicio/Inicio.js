import React, { useState } from 'react';
import platillo from '../home/img/foto2.png'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import PlatillosHome from './PlatillosDelInicio';
import '../estilos.css';
   import { uploadFilesUsuarios, uploadFilesProductos } from '../../firebase/firebase';
import Pinterest from '../Pinteres'
import TrandingSlider from '../Carousel/TradingSlider';
import Ayuda from '../Empresa/Ayuda';
import Example from './Example'
import PromoSecciones from './PromoSecciones';
const Home = () => {
  
   // const [File, setFile] =useState(null);

   // const handleSubmit = async (e) =>{
   //    e.preventDefault();  
   //    const result = await uploadFilesUsuarios(File);
   //    console.log(result);
   // }
   // const handleSubmit2 = async (e) =>{
   //    e.preventDefault();  
   //    const result = await uploadFilesUsuarios(File);
   //    console.log(result);
   // }

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
            <button className='inline-block rounded-md border border-transparent bg-blue-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700 espacio'>ORDENAR</button>
            <button className='inline-block rounded-md border border-transparent bg-blue-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700'>Registrarse</button>
         </div>
         <div className='rigth'>
            <div className='img'>
                  <img src={platillo}/>
            </div>
         </div>
      </div>
   </section>
   <PlatillosHome/>
   <TrandingSlider/>
   <PromoSecciones/>
   <Example/>
{/* 
   <form onSubmit={handleSubmit}>
   <input type='file' accept='image/*' onChange={e => setFile(e.target.files[0])} />
  <button type='submit'> Subir</button>
</form>

<form onSubmit={handleSubmit2}>
<input type='file' accept='image/*' onChange={e => setFile(e.target.files[0])} />
  <button type='submit'> Subir</button>
</form> */}

      </div>
   
   
  );
};

export default Home;
