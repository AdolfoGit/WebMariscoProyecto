import React, { useState, useEffect,Al } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../UserContext';

const ProtectorRutas = () => {
     // Obtén la información del usuario desde el contexto
    const { user, logoutUser } = useUser();
    
    if (!user) {
        alert(user);
        return <Navigate to='/login' />;
       
    }

    return <Outlet />;
};

export default ProtectorRutas;
