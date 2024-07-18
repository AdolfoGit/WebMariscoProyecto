import React, { useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import { Lock } from "@mui/icons-material";
import ImageIcon from '@mui/icons-material/Image';
import { useUser } from "../../UserContext"; // Ajusta la ruta según tu estructura de archivos
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadFilesUsuarios } from "../../firebase/firebase";
import Direcciones from "./Direcciones";

const Perfil = () => {
 // const apiurll = "http://localhost:5029/";
 const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
 

  const [isOpen, setIsOpen] = useState(false);
  const abrir=()=>{
    setIsOpen(true)
  }
  const cerar=()=>{
    setIsOpen(false)
    setFile(null)
    setImageURL(null)

  }
  async function getLatLong(address, apiKey) {
    const baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
    const url = `${baseUrl}?address=${encodeURIComponent(address)}&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === "OK") {
            const location = data.results[0].geometry.location;
            return { lat: location.lat, lng: location.lng };
        } else {
            console.error("Error en la geocodificación:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Error en la solicitud de geocodificación:", error);
        return null;
    }
}

// Ejemplo de uso
const address = "43000";
const apiKey = "AIzaSyBMZxb7lHGBmYbaV8uDoiSjenlPxhwgS1M";

getLatLong(address, apiKey).then(location => {
    if (location) {
        console.log(`Latitud: ${location.lat}, Longitud: ${location.lng}`);
    } else {
        console.log("No se pudo obtener la latitud y longitud.");
    }
});


// Ejemplo de uso



 const [File, setFile] = useState(null);
 const [imageURL, setImageURL] = useState(null);

  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
    const imageURL = URL.createObjectURL(droppedFile);
    setImageURL(imageURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!File) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor selecciona una imagen.",
      });
      return;
    }
    
    // Verificar si el archivo seleccionado es una imagen
    if (!File.type.startsWith("image")) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El archivo seleccionado no es una imagen.",
      });
      return;
    }
    const result = await uploadFilesUsuarios(File);
    const data = new FormData();
      data.append("idUsuario", user.idUsuario);
      data.append("Icono", result);
      fetch(
        apiurll +
          "api/CasaDelMarisco/SubirIcono",
        {
          method: "POST",
          body: data,
          
        }
      ).then((res) => res.json())
      .then((result) => {
        if(result === 'Icono actualizado'){
          Swal.fire({
            icon: "warning",
            title: "Nos vemos pronto",
            text: "Si se subio",
          });
          setIsOpen(false)
          setFile(null)
          setImageURL(null)
        }
      }
      )
    console.log(result);
  };
  const cerrarSesion = () => {
    logoutUser();
    navigate("/");
    Swal.fire({
      icon: "warning",
      title: "Nos vemos pronto",
      text: "Cerraste sesión, nos vemos y recuerdanos cuando te de hambre",
    });
  };
  const irDirecciones = () => {
    navigate('/direcciones');
  };
  return (
    <Grid container spacing={3} justifyContent="center" marginBottom={5}>
      <Grid item xs={12} sm={8} md={6}>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
              alignItems="center"
              justifyContent="center"
            >
              <Grid item>
                {user.Icono ? (
                    <img class="inline-block h-40 w-40 rounded-full ring-2 ring-white" src={user.Icono} alt="" />

                ) : (
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/la-casa-del-marisco-web.appspot.com/o/WhatsApp%20Image%202024-03-07%20at%204.52.30%20PM.jpeg?alt=media&token=a9b8a667-c054-458e-914f-8e3a3e355805"
                    class=""
                    style={{ height: "150px", borderRadius: "40px" }}
                    alt="..."
                  ></img>
                )}
               
                  {isOpen &&(
                     <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                     <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                     <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                       <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
                         <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-6 sm:w-full sm:max-w-lg">
                           <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                           <form onSubmit={(e) => handleSubmit(e)}>
                           <div className="mx-auto max-w-xs" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
                              {imageURL ? (
                                <img src={imageURL} alt="Imagen seleccionada" className="mx-auto inline-flex h-60 w-60 rounded-20 bg-gray-100" />
                              ) : (
                                <label className="flex w-full cursor-pointer appearance-none items-center justify-center rounded-md border-2 border-dashed border-gray-200 p-6 transition-all hover:border-primary-300">
                                  <div className="space-y-2 text-center">
                                    <div className="mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-6 w-6 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                      </svg>
                                    </div>
                                    <div className="text-gray-600"><a href="#" className="font-medium text-primary-500 hover:text-primary-700">Haz clic para subir</a> o arrastra y suelta</div>
                                    <p className="text-sm text-gray-800">PNG, JPG (máx. 800x400px)</p>
                                  </div>
                                  <input id="example5"
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={(e) => {
                                      setFile(e.target.files[0]);
                                      const imageURL = URL.createObjectURL(e.target.files[0]);
                                      setImageURL(imageURL);
                                    }} />
                                </label>
                              )}
                            </div>
                            <div className="bg-gray-100 rounded-md mt-2 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              {File && <button type="submit" className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto">Subir</button>}{""}
                              <button type="button" onClick={()=>cerar()} className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-300 sm:mt-0 sm:w-auto">Cancelar</button>
                            </div>
                          </form>
                           </div>
                         </div>
                       </div> 
                     </div>
                   </div>
                  )}

              </Grid>
              <Grid item>
                <Typography variant="h5">
                  {user
                    ? `${user.Nombre} ${user.ApellidoPaterno}`
                    : "Nombre del Usuario"}
                </Typography>
                <Typography variant="h5">
                  Correo: {user ? user.Correo : "Correo del Usuario"}
                </Typography>
                <Typography variant="h5">
                  Telefono: {user ? user.Telefono : "Telefono del Usuario"}
                </Typography>
                <Typography variant="h5">
                  Estado de la cuenta:{" "}
                  {user ? user.Rol : "Estado de la cuenta del Usuario"}
                </Typography>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography variant="h5">Opciones</Typography>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <Button>Cambiar Contraseña</Button>
                  <ListItemIcon>
                    <ImageIcon />
                  </ListItemIcon>
                  <Button onClick={()=>abrir()}>Cambiar Foto de Perfil</Button>
                </ListItem>  
                <ListItem>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <Button onClick={irDirecciones}>Direcciones</Button>
                  
                </ListItem>  
              </List>
              <Button
                variant="contained"
                style={{ marginTop: "20px", backgroundColor: "#ff8c00" }}
              >
                Editar Perfil
              </Button>
              <Button
                variant="contained"
                style={{ marginTop: "20px", backgroundColor: "#ff8c00" }}
                onClick={cerrarSesion}
              >
                Cerrar sesión
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      
    </Grid>

    
    

  );
};

export default Perfil;
