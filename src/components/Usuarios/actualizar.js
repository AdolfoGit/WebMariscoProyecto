import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import imagen from '../home/img/login.jpg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

export default function Actualizar() {
  const navigate = useNavigate();

  const location = useLocation();
  const correo = new URLSearchParams(location.search).get('correo');


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
  

  const [password,setPassword]=useState('')
  const [password2,setPassword2]=useState('')

  const [passwordError, setPasswordError] = useState('');
  const [passwordError2, setPasswordError2] = useState('');


  function checkPasswordStrength(password, minChar, level) {
    const lowcase = /[a-z]/.test(password);
    const uppcase = /[A-Z]/.test(password);
    const numbers = /\d/.test(password);
    const special = /[^a-zA-Z\d]/.test(password);
  
    let passed = true;
    switch (level) {
      case 5:
        passed = passed && special;
      case 4:
        passed = passed && uppcase;
      case 3:
        passed = passed && numbers;
      case 2:
        passed = passed && lowcase;
      case 1:
        passed = passed && (lowcase || uppcase || numbers);
      case 0:
        passed = passed && password.length >= minChar;
        break;
      default:
        passed = false;
    }
    return passed;
  }
  

  const validatePassword = (password) => {
    if(password==''){
      setPasswordError('no puede estar vacio')
      return false;
    }else{
      if(password.length<8){
        setPasswordError('minimo de 8 caracteres');
        return false;
      }else{ 
        const passwordValidate= checkPasswordStrength(password,8,5);
        if(passwordValidate){
          setPasswordError('')
          return true;
        }else{
          setPasswordError('Debe tener almenos una mayuscula, minuscula, numero y caracter especial')
          return false;

        }
      }
    }
  };

  const validatePassword2=(password2)=>{
    if(password2==password){
      setPasswordError2('')
      return true;  

    }else{
      setPasswordError2('no son iguales las contraseñas')
      return false;
    }
  };



  const data = new FormData();
  data.append('Correo', correo);
  data.append('Contrasena', password);

  const handleSubmit = (event) => {
    event.preventDefault();

      fetch(
        'https://apicasadelmarisco.azurewebsites.net/' +
          'api/CasaDelMarisco/RecuperarContrasena?Correo=' +
          correo+ "&Contrasena=" + password,
        {
          method: 'POST',
          body: data,
        }
      )
        .then((res) => res.json())
        .then((result) => {
          if (result === 'Contraseña modificada correctamente') {
            // Navegar a la página Token con el correo como parámetro 
            navigate('/login');
          } else if (result === 'Error en las credenciales') {
            
          }
        });
  
  };

  return (
    <div className="registro-form-containerLogin">
      <div className="registro-image-containerLogin">
        <img src={imagen} alt="Registro" className="registro-imageLogin" />
      </div>

      <div className="registro-formLogin">
        <p className="loginTitulo">Actualizar Contraseña</p>
        <label className="loginText">
          Ingrese su nueva  contraseña
        </label>
        <form onSubmit={handleSubmit}>
           <label htmlFor="password" className='RegistroLabel'>Contraseña :</label>
         <div className="password-input-container">
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            value={password}
            required
            size={35}
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
       
          <label htmlFor="password2" className='RegistroLabel'>Repetir contraseña :</label>
          <div className="password-input-container">
            <input
              type={passwordVisible2 ? 'text' : 'password'}
              id="password2"
              name="password2"
              value={password2}
              required
              size={35}
              onChange={handlePasswordChange2}
              onBlur={handleBlur2}
              className={passwordError2 ? 'input-error' : ''}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility2}
              class="btn btn-light"
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

          <button className="btn btn-warning text2" type="submit">
            Enviar
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
