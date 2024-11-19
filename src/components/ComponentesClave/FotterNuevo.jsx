import React from "react";
import { FaFacebookF } from "react-icons/fa";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import logo from "../home/img/LogoVersion2.png";
import { Typography } from "@material-tailwind/react";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
function Footer() {
  const iconsTab = [
    { id: "facebook", icon: <FaFacebookF /> },
    { id: "twitter", icon: <AiOutlineTwitter /> },
    { id: "youtube", icon: <AiFillYoutube /> },
    { id: "instagram", icon: <AiFillInstagram /> },
  ];

  const nav = useNavigate();

  const { user } = useUser();
  return (
    <>
      {user && user.Rol === 2 ? (
        <></>
      ) : (
        <>
          <footer className="bg-gray-900 border-t h-full lg:h-full  ">
            <div className="container mx-auto  lg:px-0 pt-4 lg:pt-20 ">
              <div className="flex flex-col md:flex-row justify-between md:items-start text-left p-0 lg:p-5">
                <div className="flex flex-col w-full md:w-2/4 gap-4 lg:p-2">
                  <img src={logo} className="w-full md:w-[28rem]" alt="Logo" />
                  <Typography className="text-md font-normal text-gray-200 lg:pr-5 lg:pl-5">
                    Direccion 20 de Noviembre, Calle Comaltepec, 43000 Huejutla
                    de Reyes, Hidalgo.
                  </Typography>
                  <Typography className="text-md font-bold text-gray-400">
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://web-marisco-proyecto-2z3t.vercel.app/politicas"
                    >
                      Politicas de Privacidad |
                    </a>
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://web-marisco-proyecto-2z3t.vercel.app/terminos"
                    >
                      {" "}
                      Terminos y Condiciones
                    </a>
                  </Typography>
                </div>

                <div className="flex flex-col w-full md:w-1/4 gap-4">
                  <Typography className="text-2xl font-bold text-gray-100">
                    Contactanos
                  </Typography>
                  <span className="border-b-2 border-gray-400 w-28 h-2 "></span>
                  <Typography className="text-md text-gray-400 font-medium">
                    LaCasaDelMarisco@gmail.com
                  </Typography>
                  <Typography className="text-md text-gray-400 font-medium">
                    Telefono: +527898963578
                  </Typography>
                  <Typography
                    className="text-md text-gray-400 font-medium"
                    onClick={() => {
                      nav("/Nosotros");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Mision / Vision
                  </Typography>
                  <Typography
                    className="text-md text-gray-400 font-medium"
                    onClick={() => {
                      nav("/cookies");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    Politicas de Cookies
                  </Typography>
                </div>

                <div className="flex flex-col w-full md:w-1/4 gap-4">
                  <Typography className="text-2xl font-bold text-gray-100">
                    Horas de Trabajo
                  </Typography>
                  <span className="border-b-2 border-gray-400 w-28 h-2"></span>
                  <Typography className="text-md text-gray-400 font-bold">
                    Lunes - Sabado:
                  </Typography>
                  <Typography className="text-md text-gray-400 font-medium">
                    9:00am - 21:00pm
                  </Typography>
                  <Typography className="text-md text-gray-400 font-bold">
                    Domingo:
                  </Typography>
                  <Typography className="text-md text-gray-400 font-medium">
                    9:00am - 22:00pm
                  </Typography>
                </div>

                <div className="flex flex-col w-full md:w-1/4 gap-4">
                  <Typography className="text-2xl font-bold text-gray-100">
                    Siguenos en Redes
                  </Typography>
                  <span className="border-b-2 border-gray-400 w-28 h-2 mb-4"></span>
                  <div className="flex gap-4 text-2xl text-white">
                    <div className="flex gap-4 text-2xl text-white">
                      {iconsTab.map(({ id, icon }) => (
                        <div
                          key={id}
                          className="w-10 h-10 bg-black p-2 rounded-full hover:bg-blue-300 hover:text-black items-start"
                          style={{ transition: "all 0.3s" }}
                        >
                          {icon}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Typography className="text-md text-gray-400 font-medium hover:text-blue-300 cursor-pointer">
                    Preguntas Frecuentes
                  </Typography>
                </div>
              </div>
            </div>
            <div className="text-center bg-gray-900 text-gray-400 text-xl mt-5 pb-20">
              <span className="font-bold text-md">
                | © {new Date().getFullYear()} Appy. Todos los Derechos
                Reservados.
              </span>
            </div>
          </footer>
        </>
      )}
    </>
  );
}

export default Footer;
