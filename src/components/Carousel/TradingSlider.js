import React, { useEffect, useRef, useState } from 'react'
import '../Carousel/css/TradingSlider.css'
import imagen from '../home/img/brocheta.jpg';
import imagen2 from '../home/img/ham2.jpg';
import imagen3 from '../home/img/platillo.jpg';
import imagen4 from '../home/img/ceviche.jpg';
import imagen5 from '../home/img/cotel.jpg';
import imagen6 from '../home/img/pescado.jpeg';
function TrandingSlider() {
    
  useEffect(() => {
    const script = document.createElement('script');
    script.src = './script.js'; // Reemplaza '/path/to/script.js' con la ruta real de tu archivo JavaScript
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

    return (
      <section id="tranding " className='color  pt-40 h-screen'>
       
      <div className="container ">
        <div className="swiper tranding-slider">
          <div className="swiper-wrapper">

            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen} alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$20</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Special Pizza
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>

            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen3}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$20</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Meat Ball
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen2}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$40</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Burger
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen3}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$15</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Frish Curry
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen4}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$15</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Pane Cake
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen5}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$20</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Vanilla cake
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
         
            <div className="swiper-slide tranding-slide">
              <div className="tranding-slide-img">
                <img src={imagen6}  alt="Tranding"/>
              </div>
              <div className="tranding-slide-content">
                <h1 className="food-price">$8</h1>
                <div className="tranding-slide-content-bottom">
                  <h2 className="food-name">
                    Straw Cake
                  </h2>
                  <h3 className="food-rating">
                    <span>4.5</span>
                    <div className="rating">
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                      <ion-icon name="star"></ion-icon>
                    </div>
                  </h3>
                </div>
              </div>
            </div>
        
          </div>

          <div className="tranding-slider-control">
            <div className="swiper-button-prev slider-arrow">
              <ion-icon name="arrow-back-outline"></ion-icon>
            </div>
            <div className="swiper-button-next slider-arrow">
              <ion-icon name="arrow-forward-outline"></ion-icon>
            </div>
            <div className="swiper-pagination"></div>
          </div>

        </div>
      </div>
    </section>
    );
}

export default TrandingSlider;