import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import imagen from '../home/img/login.jpg';

export default function RecuperarContraSMS() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const navigate = useNavigate();

  const [telefono, setTelefono] = useState('');
  const [telefonoError, setTelefonoError] = useState('');

  const validateTelefono = (telefono)=>{
    const telefonoRegex=/^[1-9]\d*$/;
   
    if (telefono === '') {
      setTelefonoError('No puede estar vacío');
      return false;
    } else if (!telefonoRegex.test(telefono)) {
      setTelefonoError('Teléfono no válido');
      return false;
    } else if (/^(\d)\1+$/.test(telefono)) {
      // Verifica si todos los dígitos son iguales (coherentes)
      setTelefonoError('Teléfono no coherente');
      return false;
    } else {
      setTelefonoError('');
      return true;
    }

  };

  const data = new FormData();
  data.append('Telefono', telefono);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateTelefono(telefono)) {
      fetch(
        apiurll +
          'api/CasaDelMarisco/ActualizarTokenSMS?Telefono=' +
          telefono,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'Correo Existe. Token actualizado.') {
            // Navegar a la página Token con el correo como parámetro
            localStorage.setItem('userData', JSON.stringify({ telefono }));
            navigate(`/tokenSMS`);
          } else if (result === 'No existe') {
            setTelefono('Ninguna cuenta esta asociada a este numero');
          }
        });
    } else {
      console.log('Formulario no válido');
    }
  };

  
  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Recuperación</p>
        <label className="loginText">
          Ingrese su numero telefonico para el proceso de recuperación de contraseña
        </label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className="loginLabel">
            Correo electrónico :
          </label>
          <input
          type='number'
            id="telefono"
            name="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            onBlur={() => validateTelefono(telefono)}
            className={telefonoError ? 'input-error' : ''}
            required
          />
          {telefonoError && <p className="error-message">{telefonoError}</p>}
          <br />
          <Link to='/recuperar' className=''>Recuperación por correo</Link>


          <button className="btn btn-warning text2" type="submit">
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
