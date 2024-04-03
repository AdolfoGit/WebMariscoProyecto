import React, {useState} from 'react';
import { useLocation, Link ,useNavigate} from "react-router-dom";
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Breadcrumbs,
  Input,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  BellIcon,
  ClockIcon,
  CreditCardIcon,
  Bars3Icon,
  CubeTransparentIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setOpenSidenav,
} from "../../context/index";
import { useUser } from '../../UserContext';
import Swal from "sweetalert2";

export function DashboardNavbar() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { fixedNavbar, openSidenav } = controller;
  const { pathname } = useLocation();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

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
       path:'/perfil'
    },
    {
      label: "Editar Perfil",
      icon: Cog6ToothIcon,
      path:'/perfil'
    },
 
    {
      label: "Ayuda",
      icon: LifebuoyIcon,
      path:'/ayuda'
    },
    {
      label: "Cerrar Sesión",
      icon: PowerIcon,
      onClick: cerrarSesion,
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
 
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Navbar
      color={fixedNavbar ? "trasnparent" : "white"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-8 z-40 py-8 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 lg:flex-row lg:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`p-0 transition-all  ${
              fixedNavbar ? " bg-transparent  mt-1" : ""
            }`}
          >
            <Link to={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100 text-2xl"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal text-2xl"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray" className="text-2xl"> 
            {page}
          </Typography>
        </div>
        <div className="flex items-center">
         <div className="">
            <Input 
              label="Search" 
              size="md"              
            />
          </div>    
          <div className='flex items-center justify-between h-full ml-2 '>
          <Menu className='mr-2'>
            <MenuHandler>
              <IconButton variant="text" color="blue-gray">
                <BellIcon className="h-11 w-11 text-blue-gray-500" />
              </IconButton>
            </MenuHandler>
            <MenuList className="w-max border-0">
              <MenuItem className="flex items-center gap-3">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/team-2.jpg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New message</strong> from Laur
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 13 minutes ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <Avatar
                  src="https://demos.creative-tim.com/material-dashboard/assets/img/small-logos/logo-spotify.svg"
                  alt="item-1"
                  size="sm"
                  variant="circular"
                />
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    <strong>New album</strong> by Travis Scott
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 1 day ago
                  </Typography>
                </div>
              </MenuItem>
              <MenuItem className="flex items-center gap-4">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-tr from-blue-gray-800 to-blue-gray-900">
                  <CreditCardIcon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="mb-1 font-normal"
                  >
                    Payment successfully completed
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center gap-1 text-xs font-normal opacity-60"
                  >
                    <ClockIcon className="h-3.5 w-3.5" /> 2 days ago
                  </Typography>
                </div>
              </MenuItem>
            </MenuList>
          </Menu>

          <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end" className=''>
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
                  size='md'
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
              {profileMenuItems.map(({ label, icon ,path ,onClick}, key) => {
                const isLastItem = key === profileMenuItems.length - 1;
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
                      className: `h-6 w-6 ${isLastItem ? "text-red-500" : ""}`,
                      strokeWidth: 2,
                    })}
                    <Typography
                      as="span"
                      variant="small"
                      className="font-normal text-xl"
                      color={isLastItem ? "red" : "inherit"}
                    >
                      <Link to={path}>{label}</Link>
                    </Typography>
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => setOpenSidenav(dispatch, !openSidenav)}
          >
            <Bars3Icon strokeWidth={3} className="h-10 w-10 text-blue-gray-500" />
          </IconButton>
          </div>
        </div>
      </div>
    </Navbar>
  );
}

DashboardNavbar.displayName = "/src/widgets/layout/dashboard-navbar.jsx";

export default DashboardNavbar;
