import React from 'react';
import  './css/404.css'
import { Link } from 'react-router-dom';
const ListaUsuarios = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row"> 
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">En construcción</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">Este contenido está siendo trabajado poco a poco</h3>
                <p className='p2'>¿Desea volver al inicio?</p>
                <Link to="/" className="link_404">Volver al inicio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListaUsuarios;