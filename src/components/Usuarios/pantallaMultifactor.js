import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imagen from '../home/img/login.jpg';
import Swal from 'sweetalert2';
import { useUser } from '../../UserContext';

export default function Bienvenida() {
  const { loginUser } = useUser();
  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');
  const navigate = useNavigate();
  const [token, setToken] = useState('');
  const [erroToken, setErroToken] = useState('');
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerActive(false);
      alert('Se agotó el tiempo para ingresar el token. Serás redirigido a la página anterior.');
      setTimeout(() => {
        navigate('/recuperar');
      }, 200000000); // Redirigir después de 5 segundos
    }, 300000000); 

    return () => clearTimeout(timer);
  }, []); // Se ejecuta solo al montar el componente

  const handleTimerEnd = () => {
    setTimerActive(false);
    setErroToken('Tiempo de ingreso de token agotado. Actualice la página para intentar de nuevo.');
  };

  const obtenerDatosUsuario = async () => {
    try {
      const response = await fetch(
        'https://lacasadelmariscoapi.somee.com/api/CasaDelMarisco/TraerUsuario?Correo=' + encodeURIComponent(correo),
        {
          method: 'GET',
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
  

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!timerActive) {
      handleTimerEnd();
      return;
    }

    const data = new FormData();
    data.append('Correo', correo);
    data.append('Token', token);

    try {
      const result = await fetch(
        'https://lacasadelmariscoapi.somee.com/' +
          'api/CasaDelMarisco/VerificarToken?Correo=' +
          correo+"&Token="+token,
        {
          method: 'POST',
          body: data,
        }
      )

      const verificationResult = await result.json();

      if (verificationResult === 'Credenciales validas') {
        const userData = await obtenerDatosUsuario();
        console.log(userData);
        if (userData) {
          loginUser(userData);
          navigate('/');
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido de nuevo!'+userData.Nombre,
            text: 'Ahora puede entrar para navegar y sorprenderse.',
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

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin"> 
       <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>
      
      <div className="registro-formLogin">
        <p className="loginTitulo">Multifactor</p>
        <label className="loginText">
          Ingrese el token que se le envió al correo
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