import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import imagen from '../../home/img/login.jpg';
import Swal from 'sweetalert2';
export default function TokenRegistro() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [erroToken, setErroToken] = useState('');
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerActive(false);
      alert('Se agotó el tiempo para ingresar el token. Serás redirigido a la página anterior.');
      setTimeout(() => {
        // Eliminar el correo almacenado en localStorage
          localStorage.removeItem('userData');

        navigate('/');
      }, 200); // Redirigir después de 5 segundos
    }, 90000); 

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
    const storedTelefono = JSON.parse(localStorage.getItem('userData')).telefono; // Obtener el correo almacenado en localStorage
    data.append('Telefono', storedTelefono);
    data.append('Token', token);

    fetch(
      apiurll +
        'api/CasaDelMarisco/VerificarTokenSMS',
      {
        method: 'POST',
        body: data,
      }
    )
      .then((res) => res.json())
      .then((result) => {
        if (result === 'Credenciales validas') {
          localStorage.removeItem('userData');
          Swal.fire({
            icon: 'success',
            title: 'Completo su registro',
            text: 'Ahora puede entrar para navegar y sorprenderse.',
          });  
          navigate(`/login`);
        } else {
          setErroToken('Token inválido');
        }
      });
  };

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin"> 
       <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>
      
      <div className="registro-formLogin">
        <p className="loginTitulo">Verificación</p>
        <label className="loginText">
          Ingrese el token que se le envió al telefono para terminar su registro
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Token:
          </label>
          <input
            type="text"
            name="token"
            required
            value={token}
            onChange={(e) => setToken(e.target.value)}
            disabled={!timerActive}
          />
          {erroToken && <p className="error-message">{erroToken}</p>}
          <br />

          <button className="btn btn-warning text2" type="submit" disabled={!timerActive}>
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}