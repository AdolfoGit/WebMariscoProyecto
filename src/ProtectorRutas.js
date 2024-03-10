import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../src/UserContext';

const ProtectorRutas = () => {
    const { user } = useUser();
    const [userData, setUserData] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            // Aquí debes volver a obtener los datos del usuario
            const updatedUser = user.Rol
            setUserData(updatedUser);
        }, 1000); // Actualizar cada segundo

        return () => clearInterval(interval); // Limpieza del intervalo cuando el componente se desmonta
    }, []);
    console.log(userData)
    if ( userData ==false ) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};

export default ProtectorRutas;
