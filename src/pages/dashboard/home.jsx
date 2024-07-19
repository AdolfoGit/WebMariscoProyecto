import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "../../widgets/cards/statistics-card";
import { StatisticsChart } from "../../widgets/charts/statistics-chart";
import { statisticsCardsData } from "../../data/statistics-cards-data";
import { statisticsChartsData } from "../../data/statistics-charts-data";
import { projectsTableData } from "../../data/projects-table-data";
import { ordersOverviewData } from "../../data/orders-overview-data";

import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import PedidosGeneral from "./pedidos";
import ReportesPago from "./BitacoraPedidos";

export function Home() {
  return (
    <div className="mt-12">
      <div className="container">
        <div className="col lg-6">
          <PedidosGeneral/>


        </div>
        <div className="col lg-6">

          <ReportesPago/>
        </div>
      </div>
    </div>
  );
}

export default Home;
