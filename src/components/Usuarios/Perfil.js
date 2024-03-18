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
import { useUser } from "../../UserContext"; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { uploadFilesUsuarios } from "../../firebase/firebase";
const Perfil = () => {
  const apiurll = "http://localhost:5029/";
  const [File, setFile] = useState(null);

  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                  <img
                    src={user.Icono}
                    class=""
                    style={{ height: "150px", borderRadius: "40px" }}
                    alt="..."
                  ></img>
                ) : (
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/la-casa-del-marisco-web.appspot.com/o/WhatsApp%20Image%202024-03-07%20at%204.52.30%20PM.jpeg?alt=media&token=a9b8a667-c054-458e-914f-8e3a3e355805"
                    class=""
                    style={{ height: "150px", borderRadius: "40px" }}
                    alt="..."
                  ></img>
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {File && <button type="submit">Cambiar imagen</button>}{" "}
                </form>
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
                <ListItem button>
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Cambiar Contraseña" />
                </ListItem>
                {/* Agrega más elementos de la lista según sea necesario */}
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
