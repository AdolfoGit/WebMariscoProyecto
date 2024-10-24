import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "../../context/index";
import { useUser } from '../../UserContext';

export function Sidenav({ brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {

    white: "bg-white shadow-md",
   
  };

  const {user } = useUser();
  
  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-full"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-[29rem] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-2 px-3 text-center">
          <Typography
            variant="h6"
            color="black"
            className="text-4xl"
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="md"
          ripple={true}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4 ">
        {routes.map(({ layout, pages }, key) => (
          <ul key={key} className=" flex flex-col gap-2 ">

              {pages.map(({ icon, name, path }) => (
                <li key={name}>
                  <NavLink to={`/${layout}${path}`}>
                    {({ isActive }) => (
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "orange"
                            ? "orange"
                            : "blue-gray"
                        }
                        className="flex items-center justify-between px-11 capitalize"
                        fullWidth
                      >
                        <div className="flex items-center gap-4">
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize text-3xl"
                          >
                            {name}
                          </Typography>
                        </div>
                      </Button>
                    )}
                  </NavLink>
                </li>
              ))}
          
          </ul>
          
        ))}
        <hr className="mb-2 mx-3.5 mt-3"/>
         <div className="leading-4 ml-3">
              <h4 className="font-semibold text-md">{user.Nombre}</h4>
              <span className="text-sm text-gray-600">{user.Correo}</span>
        </div>
        
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "",
  brandName: "La Casa Del Marisco",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
