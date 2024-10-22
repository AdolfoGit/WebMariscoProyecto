import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './css/Detail.css';
import ImageMagnifier from './ImageMagnifier';

import Swal from 'sweetalert2';

const DetailsProduct = () => {
  const location = useLocation();
  const idProducto = location.state?.idProducto; // Obtener idProducto del estado de navegación
  const apiUrl = "https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/TraerProductoPorId";
  
  const [product, setProductData] = useState(null); // Estado inicial como null para manejar el estado de carga
  const [loading, setLoading] = useState(true); // Estado de carga



  const fetchProductData = async () => {
    setLoading(true); // Iniciar carga
    try {
      const dat = new FormData()
      dat.append("idProducto",idProducto)
      const response = await fetch(`${apiUrl}?idProducto=${idProducto}`, {
        method: 'POST',
        body: dat,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setProductData(data);
      } else {
        console.error('Error al obtener datos del producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del producto:', error);
    } finally {
      setLoading(false); // Finalizar carga
    }
  };

  useEffect(() => {
    if (idProducto) {
      fetchProductData();
    }
  }, [idProducto]);

  if (loading) {
    let timerInterval;
    Swal.fire({
      title: "Cargando!",
      html: "Cargando producto en <b></b> milliseconds.",
      timer: 1000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const timer = Swal.getPopup().querySelector("b");
        timerInterval = setInterval(() => {
          timer.textContent = `${Swal.getTimerLeft()}`;
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
      }

  if (!product) {
    return <div>Producto no encontrado</div>; // Mostrar mensaje si no se encuentra el producto
  }

  return (
    <div className="" style={{ display: 'flex', gap: '1000px', marginLeft:'20%' }}>
    <div className="details" key={product.idProducto}>
      <div className="big-img" style={{ marginRight: '10px' }}>
        <ImageMagnifier imageUrl={product.Imagen} />
      </div>
  
      <div className="box">
        <div className="row">
          <h2 >{product.Nombre}</h2>
          <span>${product.Precio}</span>
        </div>
  
        <p>{product.Descripcion}</p>
        </div>
    </div>
  </div>
  
  );
};

export default DetailsProduct;
