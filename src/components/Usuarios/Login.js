import React, { useState, useRef, useEffect } from "react";
import "../Usuarios/css/login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import imagen from "../home/img/ham2.jpg";
import LoginIcon from "@mui/icons-material/Login";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import ReCAPTCHA from "react-google-recaptcha";
import { gapi } from "gapi-script";
import GoogleLogin from "@leecheuk/react-google-login"; 
import { useUser } from "../../UserContext";
import "./css/login.css";
import { reactApiIP } from "../../variables";
import { Typography } from "@material-tailwind/react";

export default function Login() {
  //const apiurll ="http://localhost:5029/"
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const { loginUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [ip, setIp] = useState("");

  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginAttempts2, setLoginAttempts2] = useState(0);
  const ClientID =
    "581987127535-vrka2isr37etho1p5t4cfnq6lur1euum.apps.googleusercontent.com";
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const loginAttemptsRef = useRef(loginAttempts);
  const loginAttemptsRef2 = useRef(loginAttempts2);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    validatePassword(password);
  };

  function json(url) {
    return fetch(url).then((res) => res.json());
  }

  //

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      setEmailError("Este campo no puede estar vacío");
    } else if (emailRegex.test(email)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Correo electrónico no válido, incluya un @");
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password === "") {
      setPasswordError("Este campo no puede estar vacío");
    } else if (password.length >= 8) {
      setPasswordError("");
      return true;
    } else {
      setPasswordError("La contraseña debe tener al menos 8 caracteres");
      return false;
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("Correo", email);
    data.append("Contrasena", password);
    data.append("ip", ip);

    // Validar campos antes de enviar el formulario
    if (validateEmail(email) && validatePassword(password)) {
      loginAttemptsRef.current += 1;
      if (loginAttemptsRef.current >= 3) {
        setIsButtonDisabled(true); // Deshabilitar el botón después de 5 intentos
        setTimeout(() => {
          setIsButtonDisabled(false); // Habilitar el botón después de 3 minutos
          loginAttemptsRef.current = 0; // Reiniciar el contador de intentos
        }, 60000); // 3 minutos en milisegundos
      }
      fetch(apiurll + "api/CasaDelMarisco/Login", {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((result) => {
          if (result === "Error en tus credenciales") {
            setPasswordError("Contraseña incorrecta");
            loginAttemptsRef2.current += 1;
            if (loginAttemptsRef2.current >= 3) {
              fetch(apiurll + "api/CasaDelMarisco/BloquearCuenta", {
                method: "POST",
                body: data,
              });
            }
          } else if (result === "Error en las credenciales") {
            setEmailError("Error en las credenciales");
          } else if (result == "Cuenta bloqueada") {
            Swal.fire({
              icon: "error",
              title: "Cuenta bloqueada",
              text: "Su cuenta está bloqueada y no podrá ingresar.",
            });
          } else if (result === "Contraseña correcta para administrador") {
            fetch(apiurll + "api/CasaDelMarisco/ActualizarTokenLogin", {
              method: "POST",
              body: data,
            });
            localStorage.setItem("userData", JSON.stringify({ email }));

            navigate("/multifactor");
          } else if (result === "Contraseña correcta") {
            fetch(apiurll + "api/CasaDelMarisco/ActualizarTokenLogin", {
              method: "POST",
              body: data,
            });
            localStorage.setItem("userData", JSON.stringify({ email }));
            navigate("/multifactor");
          }
        });
    } else {
      console.log("No cumple con los requrimientos");
    }
  };

  function onChange(value) {
    setIsButtonDisabled(false);
    ObtenerIp();

  }
  function ObtenerIp() {
    const apiKey = reactApiIP;
    json(`https://api.ipdata.co?api-key=${apiKey}`).then((data) => {
      setIp(data.ip);
      //console.log(ip);
    });
  }
  useEffect(() => {
    ObtenerIp();
    const start = () => {
      gapi.auth2.init({
        clientId: ClientID,
      });
    };
    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = async (response) => {
    const email = response.profileObj.email;
    const data = new FormData();
    data.append("Correo", email);
    data.append("ip", ip);

    fetch(apiurll + "api/CasaDelMarisco/VerificarCorreo", {
      method: "POST",
      body: data,
  })
  .then((res) => res.json())
  .then(async (result) => {
      if (result === "Correo Existe") {
          const resultado = await obtenerDatosUsuario(email);

          // Segunda llamada fetch
          fetch(apiurll + "api/CasaDelMarisco/LoginOauth", {
              method: "POST",
              body: data,
          })
          .then((res) => res.json())
          .then((loginResult) => {
              loginUser(resultado);
              if (resultado.Rol === 2) {
                  Swal.fire({
                      icon: "success",
                      title: "Login de administrador",
                      text: "Cuidado, eres administrador. Puedes modificar datos de la página, siempre con cuidado.",
                  });
                  navigate("/dashboard/home");
              } else {
                  navigate("/");
              }
              //console.log(loginResult);
          })
          .catch((error) => {
              console.error("Error en la segunda llamada fetch:", error);
          });
      } else {
          // Aquí puedes manejar el caso en el que el correo no existe
      }
  })
  .catch((error) => {
      console.error("Error en la primera llamada fetch:", error);
  });

  //console.log(response);
};


  const onFailure = () => {
    console.log("Algo salio mal");
  };

  const obtenerDatosUsuario = async (email) => {
    try {
      const response = await fetch(
        apiurll + "api/CasaDelMarisco/TraerUsuario?Correo=" + email,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        return await response.json();
      } else {
        console.error(
          "Error al obtener datos del usuario que ingresaste:",
          response.statusText
        );
        return null;
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      return null;
    }
  };
  return (
    <div className="lg:m-0 m-1">
      <div className="flex justify-center items-center">
      <div className="p-10">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden max-w-6xl w-full">
      <div className="registro-image-containerLogin w-2/5 ">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className=" w-full lg:w-3/5 pl-20 pb-5 pt-5 pr-20">
        <p className="loginTitulo mb-4 ">
          Login 
        </p>
        <label className="loginText">
          Inicia sesión para obtener nuevos permisos y opciones dentro del sitio
          web
        </label>

        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="email" className="block text-2xl mb-2">Correo</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => validateEmail(email)}
              className={`w-full p-2 border rounded ${emailError ? "border-red-500" : "border-gray-300"}`}
              required
            />
            {emailError && <p className="text-red-500 text-xl">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-2xl mb-2">Contraseña</label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handleBlur}
                className={`w-full p-2 border rounded ${passwordError ? "border-red-500" : "border-gray-300"}`}
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-2"
              >
                {passwordVisible ? (
                  <VisibilityOutlinedIcon fontSize="small" />
                ) : (
                  <VisibilityOffOutlinedIcon fontSize="small" />
                )}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-xl">{passwordError}</p>}
          </div>
          <div className="flex justify-end">      
            <Link to="/menuRecuperacion" className="text-xl text-blue-900">
              ¿Olvidaste tu password?
            </Link>
          </div>
          <center>
            <ReCAPTCHA
              
              sitekey="6LcM1HgpAAAAAPRLXOZ5D4aIwp7JtiBeH3IR9QW6"
              onChange={onChange}
            />
          </center>
          <button
            type="submit"
            className="w-full bg-amber-400 text-white py-2 rounded-lg font-semibold hover:bg-amber-600"
            disabled={isButtonDisabled}
          >
              Entrsar
          </button>
          <div className="text-center mt-4">
            <Typography variant="text" className="text-2xl text-center font-semibold">
              Iniciar sesión con
            </Typography>
          </div>
          <GoogleLogin
            clientId={ClientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            className="google-login-button"
          />

          <div className=" flex justify-start text-center mt-6">
            <Typography className="text-2xl">
              No tienes una cuenta?
            </Typography>
            <Link to="/login" className="text-blue-500 hover:underline ml-2">
              Crear cuenta
            </Link>
          </div>
        </form>
      </div>
    </div>
      </div>
      </div>
    </div>
  );
}
