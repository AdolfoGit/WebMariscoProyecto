import React, { useState, useEffect ,useRef} from "react";
import Swal from "sweetalert2";
import { useUser } from "../../UserContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, Typography} from "@material-tailwind/react";
import { GoogleMap, useLoadScript, Autocomplete, Marker } from '@react-google-maps/api';


const CONFIGURATION = {
  ctaTitle: 'Encuentrame',
  mapOptions: {
    center: { lat: 37.4221, lng: -122.0841 },
    fullscreenControl: true,
    mapTypeControl: false,
    streetViewControl: true,
    zoom: 12,
    zoomControl: true,
    maxZoom: 22,
    mapId: '',
  },
  mapsApiKey: 'AIzaSyBMZxb7lHGBmYbaV8uDoiSjenlPxhwgS1M',
  capabilities: {
    addressAutocompleteControl: true,
    mapDisplayControl: true,
    ctaControl: true,
  },
};


const SHORT_NAME_ADDRESS_COMPONENT_TYPES = new Set(['street_number', 'administrative_area_level_1', 'postal_code']);
const ADDRESS_COMPONENT_TYPES_IN_FORM = ['location', 'locality', 'administrative_area_level_1', 'postal_code', 'country'];


const Reservaciones = () => {


  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: CONFIGURATION.mapsApiKey,
    libraries: ['places'],
  });


  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  const navigate = useNavigate();

  const { user, logoutUser } = useUser();

  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [calle, setCalle] = useState("");
  const [colonia, setColonia] = useState("");
  const [numeroExterior, setNumeroExterior] = useState("");
  const [numeroInterior, setNumeroInterior] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [estado, setEsado] = useState("");
  const [cp, setCP] = useState("");
  const [InformacionAdicional, setInformacionAdicional] = useState("");
  const [loading, setLoading] = useState(true);
  const [direcciones,setDirecciones]= useState([]);


  const [calleE, setCalleE] = useState("");
  const [coloniaE, setColoniaE] = useState("");
  const [numeroExteriorE, setNumeroExteriorE] = useState("");
  const [numeroInteriorE, setNumeroInteriorE] = useState("");
  const [municipioE, setMunicipioE] = useState("");
  const [estadoE, setEsadoE] = useState("");
  const [cpE, setCPE] = useState("");
  const [InformacionAdicionalE, setInformacionAdicionalE] = useState("");
  const [idDireccionEspecifica, setIdDireccionEspecifica]= useState("");

  const [place, setPlace] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("Calle", calle);
    formData.append("Colonia", colonia);
    formData.append("NumeroInterior", numeroInterior);
    formData.append("NumeroExterior", numeroExterior);
    formData.append("CP", cp);
    formData.append("Estado", estado);
    formData.append("Ciudad", municipio);
    formData.append("UsuarioID", user.idUsuario);
    formData.append("Referencias", InformacionAdicional);
    formData.append("Lat", latitud);
    formData.append("Long", longitud);

    fetch(apiurll + "/api/CasaDelMarisco/AgregarDireccion", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
       if(result=="Exito"){
          Swal.fire({
            icon: "success",
            title: "Accion realizado con exito",
            text: "",
          });

          window.location.reload();
       }else{
          Swal.fire({
            icon: "failed",
            title: "No se realizo ",
            text: "Verifique todos los datos en el apartado de reservaciones.",
          });
       
       }
      });

  };

  
  const direccionEspecifica= async (idDireccion)=>{
    setIdDireccionEspecifica(idDireccion)
    try {
      const response = await fetch(
        apiurll + `/api/CasaDelMarisco/TraerDireccionPorId?DireccionID=${idDireccion}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data)     
      setCalleE(data.Calle);
      setColoniaE(data.Colonia);
      setNumeroExteriorE(data.NumeroExterior);
      setNumeroInteriorE(data.NumeroInterior);
      setMunicipioE(data.Ciudad);
      setEsadoE(data.Estado);
      setCPE(data.CP);
      setInformacionAdicionalE(data.Referencias);
    } catch (error) {
      console.error("Error al obtener la informacion:", error);
    } finally {
      setLoading(false); 
    }
  }



  useEffect(() => {
    obtenerDirecciones()
  }, []);


  const obtenerIdUsuario = (user) => {
    return user && user.idUsuario ? user.idUsuario : null;
  };

  const obtenerDirecciones = async () => {

      try {
        const response = await fetch(
          apiurll + `/api/CasaDelMarisco/TraerDirecciones?UsuarioID=${user.idUsuario}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();     
        if (Array.isArray(data)) {
          setDirecciones(data);
          console.log("Direcciones obtenidas:", data);
        } else {
          console.error("La respuesta de la API no es un array:", data);
          setDirecciones([]);
        }
       
      } catch (error) {
        console.error("Error al obtener reservaciones:", error);
      } finally {
        setLoading(false); 
      }
  
  };

  const actualizarDireccion = async () => {
    const data = new FormData();
    data.append("Calle",calleE);
    data.append("Colonia",coloniaE);
    data.append("NumeroInterior",numeroInteriorE);
    data.append("NumeroExterior",numeroExteriorE);
    data.append("CP",cpE);
    data.append("Estado",estadoE);
    data.append("Ciudad",municipioE);
    data.append("UsuarioID",user.idUsuario);
    data.append("DireccionID",idDireccionEspecifica);
    data.append("Referencias",InformacionAdicionalE)
   
     fetch(
        apiurll + "/api/CasaDelMarisco/EditarDireccion",
        {
          method: "POST",
          body: data,
        }
      )
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
        if (result === 'Exito') {
            Swal.fire({
                icon: 'success',
                title: 'Actualizado',
                text: 'Realizado con exito',
            });
            window.location.reload();
        } else {
            Swal.fire({
                icon: 'failed',
                title: 'Failed',
                text: 'Ha ocurrido un error verifique los datos',
            });
        }
        })
        .catch((error) => {
            console.error('Error al realizar la solicitud:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ha ocurrido un error al procesar la solicitud',
            });
        });
   
  }

  const handlePlaceChanged = () => {
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      alert(`No details available for input: '${place.name}'`);
      return;
    }
    setPlace(place);
    fillInAddress(place);
  };

  const fillInAddress = (place) => {
    const getComponentName = (componentType) => {
      for (const component of place.address_components || []) {
        if (component.types[0] === componentType) {
          return SHORT_NAME_ADDRESS_COMPONENT_TYPES.has(componentType)
            ? component.short_name
            : component.long_name;
        }
      }
      return '';
    };

    const getComponentText = (componentType) => {
      return componentType === 'location'
        ? `${getComponentName('street_number')} ${getComponentName('route')}`
        : getComponentName(componentType);
    };

    ADDRESS_COMPONENT_TYPES_IN_FORM.forEach((componentType) => {
      const element = document.getElementById(`${componentType}-input`);
      if (element) {
        const value = getComponentText(componentType);
        element.value = value;
  
        switch(componentType) {
          case 'location':
            setCalle(value);
            break;
          case 'locality':
            setMunicipio(value);
            break;
          case 'postal_code':
            setCP(value);
            break;
          case 'administrative_area_level_1':
            setEsado(value);
            break;
        }
      }
    });

    const coloniaValue = getComponentName('sublocality_level_1') || getComponentName('neighborhood');
    if (coloniaValue) {
      setColonia(coloniaValue);
      const coloniaInput = document.getElementById('route-input');
      if (coloniaInput) coloniaInput.value = coloniaValue;
    }
  

    
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
    setLatitud(lat.toString());
    setLongitud(lng.toString());
  };

  useEffect(() => {
    if (place && map) {
      const location = place.geometry.location;
      map.panTo(location);
      marker.setPosition(location);
    }
  }, [place, map, marker]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const toggleFormVisibility = () => {
    setFormVisible(!formVisible);
  };

 
  return (
    <div className="container mt-3 mb-5">
      <div className="row">
        <div className="col ml-2">
          <h1>Reservaciones</h1>
        </div>
        <div className="col-md-auto"></div>
        <div className="col col-lg-2 ">
          <Button 
            className="flex items-center gap-2 text-[9px]"
            onClick={toggleFormVisibility}
            color="blue"     
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
              />
            </svg>
            {formVisible ? "Cerrar" : "Agregar nueva direccion"}
          </Button>
        </div>
        
        <div className={`transition-all duration-300 ${formVisible ? 'block' : 'hidden'}`}>
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold mb-2 text-3xl">Datos de envio</h1>
            <div class="grid grid-cols-3 gap-3">
              <div className="col-span-2 ">
              <label for="Nombre" class="form-label text-[15px] text-gray-600">
                  Calle
                </label>
              <Autocomplete className=""
                onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                onPlaceChanged={handlePlaceChanged}
              >
                <input
                  type="text"
                  placeholder="ingresa tu calle aqui"
                  id="location-input"
                  style={{height:'30px'}}
                  className="form-control rounded-lg w-full text-xl"
                  onChange={(e) => setCalle(e.target.value)}
                />
              </Autocomplete>
            

              </div>
              <div>
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                    Numero Exterior
                </label>
                <input
                  type="number"
                  style={{height:'30px'}}
                  class="form-control rounded-lg text-xl"
                  placeholder="203"
                  id="Nombre"
                  aria-describedby=""
                  onChange={(e) => setNumeroExterior(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
                
              </div>
              <div>
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                  Numero Interior
                </label>
                <input
                  type="text"
                  style={{height:'30px'}}
                  class="form-control rounded-lg text-xl"
                  placeholder="112"
                  aria-describedby=""
                  onChange={(e) => setNumeroInterior(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
                
              </div>
              <div className=" col-span-2">
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                    Colonia
                </label>
                <input
                  type="text"
                  style={{height:'30px'}}
                  class="form-control rounded-lg text-xl"
                  placeholder="5 de Mayo"
                    id="route-input"
                  aria-describedby=""
                  onChange={(e) => setColonia(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
                
              </div>
              <div className="">
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                  Municipio
                </label>
                <input
                  type="text"
                  style={{height:'30px'}}
                  class="form-control rounded-lg text-xl"
                  placeholder="Huejutla"
                  id="locality-input"
                  aria-describedby=""
                  onChange={(e) => setMunicipio(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
              
              </div>
              <div>
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                  Estado
                </label>
                <input
                  type="text"
                  style={{height:'30px'}}
                  class="form-control rounded-lg text-xl"
                  placeholder="Hidalgo"
                  id="administrative_area_level_1-input"
                  aria-describedby=""
                  onChange={(e) => setEsado(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
                
              </div>
              
              <div>
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                    C.P.
                </label>
                <input
                  type="number"
                  style={{height:'30px'}}
                  class="form-control rounded-lg text-xl"
                  placeholder="43000"
                  id="postal_code-input"
                  aria-describedby=""
                  onChange={(e) => setCP(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
                
              </div>
              <div className="col-span-3">
                <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                    Referencias
                </label>
                <textarea
                  type="text"
                  
                  class="form-control rounded-lg borde-0 h-40 text-xl"
                  placeholder="Referencias a lado de un pozo color azul"
                  id="Nombre"
                  aria-describedby=""
                  onChange={(e) => setInformacionAdicional(e.target.value)}
                  //onBlur={() => validateNombre(nombre)}
                />
              
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2 w-full mt-5 ">
              <div className=" col-end-5 col-span-1 ">
                <Button 
                color="green"
                type="submit"
                className="text-[12px] w-full "
                variant="filled">
                  Guardar
                </Button>
              </div>
             
            </div>
          </form>

        </div>

        <div className={`transition-all duration-300 ${formVisible ? 'hidden' : 'block'}`}>
          <div className="mt-3 ml-10 mr-10 flex flex-wrap gap-4 sm:gap-4 md:gap-6 justify-start">
          {direcciones.length > 0 ? (
          direcciones.map((midirecciones) => (
  
              <Card className="w-full max-w-[45rem] flex-row">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 w-[22rem] shrink-0 rounded-r-none"
              >
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29994.591853071897!2d-98.43775867731902!3d21.140299887558825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d726e6a957507f%3A0x9817745b73d7d2cd!2sHuejutla%20de%20Reyes%2C%20Hgo.%2C%20M%C3%A9xico!5e0!3m2!1ses!2sus!4v1689111604704!5m2!1ses!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
              </CardHeader>
              <CardBody className="justify-start">
                <Typography variant="h6" color="gray" className="mb-4 uppercase">
                  Tu Dirección
                </Typography>
                <Typography variant="h4" color="blue-gray" className="mb-2">
                  {midirecciones.Colonia}, {midirecciones.Calle}
                </Typography>
                <Typography color="gray" className="mb-8 font-normal text-[13px]">
                  Referencias de apoyo:
                  {midirecciones.Referencias}
                </Typography>
                <a href="#" className="inline-block">
                  <Button 
                  variant="text" 
                  className="flex items-center gap-2 text-[12px]"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"  
                  onClick={()=> direccionEspecifica(midirecciones.DireccionID)}
                  >
                    Editar dirección
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-7 w-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
              </CardBody>
            </Card>
    
            ))
          ) : (
            <p>No hay direcciones disponibles.</p>
          )}   
          </div>
        </div>
      </div>
      
      <div
        class="modal fade"
        id="exampleModal2"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div className="p-2 mt-2 mr-2 flex justify-end">
              <Button
                variant="text"
                color="gray"
                data-bs-dismiss="modal"
                className="p-0 min-w-2"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
             
            </div>
            <form onSubmit={handleSubmit}>
              <div class="modal-body pr-16 pl-16 pb-3">
                <h1 className="font-bold mb-2 text-3xl">Actualizacion de los datos de direccion</h1>
                <div class="grid grid-cols-3 gap-3">
                  <div className="col-span-2 ">
                    <label for="Nombre" class="form-label text-[15px] text-gray-600">
                      Calle
                    </label>
                    <input
                      type="text"
                      style={{height:'30px'}}
                      value={calleE}
                      class="form-control rounded-lg w-full text-xl"
                      placeholder="ingresa tu calle aqui"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setCalleE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  
                  </div>
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        Numero Exterior
                    </label>
                    <input
                      type="number"
                      value={numeroExteriorE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="203"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setNumeroExteriorE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Numero Interior
                    </label>
                    <input
                      type="text"
                      value={numeroInteriorE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Hidalgo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setNumeroInteriorE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                  <div className=" col-span-2">
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        Colonia
                    </label>
                    <input
                      type="text"
                      value={coloniaE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="5 de Mayo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setColoniaE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                    
                  </div>
                  <div className="">
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Municipio
                    </label>
                    <input
                      type="text"
                      value={municipioE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Huejutla"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setMunicipioE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  
                  </div>
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                      Estado
                    </label>
                    <input
                      type="text"
                      value={estadoE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="Hidalgo"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setEsadoE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                 
                  <div>
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        C.P.
                    </label>
                    <input
                      type="number"
                      value={cpE}
                      style={{height:'30px'}}
                      class="form-control rounded-lg text-xl"
                      placeholder="43000"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setCPE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                   
                  </div>
                  <div className="col-span-3">
                    <label for="NPersonas" class="form-label text-[15px] text-gray-600">
                        Referencias
                    </label>
                    <textarea
                      type="text"
                      value={InformacionAdicionalE}
                      class="form-control rounded-lg borde-0 h-40 text-xl"
                      placeholder="Referencias a lado de un pozo color azul"
                      id="Nombre"
                      aria-describedby=""
                      onChange={(e) => setInformacionAdicionalE(e.target.value)}
                      //onBlur={() => validateNombre(nombre)}
                    />
                  
                  </div>
                </div>

              
              </div>
              <div class="modal-footer pr-16 pl-16 mb-3">
                    
                <div className=" w-full">
                  <Button 
                  onClick={()=>actualizarDireccion()}
                  color="blue"
                  className="text-[12px] w-full "
                  variant="filled">
                    Actualizar
                  </Button>
                </div>
 
              </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservaciones;
