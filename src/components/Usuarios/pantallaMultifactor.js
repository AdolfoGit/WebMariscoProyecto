import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../../img/registro.jpg';
import Swal from 'sweetalert2';
import { useUser } from '../../UserContext';

export default function Bienvenida() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [erroToken, setErroToken] = useState('');
  const [timerActive, setTimerActive] = useState(true);
  const [tokenParts, setTokenParts] = useState(["", "", "", "", "", ""]); // Arreglo para los 6 inputs


  const handleInputChange = (value, index) => {
    const newTokenParts = [...tokenParts];
    newTokenParts[index] = value.slice(0, 1); // Limita a un carácter por input
    setTokenParts(newTokenParts);

    // Combina los valores y actualiza el token final
    setToken(newTokenParts.join(""));
  };

  const handleKeyUp = (e, index) => {
    if (e.key === "Backspace" && index > 0 && tokenParts[index] === "") {
      // Si presiona backspace, mueve el foco al input anterior
      document.getElementById(`input-${index - 1}`).focus();
    } else if (index < 5 && e.target.value !== "") {
      // Si escribe algo, mueve el foco al siguiente input
      document.getElementById(`input-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerActive(false);
      alert('Se agotó el tiempo para ingresar el token. Serás redirigido a la página anterior.');
      setTimeout(() => {
        navigate('/recuperar');
      }, 5000); // Redirigir después de 5 segundos
    }, 300000); // 5 minutos

    return () => clearTimeout(timer);
  }, []); // Se ejecuta solo al montar el componente

  const handleSubmit = async (event) => {
    //  let apiKey = '8c308d0e8f217c1a489e15cb1998c34ffcd76bcead2a2851c3878299';
    // json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
    //  console.log(data.ip);
    //  console.log(data.city);
    //  console.log(data.country_code);
    //   });
    event.preventDefault();


    if (!timerActive) {
      handleTimerEnd();
      return;
    }

    const data = new FormData();
    const storedEmail = JSON.parse(localStorage.getItem('userData')).email; // Obtener el correo almacenado en localStorage
    data.append('Token', token);
    data.append('Correo', storedEmail); // Agregar el correo almacenado al FormData
    //data.append('IP', data.ip); // Agregar el correo almacenado al FormData

    try {
      const result = await fetch(
        apiurll + 'api/CasaDelMarisco/VerificarToken',
        {
          method: 'POST',
          body: data,
        }
      );

      const verificationResult = await result.json();

      if (verificationResult === 'Credenciales validas') {
        const userData = await obtenerDatosUsuario();
        console.log(userData);

        if (userData) {
          const idUsuario = userData.idUsuario;
          loginUser(userData, idUsuario);
          
          navigate('/');
          Swal.fire({
            icon: 'success',
            title: `Bienvenido de nuevo, ${userData.Nombre}!`,
            text: 'Ahora puedes entrar para navegar y sorprenderte.',
          });
        } else {
          // Manejar el caso donde no se pudieron obtener los datos del usuario
        }
      } else {
        setErroToken('Token inválido');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
    }
  };

  const handleTimerEnd = () => {
    setTimerActive(false);
    setErroToken('Tiempo de ingreso de token agotado. Actualiza la página para intentar de nuevo.');
  };

  const obtenerDatosUsuario = async () => {
    const storedEmail = JSON.parse(localStorage.getItem('userData')).email;
  
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/TraerUsuario?Correo=${encodeURIComponent(storedEmail)}`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );
  
      if (response.ok) {
        const userData = await response.json();
        return userData;
      } else {
        console.error('Error al obtener datos del usuario que ingresaste:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  };
  

  return (
    <div className=''>
        <div className="registro-form-containerLogin2 border-0 h-[20rem] flex justify-center ">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo mt-12">Multifactor</p>
        <label className="text-sm text-gray-600 mb-[10px] mt-[15px]">
          Ingrese el token que se le envió al correo
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="text-sm mb-2">
            Token:
          </label>
          <div className="flex space-x-4 mb-4">

          {tokenParts.map((value, index) => (
            <input
            key={index}
            id={`input-${index}`}
            type="text"
            name={`token-${index}`}
            className="w-12 h-12 text-center border rounded-md text-lg font-medium border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={value}
            onChange={(e) => handleInputChange(e.target.value, index)}
            onKeyUp={(e) => handleKeyUp(e, index)}
            disabled={!timerActive}
            />
          ))}
          {erroToken && <p className="error-message">{erroToken}</p>}
          <br />
          </div>

          <button className="btn bg-orange-600 text-white" type="submit" disabled={!timerActive}>
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
    </div>
  );
}
