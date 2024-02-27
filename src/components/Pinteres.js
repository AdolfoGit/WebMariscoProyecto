import React from 'react';
import imageen from './home/img/platillo.jpg';
import imageen2 from './home/img/hamburguesa.jpg';
import imageen4 from './home/img/ceviche.jpg';
import './estilos.css';
function Pinterest() {
  return (
    <div className='container-fluid text-center mt-4 transition-screen active'>
      <h1 className='mb-4' >Otros platillos</h1>
      <div className='container-fluid mb-5' style={{ maxWidth: '100%', margin: 'auto', overflow: 'hidden' }}>
        <div
          id="carouselExampleInterval"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ position: 'relative', height: '600px' }}
        >
          <div className="carousel-inner" style={{ borderRadius: '10px', overflow: 'hidden', height: '100%' }}>
            <div className="carousel-item active" data-bs-interval="10000">
              <img
                src={imageen2}
                className="d-block w-100"
                alt="Hamburguesa"
                style={{ objectFit: 'cover', height: '100%',filter: 'brightness(50%)' }}
              />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src={imageen}
                className="d-block w-100"
                alt="Platillo"
                style={{ objectFit: 'cover', height: '100%', filter: 'brightness(50%)' }}
              />
            </div>
            <div className="carousel-item">
              <img
                src={imageen4}
                className="d-block w-100"
                alt="Ceviche"
                style={{ objectFit: 'cover', height: '100%', filter: 'brightness(50%)' }}
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pinterest;
