import React from 'react';
import { Avatar, Button, Card, CardContent, Grid, Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { useUser } from '../../UserContext'; // Ajusta la ruta según tu estructura de archivos
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
const Perfil = () => {
  //const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
  
  
  const navigate = useNavigate();
  const { user, logoutUser } = useUser();

  // const VerificarToken = async () => {
  //   try {
  //   const data = new FormData();
  //   data.append("Correo", user.Correo);
  //   data.append("Token", user.Token);

  //     const result = await fetch(
  //       `${apiurll}api/CasaDelMarisco/MantenerSesion?Correo=${user.Correo}&Token=${user.Token}`,
  //       {
  //         method: "POST",
  //         body: data,
  //       }
  //     );

  //     const resultData = await result.json();

  //     if (resultData === "Token invalido") {
  //       console.log("Token inválido");
  //       navigate("/");
  //       Swal.fire({
  //         icon: "warning",
  //         title: "Al parecer iniciaste sesión en otro dispositivo",
  //         text: "Tu cuenta en este dispositivo o navegador se cerro.",
  //       });
  //       logoutUser();

  //     } else {
  //       console.log("Token válido");
  //     }
  //   } catch (error) {
  //     console.error("Error al verificar el token:", error);
  //     logoutUser();
  //     navigate("/");
  //     Swal.fire({
  //       icon: "warning",
  //       title: "Al parecer iniciaste sesión en otro dispositivo",
  //       text: "Tu cuenta en este dispositivo o navegador se cerro.",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     VerificarToken(navigate, setLoading);
  //   }, 2000);
  //   return () => clearTimeout(timerId);
  // }, [navigate]);

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
                <Avatar
                  alt="Usuario"
                  src="/ruta/a/tu/imagen.jpg"
                  sx={{ width: 100, height: 100 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h4">{user ? `${user.Nombre} ${user.ApellidoPaterno}` : 'Nombre del Usuario'}</Typography>
                <Typography variant="subtitle1">Correo: {user ? user.Correo : 'Correo del Usuario'}</Typography>
                <Typography variant="subtitle1">Telefono: {user ? user.Telefono : 'Telefono del Usuario'}</Typography>
                <Typography variant="subtitle1">Estado de la cuenta: {user ? user.Rol : 'Estado de la cuenta del Usuario'}</Typography>
              </Grid>
            </Grid>
            <Box mt={3}>
              <Typography variant="h6">Opciones</Typography>
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
