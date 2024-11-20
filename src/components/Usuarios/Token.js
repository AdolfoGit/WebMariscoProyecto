import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../../img/recuperarcion.jpg';

export default function Token() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
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
        // Eliminar el correo almacenado en localStorage
          localStorage.removeItem('userData');

        navigate('/menuRecuperacion');
      }, 200); // Redirigir después de 5 segundos
    }, 30000); 

    return () => clearTimeout(timer);
  }, []); // Se ejecuta solo al montar el componente

  const handleTimerEnd = () => {
    setTimerActive(false);
    setErroToken('Tiempo de ingreso de token agotado. Actualice la página para intentar de nuevo.');
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!timerActive) {
      handleTimerEnd();
      return;
    }

    const data = new FormData();
    const storedEmail = JSON.parse(localStorage.getItem('userData')).email; // Obtener el correo almacenado en localStorage
    data.append('Correo', storedEmail);
    data.append('Token', token);

    fetch(
      apiurll +
        'api/CasaDelMarisco/VerificarToken',
      {
        method: 'POST',
        body: data,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result === 'Credenciales validas') {
          navigate(`/actualizar`);
        } else {
          setErroToken('Token inválido');
        }
      });
  };

  return (
    <div className="registro-form-containerLogin2 border-0">
      <div className="registro-image-containerLogin h-[20rem]"> 
       <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>
      
      <div className="registro-formLogin">
        <p className="loginTitulo pt-2">Recuperación</p>
        <label className="text-sm text-gray-600 mb-[10px] mt-4">
          Ingrese el token que se le envió al correo
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="text-sm  mb-2 ">
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

          <button className="btn bg-orange-600 hover:bg-orange-400 text-white" type="submit" disabled={!timerActive}>
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}