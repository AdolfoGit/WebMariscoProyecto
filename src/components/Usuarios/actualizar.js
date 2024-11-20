import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagen from "../../img/recuperarcion.jpg";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { MedidorSeguridad } from "./MedidorDeSeguridad";
import Swal from "sweetalert2";
import { reactApiIP } from "../../variables";

export default function Actualizar() {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const navigate = useNavigate();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    validatePassword(password);
  };

  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleBlur2 = () => {
    validatePassword2(password2);
  };

  const [password, setPassword] = useState("");
  const [ip, setIp] = useState("");

  const [password2, setPassword2] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [passwordError2, setPasswordError2] = useState("");

  function checkPasswordStrength(password, minChar, level) {
    const lowcase = /[a-z]/.test(password);
    const uppcase = /[A-Z]/.test(password);
    const numbers = /\d/.test(password);
    const special = /[^a-zA-Z\d]/.test(password);

    let passed = true;
    switch (level) {
      case 5:
        passed = passed && special;
        break;
      case 4:
        passed = passed && uppcase;
        break;
      case 3:
        passed = passed && numbers;
        break;
      case 2:
        passed = passed && lowcase;
        break;
      case 1:
        passed = passed && (lowcase || uppcase || numbers);
        break;
      case 0:
        passed = passed && password.length >= minChar;
        break;
      default:
        passed = false;
    }
    return passed;
  }

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordError("no puede estar vacio");
      return false;
    } else {
      if (password.length < 8) {
        setPasswordError("minimo de 8 caracteres");
        return false;
      } else {
        const passwordValidate = checkPasswordStrength(password, 8, 5);
        if (passwordValidate) {
          ObtenerIp();
          setPasswordError("");
          return true;
        } else {
          setPasswordError(
            "Debe tener almenos una mayuscula, minuscula, numero y caracter especial"
          );
          return false;
        }
      }
    }
  };

  const validatePassword2 = (password2) => {
    if (password2 === password) {
      setPasswordError2("");
      return true;
    } else {
      setPasswordError2("no son iguales las contraseñas");
      return false;
    }
  };
  function json(url) {
    return fetch(url).then((res) => res.json());
  }

  const data = new FormData();

  const storedEmail = JSON.parse(localStorage.getItem("userData")).email; // Obtener el correo almacenado en localStorage
  
  data.append("Correo", storedEmail);
  data.append("Contrasena", password);
  function ObtenerIp() {
    let apiKey = reactApiIP;
    json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
      setIp(data.ip);
    });
  }
  const handleSubmit = (event) => {
   
    data.append("ip", ip);
    event.preventDefault();

    fetch(apiurll + "api/CasaDelMarisco/RecuperarContrasena", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result === "Contraseña modificada correctamente") {
          localStorage.removeItem("userData");

          Swal.fire({
            icon: "success",
            title: "Cambio de contraseña correcta",
            text: "Ahora puede entrar para navegar y sorprenderse.",
          });
          navigate("/login");
        } else if (result === "Error en las credenciales") {Swal.fire({
          icon: "error",
          title: "No se ajusta el correo",
          text: "Intentalo de nuevo",
        });
        }
      });
  };

  return (
    <div className="registro-form-containerLogin2 border-0 h-[24rem]">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Actualizar Contraseña</p>
        <label className="text-sm text-gray-600 mb-[10px] mt-4">Ingrese su nueva contraseña</label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password" className="text-sm mb-2">
            Contraseña :
          </label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="ejemplo@_"
              value={password}
              required
              size={35}
              onChange={handlePasswordChange}
              onBlur={handleBlur}
              className={passwordError ? "p-2 border rounded-[10px] text-sm border-red-300" : "p-2 border rounded-[10px] text-sm border-gray-300"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="btn btn-light"
            >
              {passwordVisible ? (
                <VisibilityOutlinedIcon fontSize="small" />
              ) : (
                <VisibilityOffOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <MedidorSeguridad password={password} />

          <label htmlFor="password2" className="text-sm mb-2">
            Repetir contraseña :
          </label>
          <div className="password-input-container">
            <input
              type={passwordVisible2 ? "text" : "password"}
              id="password2"
              name="password2"
              placeholder="ejemplo@_"
              value={password2}
              required
              size={35}
              onChange={handlePasswordChange2}
              onBlur={handleBlur2}
              className={passwordError2 ?"p-2 border rounded-[10px] text-sm border-red-300" : "p-2 border rounded-[10px] text-sm border-gray-300"}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility2}
              className="btn btn-light"
            >
              {passwordVisible2 ? (
                <VisibilityOutlinedIcon fontSize="small" />
              ) : (
                <VisibilityOffOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>
          {passwordError2 && <p className="error-message">{passwordError2}</p>}

          <br />

          <button className="btn bg-orange-600  hover:bg-orange-400 text-white" type="submit">
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
