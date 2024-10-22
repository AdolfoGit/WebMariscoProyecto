import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'; // Importar PropTypes
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const UserContext = createContext();
const ENCRYPTION_KEY = 'Soymainekko1#';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedUser = Cookies.get('userData');
    if (storedUser) {
      const decryptedUser = CryptoJS.AES.decrypt(storedUser, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      setUser(JSON.parse(decryptedUser));
    }
    const storedCart = Cookies.get('cart');
    if (storedCart) {
      const decryptedCart = CryptoJS.AES.decrypt(storedCart, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      setCart(JSON.parse(decryptedCart));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    Cookies.set('userData', CryptoJS.AES.encrypt(JSON.stringify(userData), ENCRYPTION_KEY).toString());
  };

  const logoutUser = () => {
    setUser(null);
    Cookies.remove('userData');
  };

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    Cookies.set('cart', CryptoJS.AES.encrypt(JSON.stringify(updatedCart), ENCRYPTION_KEY).toString());
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    Cookies.set('cart', CryptoJS.AES.encrypt(JSON.stringify(updatedCart), ENCRYPTION_KEY).toString());
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, cart, addToCart, removeFromCart }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validar que children es requerido y debe ser un nodo (cualquier cosa que React pueda renderizar)
};

export const useUser = () => {
  return useContext(UserContext);
};
