import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import imagen from "../home/img/login.jpg";

export default function MenuRecuperacion() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const navigate = useNavigate();

  const [telefono, setTelefono] = useState("");
  const [telefonoError, setTelefonoError] = useState("");
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showTelefonoForm, setShowTelefonoForm] = useState(true);

  const validateTelefono = (telefono) => {
    const telefonoRegex = /^[1-9]\d*$/;

    if (telefono === "") {
      setTelefonoError("No puede estar vacío");
      return false;
    } else if (!telefonoRegex.test(telefono)) {
      setTelefonoError("Teléfono no válido");
      return false;
    } else if (/^(\d)\1+$/.test(telefono)) {
      // Verifica si todos los dígitos son iguales (coherentes)
      setTelefonoError("Teléfono no coherente");
      return false;
    } else {
      setTelefonoError("");
      return true;
    }
  };
 const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('Acomplete este campo');
    } else if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Correo electrónico no válido');
      return false;
    }
  };

  
  const handleSubmit2 = (event) => {
      const data = new FormData();
      data.append('Correo', email);
    event.preventDefault();

    if (validateEmail(email)) {
      fetch(
        apiurll +
          'api/CasaDelMarisco/ActualizarToken',
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'Correo Existe. Token actualizado.') {
            // Navegar a la página Token con el correo como parámetro
            localStorage.setItem('userData', JSON.stringify({ email }));
            navigate(`/token`);
          } else if (result === 'No existe') {
            setEmailError('Ninguna cuenta esta asociada a este correo');
          }
        });
    } else {
      console.log('Formulario no válido');
    }
  };
  
  const handleSubmit = (event) => {
      const data = new FormData();
      data.append("Telefono", telefono);
    event.preventDefault();

    if (validateTelefono(telefono)) {
      fetch(
        apiurll + "api/CasaDelMarisco/ActualizarTokenSMS",
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === "Correo Existe. Token actualizado.") {
            // Navegar a la página Token con el correo como parámetro
            localStorage.setItem("userData", JSON.stringify({ telefono }));
            navigate(`/tokenSMS`);
          } else if (result === "No existe") {
            setTelefono("Ninguna cuenta esta asociada a este numero");
          }
        });
    } else {
      console.log("Formulario no válido");
    }
  };
  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Recuperación</p>
        <div
          className="container"
          style={{ display: "flex", alignItems: "center" }}
        >
         <button className="btn btn-warning" onClick={() => setShowTelefonoForm(true)}>
            <i class="fa-brands fa-whatsapp"></i> Por WhatsApp
          </button>
          <button className="btn btn-warning" onClick={() => setShowTelefonoForm(false)}>
            <i class="fa-solid fa-envelope-circle-check"></i> Por Email
          </button>
        </div>
        {showTelefonoForm ? (
          <div className="container" id="FormularioTelefonico">
            <form onSubmit={handleSubmit}>
              <label htmlFor="nombre" className="loginLabel">
                Número telefónico :
              </label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                onBlur={() => validateTelefono(telefono)}
                className={telefonoError ? "input-error" : ""}
                required
              />
              {telefonoError && <p className="error-message">{telefonoError}</p>}
              <br />

              <button className="btn btn-warning text2" type="submit">
                Enviar
              </button>
              <br />
            </form>
          </div>
        ) : (
          <div className="container" id="FormularioCorreo">
            <form onSubmit={handleSubmit2}>
              <label htmlFor="nombre" className="loginLabel">
                Correo electrónico :
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                className={emailError ? "input-error" : ""}
                required
              />
              {emailError && <p className="error-message">{emailError}</p>}
              <br />

              <button className="btn btn-warning text2" type="submit">
                Enviar
              </button>
              <br />
            </form>
          </div>
        )}
        <br />
      </div>
    </div>
  );
}
