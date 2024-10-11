
import platillo from '../home/img/promocion.png'
import platillo2 from '../home/img/platillo.png'
import platillo3 from '../home/img/platillo2.png'
import platillo4 from '../home/img/platillo3.png'
import "./css/platillos.css"

export function BookingCard() {
  return (
    <div className='min-h-screen lg:h-full color flex justify-center items-center'>
      <div>
        <h3 className="pt-10 text-6xl text-center font-bold tracking-tight text-gray-900 mt-10">
          Mejores <span className='text-orange-600'>platillos</span> de la Casa
        </h3>
        <div class=" flex flex-col gap-24 lg:gap-0 lg:flex-row items-center justify-center space-x-14 p-40 ">
          <div class="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-10 pl-10 pb-10 shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo} alt="Noodles Three" class="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div class="pt-40 text-start">
              <div class="flex justify-start items-center mt-4 mb-2">
                <span class="text-yellow-500 text-xl font-bold">8.1</span>
                <span class="ml-1 text-gray-600">★</span>
              </div>
              <h2 class="text-lg font-bold mb-1">Noodles Three</h2>
              <p class="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div class="mt-4 text-xl font-semibold">12$</div>
            </div>
          </div>

          <div class="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-10 pl-10 pb-10 shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo2} alt="Noodles Three" class="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div class="pt-40 text-start">
              <div class="flex justify-start items-center mt-4 mb-2">
                <span class="text-yellow-500 text-xl font-bold">8.1</span>
                <span class="ml-1 text-gray-600">★</span>
              </div>
              <h2 class="text-lg font-bold mb-1">Noodles Three</h2>
              <p class="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div class="mt-4 text-xl font-semibold">12$</div>
            </div>
          </div>


          <div class="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-10 pl-10 pb-10 shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo3} alt="Noodles Three" class="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div class="pt-40 text-start">
              <div class="flex justify-start items-center mt-4 mb-2">
                <span class="text-yellow-500 text-xl font-bold">8.1</span>
                <span class="ml-1 text-gray-600">★</span>
              </div>
              <h2 class="text-lg font-bold mb-1">Noodles Three</h2>
              <p class="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div class="mt-4 text-xl font-semibold">12$</div>
            </div>
          </div>


          <div class="rounded-t-[30px] rounded-b-[15px] bg-gray-100 bg-opacity-75 pr-10 pl-10 pb-10 shadow-lg flex flex-col items-center w-[180px]  relative transition-transform hover:scale-105">
            <img src={platillo4} alt="Noodles Three" class="w-[150px] h-[150px] drop-shadow-xl object-cover absolute -top-[50px] z-10" />

            <div class="pt-40 text-start">
              <div class="flex justify-start items-center mt-4 mb-2">
                <span class="text-yellow-500 text-xl font-bold">8.1</span>
                <span class="ml-1 text-gray-600">★</span>
              </div>
              <h2 class="text-lg font-bold mb-1">Noodles Three</h2>
              <p class="text-gray-500 text-sm">White plate with dried shrimpsksnldn sdknl nsiko</p>
              <div class="mt-4 text-xl font-semibold">12$</div>
            </div>
          </div>



        </div>
      </div>
    </div>

  );
}