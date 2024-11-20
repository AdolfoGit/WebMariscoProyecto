import React, { useState, useEffect } from 'react';
import './css/registro.css'
import imagen from '../../img/registro.jpg'
import { Link, useNavigate } from 'react-router-dom'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { MedidorSeguridad } from './MedidorDeSeguridad';
import Swal from 'sweetalert2';


const Registro = () => {
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";

  const [nombre, setNombre] = useState('')
  const [ApellidoP, setApellidoP] = useState('')
  const [ApellidoM, setApellidoM] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  ///mensajes de error
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordError2, setPasswordError2] = useState('');
  const [telefonoError, setTelefonoError] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [apellidoMError, setApellidoMError] = useState('');
  const [apellidoPError, setApellidoPError] = useState('');
  const [fechaError, setFechaError] = useState('');
  const [TerminosError, setTerminosError] = useState('');
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleBlur = () => {
    validatePassword(password);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleBlur2 = () => {
    validatePassword2(password2);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("Nombre", nombre);
    data.append("ApellidoPaterno", ApellidoP);
    data.append("ApellidoMaterno", ApellidoM);
    data.append("Correo", email);
    data.append("Telefono", telefono);
    data.append("Contrasena", password);
    data.append("FechaNacimiento", fechaNac);

    const formData = new FormData();
    formData.append("Correo", email);
    // Validar campos antes de enviar el formulario
    if (isChecked === false) {
      setTerminosError('Acepte los terminos y condiciones')
    }
    else {
      if (validateEmail(email) === true && validatePassword2(password2) && validateApellidoM(ApellidoM) === true && validateApellidoP(ApellidoP) === true && validateNombre(nombre) && validateTelefono(telefono) && validateFecha(fechaNac)) {
        fetch(
          apiurll + "api/CasaDelMarisco/VerificarTelefono?Telefono=" +
          telefono,
          {
            method: "POST",
            body: data,
          }
        ).then((res) => res.json())
          .then((result) => {
            console.log(result)
            if (result === "Telefono Existe") {
              Swal.fire({
                icon: 'error',
                title: 'Parece que tu telefono ya esta registrado',
                text: 'Ingresa un telefono nuevo o que sea valido antes de registrarte',
              });
              setTelefonoError("Este telefono ya está registrado en la página");
            }
            else {
              fetch(
                apiurll + "api/CasaDelMarisco/ProbarAlgo?Correo=" +
                email,
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then((res) => res.json())
                .then((result) => {
                  let resultado = result.Result;
                  console.log(resultado)
                  if (resultado === 'valid') {
                    fetch(
                      apiurll + "api/CasaDelMarisco/VerificarCorreo?Correo=" +
                      email,
                      {
                        method: "POST",
                        body: formData,
                      }
                    )
                      .then((res) => res.json())
                      .then((result) => {
                        if (result === 'Correo Existe') {
                          setEmailError('Invalido, correo existente');
                        }
                        else {
                          fetch(
                            apiurll + "api/CasaDelMarisco/AgregarUsuarios",
                            {
                              method: "POST",
                              body: data,
                            }
                          )
                            .then((res) => res.json())
                            .then((result) => {
                              if (result == "Agregado!!") {
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Completo su registro',
                                  text: 'Ahora ya puede logearse',
                                });
                                navigate("/login")
                              } else {
                                Swal.fire({
                                  icon: 'success',
                                  title: 'Error',
                                  text: 'Verifique los datos',
                                });
                              }
                            });
                        }
                      });
                  }
                  else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Parece que tu correo es invalido',
                      text: 'Ingresa un correo que sea valido antes de registrarte',
                    });
                    setEmailError('Correo invalido para registro');
                  }
                });
            }
          })




      } else {
        Swal.fire({
          icon: 'error',
          title: 'Parece que hubo un error en su registro',
          text: 'Verifique todos los datos antes de registrarse.',
        });
      }
    }
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const validateNombre = (nombre) => {
    if (nombre === '') {
      setNombreError('Acomplete este campo')
      return false;

    } else {
      if (nombre.length < 2) {
        setNombreError('minimo de 2 caracteres')
        return false;
      } else {
        const nombreRegex = /^[a-zA-ZÑñáéíóúÁÉÍÓÚ\s]+$/;
        if (nombreRegex.test(nombre)) {
          setNombreError('');
          return true;
        }
        else {
          setNombreError('No puede contener numeros');
          return false;
        }
      }
    }

  }
  const validateApellidoP = (ApellidoP) => {

    if (ApellidoP === '') {
      setApellidoPError('Complete este campo')
      return false;
    } else {
      if (ApellidoP.length < 5) {
        setApellidoPError('minimo de 5 caracteres')
        return false;
      } else {
        const nombreRegex2 = /^[a-zA-ZÜüÑñáéíóúÁÉÍÓÚ\s]+$/;
        if (nombreRegex2.test(ApellidoP)) {
          setApellidoPError('');
          return true;
        }
        else {
          setApellidoPError('No puede contener numeros');
          return false;
        }
      }
    }
  }
  const validateApellidoM = (ApellidoM) => {
    if (ApellidoM === '') {
      setApellidoMError('Complete este campo')
      return false;
    } else {
      if (ApellidoM.length < 5) {
        setApellidoMError('minimo de 5 caracteres')
        return false;
      } else {
        const nombreRegex3 = /^[a-zA-ZÜüÑñáéíóúÁÉÍÓÚ\s]+$/;
        if (nombreRegex3.test(ApellidoM)) {
          setApellidoMError('');
          return true;
        }
        else {
          setApellidoMError('No puede contener numeros');
          return false;
        }
      }
    }
  }

  const validateEmail = (email) => {
    if (email === '') {
      setEmailError('Complete este campo')
      return false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setEmailError('');
        return true;
      } else {
        setEmailError('Correo electrónico no válido');
        return false;
      }
    }
  };

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


  async function validarPasswordListanegra(password) {
    const data = new FormData();
    data.append("Contrasena", password);

    try {
      const response = await fetch(
        apiurll +
        "api/CasaDelMarisco/VerificarContrasena?Contrasena=" +
        password,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      console.log(result);

      return result === 'Contrasena aceptable';
    } catch (error) {
      console.error('Error:', error);
      return false; // Puedes manejar el error según tus necesidades
    }
  }

  const validatePassword = async (password) => {
    const data = new FormData();
    data.append("Contrasena", password);

    if (password === "") {
      setPasswordError("Complete este campo");
      return false;
    } else {
      if (password.length < 8) {
        setPasswordError("Mínimo de 8 caracteres");
        return false;
      } else {
        const passwordValidate = checkPasswordStrength(password, 8, 5);
        if (passwordValidate) {
          const isValidPassword = await validarPasswordListanegra(password);
          setPasswordError('');
          return isValidPassword;
        } else {
          setPasswordError(
            "Debe cumplir con una mayúscula, minúscula, número y caracter especial"
          );
          return false;
        }
      }
    }
  };

  const validatePassword2 = (password2) => {
    if (password2 === password) {
      setPasswordError2('')
      return true;

    } else {
      setPasswordError2('no son iguales las contraseñas')
      return false;
    }
  };

  const validateTelefono = (telefono) => {
    const telefonoRegex = /^[1-9]\d*$/;

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

  const validateFecha = (fechaNac) => {
    const fechaLimiteInferior = new Date('1890-01-01');
    const fechaActual = new Date('2024-01-01');

    const fechaIngresada = new Date(fechaNac);
    if (fechaNac === ('')) {
      setFechaError('Acomplete este campo')
      return false;
    } else if (fechaIngresada < fechaLimiteInferior || fechaIngresada > fechaActual) {
      setFechaError('La fecha no es valida');
      return false;
    } else {
      setFechaError('')
      return true;

    }
  };
  useEffect(() => {
    Swal.fire({
      title: "Registro seguro",
      text: "Esta por registrarse, asegurese de llenar cada campo y llenar con datos reales en cada apartado.",
      icon: "warning"
    });
  }, []);
  return (
    <div className='flex justify-center'>
      <div className=" registro-form-containerRegistro mt-4 m-4">

        <div className="registro-image-containerRegistro ">
          <img src={imagen} alt="Registro" className="registro-imageRegistro" />
        </div>
        <div className="registro-formRegistro pt-4">
          <p className='loginTitulo '>Sing Up</p>
          <label className='text-sm text-gray-600 mb-[14px] mt-[14px]'>Bienvenido a la Casa del Marisco ingresa los siguientes datos para poder crear tu cuenta. Los campos que tengan * son obligatorios.</label>
          <form onSubmit={handleSubmit} className='formulario'>
            <div>
              <label htmlFor="nombre" className='text-sm mb-[5px]'>Nombre* :</label>
              <br></br>
              <input
                id="nombre"
                placeholder='Luis angel'
                name="nombre"
                value={nombre}
                size={25}
                type='text'
                onChange={(e) => setNombre(e.target.value)}
                onBlur={() => validateNombre(nombre)}
                className={nombreError ? 'p-2  rounded-[10px] text-sm w-full p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}
                required
              />
              {nombreError && <p className="error-message">{nombreError}</p>}
            </div>

            <div>
              <label htmlFor="apaellidoP" className='text-sm mb-[5px]'>Apellido Paterno* :</label> <br></br>
              <input
                required
                id="apellidoP"
                name="apellidoP"
                placeholder='Ramirez'
                type='text'
                size={25}
                value={ApellidoP}
                onChange={(e) => setApellidoP(e.target.value)}
                onBlur={() => validateApellidoP(ApellidoP)}
                className={apellidoPError ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}

              />
              {apellidoPError && <p className="error-message">{apellidoPError}</p>}
            </div>

            <div>
              <label htmlFor="apellidoM" className='text-sm mb-[5px]'>Apellido Materno* :</label> <br></br>
              <input
                required
                id="apellidoM"
                name="apellidoM"
                placeholder='Martinez'
                size={25}
                type='text'
                value={ApellidoM}
                onChange={(e) => setApellidoM(e.target.value)}
                onBlur={() => validateApellidoM(ApellidoM)}
                className={apellidoMError ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}
              />
              {apellidoMError && <p className="error-message">{apellidoMError}</p>}
            </div>

            <div>
              <label htmlFor="email" className='text-sm mb-[5px]'>Correo* :</label> <br></br>
              <input
                required
                size={25}
                id="email"
                name="email"
                placeholder='ejemplo@gmail.com'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                className={emailError ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}
              />
              {emailError && <p className="error-message">{emailError}</p>}

            </div>

            <div>
              <label htmlFor="password" className='text-sm mb-[5px]'>Contraseña* :</label> <br></br>
              <div className="password-input-container">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  placeholder='contrasena_#'
                  required
                  onChange={handlePasswordChange}
                  onBlur={handleBlur}
                  className={passwordError ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}
                />
                <button type="button" onClick={togglePasswordVisibility} className="btn btn-light">
                  {passwordVisible ? (
                    <VisibilityOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  )}
                </button>
              </div>
              {passwordError && <p className="error-message">{passwordError}</p>}
              <MedidorSeguridad password={password} />
            </div>
            <div>
              <label htmlFor="password2" className='text-sm mb-[5px]'>Repetir contraseña :</label> <br></br>
              <div className="password-input-container">
                <input
                  type={passwordVisible2 ? 'text' : 'password'}
                  id="password2"
                  name="password2"
                  value={password2}
                  required
                   placeholder='contrasena_#'
                  onChange={handlePasswordChange2}
                  onBlur={handleBlur2}
                  className={passwordError2 ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}
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
            </div>
            <div>
              <label htmlFor="telefono" className='text-sm mb-[5px]'>Telefono* :</label><br></br>
              <input
                type="tel"
                id="telefono"
                placeholder='7786543423'
                name="telefono"
                value={telefono}
                size={20}
                required
                onChange={(e) => setTelefono(e.target.value)}
                onBlur={() => validateTelefono(telefono)}
                className={telefonoError ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : 'p-2 border rounded-[10px] text-sm w-full border-gray-300'}
              />
              {telefonoError && <p className="error-message">{telefonoError}</p>}
            </div>
            <div >
              <label htmlFor="fecha" className='text-sm mb-[5px]'>Fecha de nacimiento* :</label> <br></br>
              <input
                type="date"
                id="fecha"
                name="fecha"
                required
                value={fechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
                onBlur={() => validateFecha(fechaNac)}
                className={fechaError ? 'p-2  rounded-[10px] text-sm w-full border-red-200' : ' p-2 border rounded-[10px] text-sm w-full border-gray-300'}
              />
              {fechaError && <p className="error-message">{fechaError}</p>}
            </div>

            <label to='/terminos' className='recuerdame'>
              <input
                type="checkbox"
                className='cuadro'
                onChange={() => handleCheckboxChange()}
              />
              <Link to='/terminos' > Acepta los terminos y condiciones</Link>
              {TerminosError && <p className="error-message">{TerminosError}</p>}
            </label>
            <Link to='/politicas' className='recuerdame' >Politicas de privacidad</Link>

            <button className='w-full bg-orange-500  text-white py-2 rounded-lg font-semibold hover:bg-amber-600 mb-5 ' type="submit">Registrar</button><br />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Registro;