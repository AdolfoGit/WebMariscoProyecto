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

export function Sidenav({  routes }) {
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
      } fixed inset-0 z-50  h-[calc(100vh-30px)] mt-2 w-[19rem] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div
        className={`relative`}
      >
        <Link to="/" className="py-2 px-2 text-center">
          <Typography
            variant="h6"
            color="black"
            className="text-xl"
          >
            La Casa Del Marisco
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
          <XMarkIcon strokeWidth={2.5} className="h-4 w-4 text-white" />
        </IconButton>
      </div>
        {/* Contenedor scrolleable */}
        <div className="m-2 overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)" }}>
        {routes.map(({ layout, pages }, key) => (
          <ul key={key} className="flex flex-col gap-2">
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
                      className="flex items-center justify-between px-12 capitalize"
                      fullWidth
                    >
                      <div className="flex justify-center items-center gap-4">
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize text-lg"
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
