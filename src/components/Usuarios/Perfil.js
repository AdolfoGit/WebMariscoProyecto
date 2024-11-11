import React, { useState, useRef } from "react";
import { useUser } from "../../UserContext"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadFilesUsuarios } from "../../firebase/firebase";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import CryptoJS from 'crypto-js';


const Perfil = () => {

  const ENCRYPTION_KEY = 'Soymainekko1#';

  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const [setCameraActive] = useState(false); // Controla si la cámara está activa

  ///apartado de foto para pwa
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      } else {
        console.error("El elemento video no está disponible");
      }
    } catch (error) {
      console.error("Error al acceder a la cámara: ", error);
    }
  };

  const takePhoto = async () => {
    const video = videoRef.current;
    const photo = photoRef.current;
  
    if (!video || !photo) {
      console.error("No se pudo acceder al video o al canvas");
      return;
    }
  
    const context = photo.getContext("2d");
    const width = 250;
    const height = 200;
  
    if (context) {
      photo.width = width;
      photo.height = height;
      context.drawImage(video, 0, 0, width, height);
  
      // Convertir la imagen a Blob sin usar el constructor `File`
      const dataURL = photo.toDataURL("image/png");
      const blob = await (await fetch(dataURL)).blob();
  
      // Llamar a la función para subir la imagen y actualizar el contexto de usuario
      await subirYActualizarPerfil(blob);
      
      stopCamera(); // Detener la cámara después de tomar la foto
    } else {
      console.error("No se pudo obtener el contexto del canvas");
    }
  };
  

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop()); // Detiene todos los tracks (audio/video)
      videoRef.current.srcObject = null; // Limpia el feed del video
      setCameraActive(false); // Desactiva la cámara
    }
  };


  const subirYActualizarPerfil = async (blob) => {
    try {
      // Sube el archivo Blob a Firebase o al servidor
      const result = await uploadFilesUsuarios(blob); // `uploadFilesUsuarios` debe aceptar `blob` como parámetro
      const data = new FormData();
      data.append("idUsuario", user.idUsuario);
      data.append("Icono", result);
  
      const response = await fetch(apiurll + "api/CasaDelMarisco/SubirIcono", {
        method: "POST",
        body: data,
      });
      const responseData = await response.json();
  
      if (responseData === "Icono actualizado") {
        // Actualiza el contexto de usuario y la imagen de perfil
        const updatedUser = { ...user, Icono: result };
        setUser(updatedUser); // Esto actualiza el contexto
        setImagenPerfil(result); // Esto actualiza la vista actual del perfil
  
        // Actualiza localStorage con la información del usuario actualizado
        localStorage.setItem(
          'userData',
          CryptoJS.AES.encrypt(JSON.stringify(updatedUser), ENCRYPTION_KEY).toString()
        );
  
        
      }
    } catch (error) {
      console.error("Error al subir la imagen:", error);
     
    }
  };
  
  /////////////////////////e

  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const [isOpen, setIsOpen] = useState(false);
  const abrir = () => {
    setIsOpen(true);
  };
  const cerar = () => {
    setIsOpen(false);
    setFile(null);
    setImageURL(null);
  };
  async function getLatLong(address, apiKey) {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    const url = `${baseUrl}?address=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lng: location.lng };
      } else {
        console.error("Error en la geocodificación:", data.status);
        return null;
      }
    } catch (error) {
      console.error("Error en la solicitud de geocodificación:", error);
      return null;
    }
  }

  const address = "43000";
  const apiKey = "AIzaSyBMZxb7lHGBmYbaV8uDoiSjenlPxhwgS1M";

  getLatLong(address, apiKey).then((location) => {
    if (location) {
      console.log(`Latitud: ${location.lat}, Longitud: ${location.lng}`);
    } else {
      console.log("No se pudo obtener la latitud y longitud.");
    }
  });

  // Ejemplo de uso

  const [File, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();
  const { user, setUser, logoutUser } = useUser();

  const [imagenPerfil, setImagenPerfil] = useState(user.Icono);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    const imageURL = URL.createObjectURL(droppedFile);
    setImageURL(imageURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!File) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor selecciona una imagen.",
      });
      return;
    }

    // Verificar si el archivo seleccionado es una imagen
    if (!File.type.startsWith("image")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El archivo seleccionado no es una imagen.",
      });
      return;
    }
    const result = await uploadFilesUsuarios(File);
    const data = new FormData();
    data.append("idUsuario", user.idUsuario);
    data.append("Icono", result);
    fetch(apiurll + "api/CasaDelMarisco/SubirIcono", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result1) => {
        if (result1 === "Icono actualizado") {

          const updatedUser = { ...user, Icono: result };
          setUser(updatedUser); // Esto actualiza el contexto
          setImagenPerfil(result); // Esto actualiza la vista actual del perfil

          // Actualiza localStorage con la información del usuario actualizado
          localStorage.setItem(
            'userData',
            CryptoJS.AES.encrypt(JSON.stringify(updatedUser), ENCRYPTION_KEY).toString()
          );

          Swal.fire({
            icon: "warning",
            title: "Nos vemos pronto",
            text: "Si se subio",
          });
          
          setIsOpen(false);
          setFile(null);
          setImageURL(null);

         

        }
      });
    console.log(result);
  };
  const cerrarSesion = () => {
    logoutUser();
    navigate("/");
    Swal.fire({
      icon: "warning",
      title: "Nos vemos pronto",
      text: "Cerraste sesión, nos vemos y recuerdanos cuando te de hambre",
    });
  };
  const irDirecciones = () => {
    navigate("/direcciones");
  };

  return (
    <div className="flex flex-col md:flex-row  h-full lg:h-full bg-gray-50 ">
      <div className=" md:w-1/4 w-full bg-white  p-5 md:mt-0">
        <h2 className="text-3xl font-bold mb-4">Configuracion de perfil</h2>
        <div className="space-y-6">
          <a
            href="/menuRecuperacion"
            className="flex items-center justify-between p-3 rounded-lg shadow-sm bg-gray-900 hover:!text-gray-900 hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
              <span className="text-white ">Cambiar contraseña</span>
            </div>
          </a>

          <a
            onClick={() => abrir()}
            className="flex items-center justify-between p-3  bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
              <span className="text-gray-600">Cambiar foto de perfil</span>
            </div>
          </a>

          <a
            onClick={irDirecciones}
            className="flex items-center justify-between p-3 rounded-lg  bg-gray-50 shadow-sm hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="h-5 w-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                ></path>
              </svg>
              <span className="text-gray-600">Mis direcciones</span>
            </div>
          </a>

          <hr className="border-t-2 border-gray-500 my-4" />

          <a
            onClick={cerrarSesion}
            className="flex items-center justify-between p-3 rounded-lg  bg-gray-50 shadow-sm hover:bg-gray-100"
          >
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1"
                />
              </svg>

              <span className="text-red-600">Cerrar Sesión</span>
            </div>
          </a>
        </div>
      </div>

      <div className="lg:w-2/4 w-full  rounded-lg bg-white mt-4 ml-0 lg:ml-5 mr-2 mb-5 pr-10 pl-10 pt-4 lg:pr-40 lg:pt-20 lg:pl-40">
        <div className="flex items-center text-center mb-6">
          <div className="">
            {imagenPerfil ? (
              <img
                className="h-60 w-60 rounded-full object-cover border-2 border-gray-200"
                src={imagenPerfil}
                alt=""
              />
            ) : (
              <img
                src="https://firebasestorage.googleapis.com/v0/b/la-casa-del-marisco-web.appspot.com/o/WhatsApp%20Image%202024-03-07%20at%204.52.30%20PM.jpeg?alt=media&token=a9b8a667-c054-458e-914f-8e3a3e355805"
                className="h-60 w-60 rounded-full object-cover border-2 border-gray-200"
                alt="Perfil"
              />
            )}
          </div>
          <div>
            <span>Online</span>
          </div>
        </div>

        <form className="w-full">
          <div className="mb-4">
            <span htmlFor="name" className="block  font-bold text-gray-700">
              Nombre
            </span>
            <div className="mt-1 bg-gray-100 justify-center items-center relative flex rounded-lg  shadow-sm">
              <FaUser className="mr-2 ml-2" />
              <input
                type="text"
                id="name"
                className="w-full p-2 border-0 bg-gray-100  text-gray-400 "
                value={user.Nombre}
                onChange={(e) => setUser({ ...user, Nombre: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <span htmlFor="name" className="block  font-bold text-gray-700">
              Apellidos
            </span>
            <div className="mt-1 bg-gray-100 justify-center items-center relative flex rounded-lg  shadow-sm">
              <FaUser className="mr-2 ml-2" />
              <input
                type="text"
                id="name"
                className="w-full p-2 border-0 bg-gray-100  text-gray-400 "
                value={user.ApellidoPaterno}
                onChange={(e) => setUser({ ...user, ApellidoPaterno: e.target.value })}
              />
            </div>
          </div>

          <div className="mb-4">
            <span htmlFor="name" className="block  font-bold text-gray-700">
              Correo electronico
            </span>
            <div className="mt-1 bg-gray-100 justify-center items-center relative flex rounded-lg  shadow-sm">
              <MdEmail className="mr-2 ml-2" />
              <input
                type="text"
                id="name"
                className="w-full p-2 border-0 bg-gray-100  text-gray-400 "
                value={user.Correo}
                onChange={(e) => setUser({ ...user, Correo: e.target.value })}

              />
            </div>
          </div>

          <div className="mb-4">
            <span htmlFor="name" className="block  font-bold text-gray-700">
              Telefono Movil
            </span>
            <div className="mt-1 bg-gray-100 justify-center items-center relative flex rounded-lg  shadow-sm">
              <FaPhone className="mr-2 ml-2" />
              <input
                type="text"
                id="name"
                className="w-full p-2 border-0 bg-gray-100  text-gray-400 "
                value={user.Telefono}
                onChange={(e) => setUser({ ...user, Telefono: e.target.value })}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="md:w-1/4 w-full bg-white rounded-lg mt-4 lg:ml-5 ml-0 mr-5 mb-5 p-10 ">
        <span className="font-bold text-center">Mas opciones</span>
        <br></br>
        <span className="text-xl">
          Si no deseas cargar alguna foto, puedes tomarte una foto.
        </span>
        <div className="flex justify-center mb-4">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            width="150"
            height="150"
            className="rounded-xl"
          ></video>
        </div>
        <a
          onClick={startCamera}
          className="flex items-center justify-between p-3 rounded-lg shadow-sm hover:bg-gray-100 mb-4"
        >
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              ></path>
            </svg>
            <span className="text-gray-600">Abrir la cámara</span>
          </div>
        </a>

        <a
          onClick={takePhoto}
          className="ver flex items-center justify-between p-3 rounded-lg shadow-sm hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <svg
              className="h-5 w-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              ></path>
            </svg>
            <span className="text-gray-600">Tomar foto</span>
          </div>
        </a>

        <div>
          <canvas ref={photoRef} style={{ display: "none" }}></canvas>
        </div>

        {isOpen && (
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 0 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <div
                        className="mx-auto max-w-xs"
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                      >
                        {imageURL ? (
                          <img
                            src={imageURL}
                            alt="Imagen seleccionada"
                            className="mx-auto inline-flex h-60 w-60 rounded-20 bg-gray-100"
                          />
                        ) : (
                          <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                            <div className="space-y-2 text-center">
                              <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6 text-gray-500"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                                  />
                                </svg>
                              </div>
                              <div className="text-gray-600">
                                <a
                                  href="#"
                                  className="font-medium text-primary-500 hover:text-primary-700"
                                >
                                  Haz clic para subir
                                </a>{" "}
                                o arrastra y suelta
                              </div>
                              <p className="text-sm text-gray-800">
                                PNG, JPG (máx. 800x400px)
                              </p>
                            </div>
                            <input
                              id="example5"
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={(e) => {
                                setFile(e.target.files[0]);
                                const imageURL = URL.createObjectURL(
                                  e.target.files[0]
                                );
                                setImageURL(imageURL);
                              }}
                            />
                          </label>
                        )}
                      </div>
                      <div className="bg-gray-100 rounded-md mt-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        {File && (
                          <button
                            type="submit"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                          >
                            Subir
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => cerar()}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-300 sm:mt-0 sm:w-auto"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
