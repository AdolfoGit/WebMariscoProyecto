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
import {  Notifications } from "./pages/dashboard/notifications";
import { ProductionQuantityLimits } from "@mui/icons-material";

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
        icon: <UserCircleIcon {...icon} />,
        name: "profile",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "Tablas",
        path: "/Tablas",
        element: <Tables />,
      },
      {
        icon: <NewspaperIcon {...icon} />,
        name: "Productos",
        path: "/Productos",
        element: <Tables />,
      },
      {
        icon: <GiftIcon {...icon} />,
        name: "Promociones",
        path: "/Promociones",
        element: <Tables />,
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
    ],
  },
];

export default routes;
