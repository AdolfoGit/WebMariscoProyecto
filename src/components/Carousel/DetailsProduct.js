import React, { useRef, useState, useEffect } from 'react';
import Colors from './Colors';
import DetailsThumb from './DetailsThumb';
import './Detail.css'

import imagen from '../home/img/hamburguesa2.jpg';
import imagen2 from '../home/img/hamburguesa.jpg';
import imagen3 from '../home/img/ham2.jpg';
import ImageMagnifier from './ImageMagnifier';

const DetailsProduct = () => {
  const [products, setProducts] = useState([
    {
      "_id": "1",
      "title": "Hamburguesas de Mariscos",
      "src": [
          imagen,
          imagen2,
          imagen3
        ],
      "description": "XSL,M, G, XG",
      "content": "La Hamburguesa de Mariscos es una innovadora delicia culinaria que combina la jugosidad de una hamburguesa con la exquisitez de diversos tipos de mariscos. Este manjar se distingue por su fusión de sabores marinos y su textura única, ofreciendo una experiencia gastronómica fuera de lo común",
      "price": 129,
      "colors":["Blue","black","Green","Red"],
      "count": 1
    }
  ]);
  const [index, setIndex] = useState(0);
  const myRef = useRef();

  const handleTab = index =>{
    setIndex(index);
    const images = myRef.current.children;
    for(let i=0; i<images.length; i++){
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  useEffect(() => {
    myRef.current.children[index].className = "active";
  }, [index]);

  return (
    <div className="app">
      {
        products.map(item =>(
          <div className="details" key={item._id}>
            <div className="big-img">
              <ImageMagnifier imageUrl={item.src[index]}/>
            </div>

            <div className="box">
              <div className="row">
                <h2>{item.title}</h2>
                <span>${item.price}</span>
              </div>
            

            
              <p>{item.content}</p>

              <DetailsThumb images={item.src} tab={handleTab} myRef={myRef} />
              <button className="cart">Comprar</button>

            </div>
            
          </div>
        ))
      }
    </div>
  );
};

export default DetailsProduct;