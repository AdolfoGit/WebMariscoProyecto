import React, { useState, useEffect } from "react";
import logo from "../img/LogoVersion2.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";

import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";

import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

// Importa el hook useUser para obtener la información del usuario
import { useUser } from "../../../UserContext";

// Saber dónde estoy
import { useLocation } from "react-router-dom";

import MenuFlotante from "./MenuFlotante";

import Breadcrumbs from "../../ComponentesClave/Breadcrums";

export const Header = () => {
  const [isHome, setIsHome] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsHome(location.pathname === "/");
  }, [location.pathname]);

  const navigate = useNavigate();

  const { user, logoutUser } = useUser();

  const cerrarSesion = () => {
    logoutUser();
    navigate("/");
    Swal.fire({
      icon: "warning",
      title: "Nos vemos pronto",
      text: "Cerraste sesión, nos vemos y recuerdanos cuando te de hambre",
    });
  };

  const profileMenuItems = [
    {
      label: "Mi Perfil",
      icon: UserCircleIcon,
      path: "/perfil",
    },
    {
      label: "Editar Perfil",
      icon: Cog6ToothIcon,
      path: "/perfil",
    },

    {
      label: "Ayuda",
      icon: LifebuoyIcon,
      path: "/ayuda",
    },
    {
      label: "Cerrar Sesión",
      icon: PowerIcon,
      onClick: cerrarSesion,
    },
  ];

  const [sidebar, setSidebar] = useState(false);

  window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    header.classList.toggle("active", window.scrollY > 200);
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header className={`header ${isHome ? "home-header" : ""}`}>
        {user && user.Rol === 2 ? (
          <>
          </>
        ) : (
          <>
            <div className="container flex ">
              <div className="logo z-10 flex items-center justify-start">
                <img src={logo} alt="hj" />
                <Breadcrumbs />
              </div>
              <div className="nav z-10">
                <ul
                  className={sidebar ? "nav-links-sidebar" : "nav-links"}
                  onClick={() => setSidebar(false)}
                >
                  <li className={location.pathname === "/" ? "active" : ""}>
                    <Link to="/">Inicio</Link>
                  </li>
                  <li>
                    <MenuFlotante />
                  </li>
                  <li
                    className={
                      location.pathname === "/productos" ? "active" : ""
                    }
                  >
                    <Link to="/productos">Menus</Link>
                  </li>
                  <li
                    className={location.pathname === "/ofertas" ? "active" : ""}
                  >
                    <Link to="/ofertas">Ofertas</Link>
                  </li>

                  {user ? (
                    <>
                      <li
                        className={
                          location.pathname === "/pedidos" ? "active" : ""
                        }
                      >
                        <Link to="/pedidos">Pedidos</Link>
                      </li>
                      <li
                        className={
                          location.pathname === "/reservaciones" ? "active" : ""
                        }
                      >
                        <Link to="/reservaciones">Reservaciones</Link>
                      </li>
                      <li className="username">{user.Nombre}</li>
                      <li className="icon">
                        <Menu
                          open={isMenuOpen}
                          handler={setIsMenuOpen}
                          placement="bottom-end"
                        >
                          <MenuHandler>
                            <Button
                              variant="text"
                              color="blue-gray"
                              className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                            >
                              <Avatar
                                variant="circular"
                                className="border border-gray-900 p-0.5"
                                withBorder={true}
                                size="sm"
                                src={user.Icono}
                              />
                              <ChevronDownIcon
                                strokeWidth={2.5}
                                className={`h-6 w-6 transition-transform ${
                                  isMenuOpen ? "rotate-180" : ""
                                }`}
                              />
                            </Button>
                          </MenuHandler>
                          <MenuList className="p-2">
                            {profileMenuItems.map(
                              ({ label, icon, path, onClick }, key) => {
                                const isLastItem =
                                  key === profileMenuItems.length - 1;
                                return (
                                  <MenuItem
                                    key={label}
                                    onClick={onClick ? onClick : closeMenu}
                                    className={`flex items-center rounded ${
                                      isLastItem
                                        ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                        : ""
                                    }`}
                                  >
                                    {React.createElement(icon, {
                                      className: `h-5 w-5 ${
                                        isLastItem ? "text-red-500" : ""
                                      }`,
                                      strokeWidth: 2,
                                    })}
                                    <Typography
                                      as="span"
                                      variant="small"
                                      className="font-normal text-md"
                                      color={isLastItem ? "red" : "inherit"}
                                    >
                                      <Link to={path}>{label}</Link>
                                    </Typography>
                                  </MenuItem>
                                );
                              }
                            )}
                          </MenuList>
                        </Menu>
                      </li>
                    </>
                  ) : (
                    <li
                      className={location.pathname === "/login" ? "active" : ""}
                    >
                      <Link to="/login">
                        <Button
                          variant="text"
                          size="sm"
                          className={`Button ${
                            isHome
                              ? " text-[14px] text-white lg:ml-[190px] sm:ml-0 "
                              : "  negro text-[14px] text-black-900  lg:ml-[190px] sm:ml-0"
                          }`}
                        >
                          Login
                        </Button>
                      </Link>
                      <Link to="/registrar">
                        <Button
                          color="orange"
                          variant="filled"
                          size="sm"
                          className="text-[14px] ml-5 sm:ml-0"
                        >
                          Sing Up
                        </Button>
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
              <button
                className="navbar-items-icon btn"
                onClick={() => setSidebar(!sidebar)}
              >
                {sidebar ? <CloseIcon /> : <MenuIcon />}
              </button>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
