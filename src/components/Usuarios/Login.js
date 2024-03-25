import React, { useState, useRef, useEffect } from 'react';
import '../Usuarios/css/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagen from '../home/img/ham2.jpg';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { gapi } from 'gapi-script';
import GoogleLogin from '@leecheuk/react-google-login';
import { useUser } from '../../UserContext';
import './css/login.css'

export default function Login() {
  //const apiurll ="http://localhost:5029/"
    const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
    const { loginUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginAttempts2, setLoginAttempts2] = useState(0);  
  const ClientID ="581987127535-vrka2isr37etho1p5t4cfnq6lur1euum.apps.googleusercontent.com"
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
    return fetch(url).then(res => res.json());
  }
  
  // let apiKey = '8c308d0e8f217c1a489e15cb1998c34ffcd76bcead2a2851c3878299';
  // json(`https://api.ipdata.co?api-key=${apiKey}`).then(data => {
  //   console.log(data.ip);
  //   console.log(data.city);
  //   console.log(data.country_code);
  //   // so many more properties
  // });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      setEmailError('Este campo no puede estar vacío');
    } else if (emailRegex.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Correo electrónico no válido, incluya un @');
      return false;
    }
  };

  const validatePassword = (password) => {
    if (password === '') {
      setPasswordError('Este campo no puede estar vacío');
    } else if (password.length >= 8) {
      setPasswordError('');
      return true;
    } else {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
  };
    const handleSubmit = (event) => {
      event.preventDefault();
      
      const data = new FormData();
      data.append("Correo", email);
      data.append("Contrasena", password);
      // Validar campos antes de enviar el formulario
      if (validateEmail(email) && validatePassword(password) ) {
        loginAttemptsRef.current += 1;
        if (loginAttemptsRef.current >= 3) {

          setIsButtonDisabled(true); // Deshabilitar el botón después de 5 intentos
          setTimeout(() => {
            setIsButtonDisabled(false); // Habilitar el botón después de 3 minutos
            loginAttemptsRef.current = 0; // Reiniciar el contador de intentos
          }, 60000); // 3 minutos en milisegundos
        }
        fetch(
          apiurll +
            "api/CasaDelMarisco/Login",
          {
            method: "POST",
            body: data,
            
          }
        )
          .then((res) => res.json())
          .then((result) => {
            if(result === 'Error en tus credenciales'){
              setPasswordError('Contraseña incorrecta');
              loginAttemptsRef2.current += 1;
              if (loginAttemptsRef2.current >= 3) {
                fetch(
                  apiurll +"api/CasaDelMarisco/BloquearCuenta", 
                  {
                    method: "POST",
                    body: data,
                  }
                )
                
              }

            }else if(result === 'Error en las credenciales'){
              setEmailError('Error en las credenciales');
              
            }
            else if(result=='Cuenta bloqueada'){
              Swal.fire({
                icon: 'error',
                title: 'Cuenta bloqueada',
                text: 'Su cuenta está bloqueada y no podrá ingresar.',
              });
            }
            else if(result === 'Contraseña correcta para administrador'){
              fetch(apiurll+'api/CasaDelMarisco/ActualizarTokenLogin',
                {
                  method: 'POST',
                  body: data,
                }
              )
              localStorage.setItem('userData', JSON.stringify({ email }));
        
              navigate('/multifactor');            }
            else if(result === 'Contraseña correcta'){
              fetch(apiurll+ 'api/CasaDelMarisco/ActualizarTokenLogin',
                {
                  method: 'POST',
                  body: data,
                }
              )
              localStorage.setItem('userData', JSON.stringify({ email }));
                navigate('/multifactor');

            }
          
          }
        );
       
      } else {
        console.log('No cumple con los requrimientos');
      }
    };

    function onChange(value) {
      setIsButtonDisabled(false)
      }

    useEffect(()=>{

      
        const start = ()=>{
          gapi.auth2.init({
            clientId:ClientID,
          })
        }
        gapi.load("client:auth2", start)
      },[])


      const onSuccess = async (response)  =>{
        const email = response.profileObj.email;
        const data = new FormData();
        data.append("Correo", email)
        fetch(
          apiurll+"api/CasaDelMarisco/VerificarCorreo",
          {

            method: "POST",
            body: data,
          }
        ).then((res) =>res.json())
        .then(async (result) => {
          if(result === "Correo Existe"){

            const resultado = await obtenerDatosUsuario(email)
            console.log(resultado)
            loginUser(resultado);
            if(resultado.Rol===2){
              Swal.fire({
                icon: 'success',
                title: 'Login de administrador',
                text: 'Cuidado, eres administrador. Puedes modificar datos de la página, siempre con cuidado.',
              });  
              navigate('/dashboard/home')
              
            }else{
            navigate('/')}
            console.log(resultado)
          }else{

          }
        })
        console.log(response)
        //console.log(response.profileObj.email)
      }


      const onFailure =() =>{
        console.log("Algo salio mal")
      }

    const obtenerDatosUsuario = async (email) => {
  
    try {
      const response = await fetch(
        apiurll+"api/CasaDelMarisco/TraerUsuario?Correo="+email,
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
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>
    
      <div className="registro-formLogin">
        <p className='loginTitulo'>Login <LoginIcon/></p>
        <label className='loginText'>Inicia sesión para obtener nuevos permisos y opciones dentro del sitio web</label>
        <form onSubmit={handleSubmit}>
          <label htmlFor="nombre" className='loginLabel'>Correo electrónico :</label>
          <input
            type='email'
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => validateEmail(email)}
            className={emailError ? 'input-error' : ''}
            required
          />
            
          {emailError && <p className="error-message">{emailError}</p>}
      
          <label htmlFor="email" className='loginLabel'>Contraseña :</label>
          <div className="password-input-container">
            <input
              type={passwordVisible ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              required
              size={37}
              onChange={handlePasswordChange}
              onBlur={handleBlur}
              className={passwordError ? 'input-error' : ''}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              class="btn btn-light"
            >
              {passwordVisible ? (
                <VisibilityOutlinedIcon fontSize="small" />
              ) : (
                <VisibilityOffOutlinedIcon fontSize="small" />
              )}
            </button>
          </div>
          {passwordError && <p className="error-message">{passwordError}</p>}
          <label className='recuerdame'>
            <input
              type="checkbox"
            className='cuadro'
            style={{marginTop:'10px'}}
            />
            Recuérdame
          </label>
        
          <GoogleLogin
            clientId={ClientID}
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={"single_host_policy"}
            className="google-login-button"
          />
        <div className='recaptcha'>
        <ReCAPTCHA className='recaptch'  sitekey="6LcM1HgpAAAAAPRLXOZ5D4aIwp7JtiBeH3IR9QW6" onChange={onChange}/>
        </div>
          <button  className='btn btn-warning text2' type="submit" disabled={isButtonDisabled}>Entrar</button><br/>
        </form>
       
          <div  className='container'>
          <Link to='/menuRecuperacion' className='singText'>¿Olvidaste tu password?</Link>
          <Link to='/registrar' className='singText ms-3'>¿Sin cuenta? Registrate</Link>
          <></>
          </div>
      </div>
  </div>
    
  )
}
