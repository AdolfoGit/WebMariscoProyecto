import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Intentar cargar el usuario desde la cookie al cargar la aplicación
    const storedUser = Cookies.get('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    // Almacenar el usuario en la cookie
    Cookies.set('userData', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    // Eliminar la cookie al cerrar sesión
    Cookies.remove('userData');
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
