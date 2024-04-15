import React, { useEffect, useState } from "react";
import Vision from "../home/img/Vision.jpg";

const links = [
  { name: "Open roles", href: "#" },
  { name: "Internship program", href: "#" },
  { name: "Our values", href: "#" },
  { name: "Meet our leadership", href: "#" },
];
const stats = [
  { name: "Equipo de cocina", value: "20" },
  { name: "Meseros", value: "+50" },
  { name: "Mesas", value: "15" },
  { name: "Variedad de Plarillos", value: "+200" },
];

export default function Mision() {
  const [reservacionesData, setReservacionesData] = useState(null);
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
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-30">
      <img
        src={Vision}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right lg:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Misión
          </h2>
          {reservacionesData && (
            <p className="mt-6 text-xl leading-8 text-gray-300">
              {reservacionesData.Mision}
            </p>
          )}
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-xl leading-7 text-gray-300">{stat.name}</dt>
                <dd className="text-4xl font-bold leading-9 tracking-tight text-white">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-10">
            Visión
          </h2>
          {reservacionesData && (
            <p className="mt-6 text-xl leading-8 text-gray-300">
              {reservacionesData.Vision}
            </p>
          )}
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-10">
            Horario
          </h2>
          {reservacionesData && (
            <p className="mt-6 text-4xl leading-8 text-gray-300">
              {reservacionesData.Horario}
            </p>
          )}
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-10">
            Telefono
          </h2>
          {reservacionesData && (
            <p className="mt-6 text-4xl leading-8 text-gray-300">
              {reservacionesData.Telefono}
            </p>
          )}
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mt-10">
            Dirección
          </h2>
          {reservacionesData && (
            <p className="mt-6 text-4xl leading-8 text-gray-300">
              {reservacionesData.Direccion}
            </p>
          )}
        </div>
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
            {links.map((link) => (
              <a key={link.name} href={link.href}>
                {link.name} <span aria-hidden="true">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
