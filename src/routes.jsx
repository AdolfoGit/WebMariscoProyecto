import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,NewspaperIcon,GiftIcon,DocumentTextIcon
} from "@heroicons/react/24/solid";
import { Home } from "./pages/dashboard/home";
import { Tables, } from "./pages/dashboard/tables";
import { Profile} from "./pages/dashboard/profile";
import { AgregarProductos} from "./pages/dashboard/AgregarProductos";
import {  Notifications } from "./pages/dashboard/notifications";
import { ProductionQuantityLimits } from "@mui/icons-material";
import FormProducto from "./pages/dashboard/FormNuevoProducto";
import EditarProducto from "./pages/dashboard/EditarProducto";
import TablaPromociones from "./pages/dashboard/TablaPromociones";
import AgregarPromocion from "./pages/dashboard/AgregarPromocion";
import TablaEmpresa from "./pages/dashboard/TablaEmpresa";

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
        icon: <InformationCircleIcon {...icon} />,
        name: "Notificaciones",
        path: "/notificaciones",
        element: <Notifications />,   
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Informes",
        path: "/informes",
        element: <Notifications />,    
      },
      {
        icon: <DocumentTextIcon {...icon} />,
        name: "Empresa",
        path: "/empresa",
        element: <TablaEmpresa />,    
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
        path: "/notificaciones",
        element: <Notifications />,   
      },
      {  
        path: "/informes",
        element: <Notifications />,      
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
      },
    ],
  },
];

export default routes;
