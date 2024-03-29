import React from 'react';
import  './css/404.css'
import { Link } from 'react-router-dom';
const NotFoundPage = () => {
  return (
    <section className="page_404">
      <div className="container">
        <div className="row"> 
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg">
                <h1 className="text-center">Error 404</h1>
              </div>
              <div className="contant_box_404">
                <h3 className="h2">No encontramos la pagina que esta buscando</h3>
                <p className='p2'>¿Porque no vamos a otra pagina mejor? </p>
                <Link to="/" className="link_404">Volver al inicio</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;