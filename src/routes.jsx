import {
  HomeIcon,
  TableCellsIcon,
  InformationCircleIcon,
  NewspaperIcon,GiftIcon,DocumentTextIcon,ChartBarIcon
} from "@heroicons/react/24/solid";
import { Home } from "./pages/dashboard/home";
import { Tables, } from "./pages/dashboard/tables";
import { Profile} from "./pages/dashboard/profile";
import { AgregarProductos} from "./pages/dashboard/AgregarProductos";
import {  Notifications } from "./pages/dashboard/notifications";
import FormProducto from "./pages/dashboard/FormNuevoProducto";
import EditarProducto from "./pages/dashboard/EditarProducto";
import TablaPromociones from "./pages/dashboard/TablaPromociones";
import AgregarPromocion from "./pages/dashboard/AgregarPromocion";
import TablaEmpresa from "./pages/dashboard/TablaEmpresa";
import EditarEmpresa from "./pages/dashboard/EditarEmpresa";
import Reportes from "./pages/dashboard/Reportes";
import Matematicas from "./pages/dashboard/matematicas";
import Reservaciones from "./pages/dashboard/reservaciones";

const icon = {
  className: "w-10 h-10 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Usuarios",
        path: "/Usuarios",
        element: <Tables />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "Productos",
        path: "/Productos",
        element: <AgregarProductos />,
      },
      {
        icon: <GiftIcon {...icon} />,
        name: "Promociones",
        path: "/Promociones",
        element: <TablaPromociones />,
      },
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Reportes",
        path: "/Reportes",
        element: <Reportes />, 
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Matematicas",
        path: "/matematicas",
        element: <Matematicas />,    
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "Empresa",
        path: "/empresa",
        element: <TablaEmpresa />,    
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Reservaciones",
        path: "/reservaciones",
        element: <Reservaciones />,    
      },
    ],
  },
  {
    layout: "dashboardLink",
    pages: [
      { 
        path: "/home",
        element: <Home />,
      },
      {
        path: "/Perfil",
        element: <Profile />,
      },
      {
        path: "/Usuarios",
        element: <Tables />,
      },
      {
        path: "/Productos",
        element: <AgregarProductos />,
      },
      {     
        path: "/Promociones",
        element: <TablaPromociones />,
      },
      {    
        path: "/reportes",
        element: <Reportes />,  
      },
      {  
        path: "/matematicas",
        element: <Matematicas />,   
      },
      {
        path: "/insertarproducto",
        element: <FormProducto />,         
      },
      {
        path: "/editarproducto",
        element: <EditarProducto/>,         
      },
      {
        path: "/agregarPromocion",
        element: <AgregarPromocion/>,         
      },
      {
        path: "/empresa",
        element: <TablaEmpresa/>,         
      },{
        path: "/reservaciones",
        element: <Reservaciones/>,         
      },
      {
        path: "/editarempresa",
        element: <EditarEmpresa/>,         
      },
    ],
  },
];

export default routes;
