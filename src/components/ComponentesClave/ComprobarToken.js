import { useUser } from '../../UserContext'; // Ajusta la ruta según tu estructura de archivos



export const VerificarToken = async () => {
    
    const apiurl = "https://lacasadelmariscoweb.azurewebsites.net/";
    const { user } = useUser();
    const correo = user && user.Correo;
    const token = user && user.Token;

    if (correo && token) {
      const data = {}; // ajusta los datos según tus necesidades
      try {
        const result = await fetch(
          `${apiurl}api/CasaDelMarisco/MantenerSesion?Correo=${correo}&Token=${token}`,
          {
            method: 'POST',
            body: JSON.stringify(data),
          }
        );

        const resultData = await result.json();

        if (resultData === 'Token invalido') {
            console.log('Ta canijo')
          // Si el token es inválido, redirige a la página de inicio de sesión
          //navigate('/login');
        }
        else{
            console.log('No Ta canijo')   
        }

      } catch (error) {
        console.error('Error al verificar el token:', error);
        // Manejar el error según tus necesidades
      }
    }
  }
