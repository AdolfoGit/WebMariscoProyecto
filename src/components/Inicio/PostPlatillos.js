import React from 'react'
import platillo from '../home/img/promocion.png'
import platillo2 from '../home/img/platillo.png'
import platillo3 from '../home/img/platillo2.png'
import platillo4 from '../home/img/platillo3.png'
import "./css/platillos.css"

export function BookingCard() {
  return (
    <div className='min-h-screen pb-5 lg:pb-0 lg:h-full color flex justify-center items-center'>
      <div>
        <h3 className="mt-4  lg:mt-0 text-2xl lg:text-5xl text-center font-bold tracking-tight text-gray-900">
          Mejores <span className='text-orange-600'>platillos</span> de la Casa
        </h3>
        <div className=" flex flex-col items-center gap-14 lg:gap-0 lg:flex-row  justify-center space-x-2 lg:space-x-16 pl-20 pr-20 pt-[80px]">
          <div className="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-5 pl-5 pb-[10px] shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo} alt="Noodles Three" className="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div className="pt-20 text-start">
              <div className="flex justify-start items-center mt-4 mb-2">
                <span className="text-yellow-500 text-xl font-bold">8.1</span>
                <span className="ml-1 text-gray-600">★</span>
              </div>
              <h2 className="text-lg font-bold mb-1">Noodles Three</h2>
              <p className="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div className="mt-2 text-xl font-semibold">12$</div>
            </div>
          </div>

          <div className="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-5 pl-5 pb-[10px] shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo2} alt="Noodles Three" className="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div className="pt-20 text-start">
              <div className="flex justify-start items-center mt-4 mb-2">
                <span className="text-yellow-500 text-xl font-bold">8.1</span>
                <span className="ml-1 text-gray-600">★</span>
              </div>
              <h2 className="text-lg font-bold mb-1">Noodles Three</h2>
              <p className="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div className="mt-2 text-xl font-semibold">12$</div>
            </div>
          </div>


          <div className="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-5 pl-5 pb-[10px] shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo3} alt="Noodles Three" className="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div className="pt-20 text-start">
              <div className="flex justify-start items-center mt-4 mb-2">
                <span className="text-yellow-500 text-xl font-bold">8.1</span>
                <span className="ml-1 text-gray-600">★</span>
              </div>
              <h2 className="text-lg font-bold mb-1">Noodles Three</h2>
              <p className="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div className="mt-2 text-xl font-semibold">12$</div>
            </div>
          </div>


          <div className="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-5 pl-5 pb-[10px] shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo4} alt="Noodles Three" className="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div className="pt-20 text-start">
              <div className="flex justify-start items-center mt-4 mb-2">
                <span className="text-yellow-500 text-xl font-bold">8.1</span>
                <span className="ml-1 text-gray-600">★</span>
              </div>
              <h2 className="text-lg font-bold mb-1">Noodles Three</h2>
              <p className="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div className="mt-2 text-xl font-semibold">12$</div>
            </div>
          </div>



        </div>
      </div>
    </div>

  );
}