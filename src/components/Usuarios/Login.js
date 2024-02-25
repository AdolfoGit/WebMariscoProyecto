import React, { useState, useRef } from 'react';
import '../Usuarios/css/login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import imagen from '../home/img/formLogin.jpg';
import LoginIcon from '@mui/icons-material/Login';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import ReCAPTCHA from 'react-google-recaptcha';


export default function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [loginAttempts2, setLoginAttempts2] = useState(0);

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
          "https://lacasadelmariscoapi.somee.com/" +
            "api/CasaDelMarisco/Login?Correo=" +
            email+
            "&Contrasena="+
            password,
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
                  "https://lacasadelmariscoapi.somee.com/" +
                    "api/CasaDelMarisco/BloquearCuenta?Correo=" +
                    email,
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
              fetch(
                'https://lacasadelmariscoapi.somee.com/' +
                  'api/CasaDelMarisco/ActualizarTokenLogin?Correo=' +
                  email,
                {
                  method: 'POST',
                  body: data,
                }
              )
              navigate(`/multifactor?correo=${email}`);
            }
            else if(result === 'Contraseña correcta'){
              fetch(
                'https://lacasadelmariscoapi.somee.com/' +
                  'api/CasaDelMarisco/ActualizarTokenLogin?Correo=' +
                  email,
                {
                  method: 'POST',
                  body: data,
                }
              )
              navigate(`/multifactor?correo=${email}`);

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

        <Link to='/recuperar' className='forget'>¿Olvidaste tu password?</Link>
       
        <label className='recuerdame'>
          <input
            type="checkbox"
           className='cuadro'
          />
          Recuérdame
        </label>
           <Link to='/registrar' className='singText'>¿No tienes cuenta? Crea tu cuenta</Link>
      <div className='recaptcha'>
      <ReCAPTCHA sitekey="6LcM1HgpAAAAAPRLXOZ5D4aIwp7JtiBeH3IR9QW6" onChange={onChange}/>
      </div>
        <button  className='btn btn-warning text2' type="submit" disabled={isButtonDisabled}>Entrar</button><br/>
     
      </form>
    </div>
  </div>
    
  )
}
