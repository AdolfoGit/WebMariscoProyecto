import React from 'react';
import './css/foter.css';
import logo from  '../home/img/logo.png';
import { Link } from 'react-router-dom';
const Fotter = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',   
    });
  };

import './css/foter.css';    

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 Appy. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;