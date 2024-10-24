import React from 'react'
import img1 from'../home/img/actividad.jpg';
import img2 from'../home/img/actividad2.jpg';
import img3 from'../home/img/Actividad3.jpg';
import img4 from'../home/img/actividad4.jpg';
import img5 from'../home/img/actividad5.jpg';
import img6 from'../home/img/actividad6.jpg';
import img7 from'../home/img/actividad7.jpg';
import { Button } from '@material-tailwind/react';
export default function PromoSecciones() {
    return (
      <div className=" pr-[45px] pl-[45px] lg:pl-10 lg:pr-10 relative overflow-hidden ">
        <div className="h-screen pb-80 pt-10 lg:h-full lg:pb-80 lg:pt-40 ">
          <div className="relative mx-auto max-w-7xl px-2 sm:static sm:px-2 lg:px-2">
            <div className="sm:max-w-lg lg:max-w-xl ">
              <h1 className="text-4xl lg:text-7xl font-bold tracking-tight text-black-200">
               <span className='text-black-200'>Diversidad de</span> <span className='text-orange-400'>Actividades</span> !Unetenos!
              </h1>
              
              <p className="mt-4 text-md text-black  font-bold">
                En la Casa del Marisco, hay gran diversidad de actividades, no solo somos un lugar para que puedas venir a degustar nuestros platillos, somos mas que eso.
              </p>
              <Button variant='filled' color='orange' size='sm' className='text-md mt-2'>Explorar</Button>
            </div>
            <div>
              <div className="mt-10 ">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex  items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-2 lg:gap-y-2">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 sm:w-44">
                          <img
                            src={img1}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={img2}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-2 lg:gap-y-2">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={img3}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={img4}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={img5}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-2 lg:gap-y-2">
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={img6}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="h-64 w-44 overflow-hidden rounded-lg">
                          <img
                            src={img7}
                            alt=""
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  