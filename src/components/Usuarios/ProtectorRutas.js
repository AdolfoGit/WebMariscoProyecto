import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../UserContext';

const ProtectorRutas = () => {
    const { user, logoutUser } = useUser();

    useEffect(() => {
        
    }, []); 

    // Verifica si el usuario no está autenticado
    if (!user) {
        return <Navigate to='/login' />;
    }

    return <Outlet />;
};

export default ProtectorRutas;
