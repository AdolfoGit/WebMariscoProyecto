import Header from '../home/header/Header';
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
      <div className=" p-2 relative overflow-hidden bg-[]">
        <div className="pb-80 pt-16 ">
          <div className="relative mx-auto max-w-7xl px-2 sm:static sm:px-6 lg:px-8">
            <div className="mr-20 lg:max-w-xl ">
              <h1 className="text-8xl font-bold tracking-tight text-green-500">
               <span className='text-orange-300'>Diversidad de</span> <span className='text-blue-400'>Actividades</span> !Unetenos!
              </h1>
              
              <p className="mt-4 text-2xl text-black  font-bold">
                En la Casa del Marisco, hay gran diversidad de actividades, no solo somos un lugar para que puedas venir a degustar nuestros platillos, somos mas que eso.
              </p>
              <Button variant='filled' color='blue' className='text-xl mt-5'>Explorar</Button>
            </div>
            <div>
              <div className="mt-10 ">
                {/* Decorative image grid */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
                >
                  <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                    <div className="flex items-center space-x-6 lg:space-x-8">
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                        <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
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
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
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
                      <div className="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
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
  