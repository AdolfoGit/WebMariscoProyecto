import React from "react";
import PedidosGeneral from "./pedidos";
import DashboardGrafica from "./DashboardGraficas"
import ReportesPago from "./BitacoraPedidos";
import DashboardGrafica2 from "./DashboardGraficas2"

export function Home() {
  return (
    <div className="mt-12">
      <div className="">
        <div className="justify-center items-center">
          <DashboardGrafica/>
          <DashboardGrafica2/>
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
