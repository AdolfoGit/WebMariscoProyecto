import React from 'react';
import  './css/404.css'
import { Link } from 'react-router-dom';

const ListaUsuarios = () => {
  return (
    <section className="page_404">
<<<<<<< HEAD
   
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
=======
      <div class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{width:'280px'}}>
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <span class="fs-4">Sidebar</span>
    </a>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Dashboard
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Orders
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Products
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          Customers
        </a>
      </li>
    </ul>
    <div class="dropdown">
      <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
        <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"></img>
        <strong>mdo</strong>
      </a>
      <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
>>>>>>> c46d286a8d28333ba802015fc188b343ac459f19
    </section>
  );
};

export default ListaUsuarios;