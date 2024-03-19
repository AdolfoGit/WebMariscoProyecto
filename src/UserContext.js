import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js'; // Importa la biblioteca de encriptación

const UserContext = createContext();
const ENCRYPTION_KEY = 'Soymainekko1#'; // Clave para la encriptación, cámbiala por una clave segura

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Intentar cargar el usuario desde la cookie al cargar la aplicación
    const storedUser = Cookies.get('userData');
    if (storedUser) {
      // Desencriptar la información de la cookie
      const decryptedUser = CryptoJS.AES.decrypt(storedUser, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      setUser(JSON.parse(decryptedUser));
    }
    const storedCart = Cookies.get('cart');
    if (storedCart) {
      // Desencriptar la información del carrito de la cookie
      const decryptedCart = CryptoJS.AES.decrypt(storedCart, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      setCart(JSON.parse(decryptedCart));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    // Encriptar y almacenar el usuario en la cookie
    Cookies.set('userData', CryptoJS.AES.encrypt(JSON.stringify(userData), ENCRYPTION_KEY).toString());
  };

  const logoutUser = () => {
    setUser(null);
    // Eliminar la cookie al cerrar sesión
    Cookies.remove('userData');
  };
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    // Encriptar y almacenar el carrito en la cookie
    Cookies.set('cart', CryptoJS.AES.encrypt(JSON.stringify(updatedCart), ENCRYPTION_KEY).toString());
  };
  

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    // Actualizar el carrito en la cookie
    Cookies.set('cart', CryptoJS.AES.encrypt(JSON.stringify(updatedCart), ENCRYPTION_KEY).toString());
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, cart, addToCart, removeFromCart }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
