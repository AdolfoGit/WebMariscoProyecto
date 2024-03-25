import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav
} from "../widgets/layout/sidenav";
import {
  DashboardNavbar
} from "../widgets/layout/dashboard-navbar";
import {
  Configurator
} from "../widgets/layout/configurator";
import routes from "../routes";

import { useMaterialTailwindController, setOpenConfigurator } from "../../src/context/index";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const dashboardRoutes = routes.filter(route => route.layout === "dashboard");
  

  return (
    <div className="min-h-screen bg-blue-gray-50/50 ">
      <Sidenav
        routes={dashboardRoutes}
        brandImg={
          sidenavType === "dark" ? "" : ""
        }
      />
      <div className="p-5 xl:ml-[29rem] ">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-5 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-9 w-9" />
        </IconButton>
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboardLink" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
       
      
      </div>
    </div>
  );
}



export default Dashboard;
