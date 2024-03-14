import React from "react";
import ItemsContainer from "../ComponentesClave/ItemsContainer";
import SocialIcons from "../ComponentesClave/SocialIcons";
import { Icons } from "../ComponentesClave/Menus";
import { Link } from "react-router-dom";

import './css/foter.css';    

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white" style={{marginTop:'100px'}}>
      <ItemsContainer />
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10
      text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2024 Appy. Todos los Derechos Reservados.</span>
       
        <SocialIcons Icons={Icons} />
      </div>
    </footer>
  );
};

export default Footer;