import React, { useEffect, useState } from "react";
import Vision from "./vision.png"
import "./css/nosotros.css"


export default function Mision() {
  const [ setReservacionesData] = useState(null);
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const DatosEmpresa = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerDatosEmpresa`,
        {
          method: "GET",
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const reservaciones = await response.json();
        setReservacionesData(reservaciones);
        console.log(reservaciones);
      } else {
        console.error(
          "Error al obtener datos de los usuarios:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    }
  };
  useEffect(() => {
    DatosEmpresa();
  }, []);
  return (
    <div className="mt-5 h-full lg:h-screen flex flex-col lg:flex-row items-center justify-center bg-white p-40  pt-0 mt-0">
      {/* Imagen del aventurero */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative">
          <img src={Vision} alt="Adventurer" className="degrade drop-shadow-[0_45px_45px_rgba(0,0,0,0.35)] w-full lg:w-4/4 object-cover z-10  relative" />
          <div className="no absolute inset-0 bg-orange-200 rounded-full w-96 h-96 transform -translate-x-5 -translate-y-5 "></div>
        </div>
      </div>

      {/* Sección de texto y estadísticas */}
      <div className="w-full lg:w-1/2  flex flex-col  justify-center lg:pl-16 text-center lg:text-left">
        {/* Título */}
        <h2 className="text-6xl font-black text-gray-800 mb-4">
          <span className="text-orange-500"> Conoce</span> nuestra <span className="text-orange-500">vision</span> unetenos
        </h2>

        {/* Descripción */}
        <p className="text-xl text-left text-gray-600 leading-loose mb-6">
          Nuestra misión es superar las expectativas de los comensales, honrar la riqueza del océano y ser un lugar donde la comida, la familia y la amistad se fusionen en una experiencia inolvidable. A medida que crecemos, seguimos siendo un referente culinario que inspira a todos a disfrutar del marisco con respeto y pasión
        </p>

        <p className="text-xl text-left text-gray-600 leading-loose mb-6">
          En La Casa del Marisco, nuestra visión es convertirnos en un lugar íntimo y acogedor para los amantes de los sabores marinos en nuestra comunidad. Nos esforzamos por ser reconocidos como el rincón favorito de aquellos que buscan la frescura y la autenticidad en cada bocado.
        </p>

        <p className="text-xl text-gray-600 leading-loose mb-6">
          Como una pequeña empresa, aspiramos a ser un tesoro culinario local, donde la pasión por el marisco se combina con la calidez de un ambiente familiar.
        </p>
        {/* Estadísticas */}
        <div className="flex justify-center lg:justify-center space-x-6 mt-4">
          <div className="text-center shadow-lg rounded-xl  p-4">
            <h3 className="text-3xl font-bold text-orange-500">12K+</h3>
            <p className="text-gray-500">Success Journey</p>
          </div>
          <div className="text-center shadow-lg rounded-xl  p-4">
            <h3 className="text-3xl font-bold text-orange-500">16+</h3>
            <p className="text-gray-500">Awards Winning</p>
          </div>
          <div className="text-center shadow-lg rounded-xl  p-4">
            <h3 className="text-3xl font-bold text-orange-500">20+</h3>
            <p className="text-gray-500">Years Of Experience</p>
          </div>
        </div>
      </div>
    </div>

  );
}
