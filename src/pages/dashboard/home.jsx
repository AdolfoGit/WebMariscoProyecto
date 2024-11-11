import React from "react";
import PedidosGeneral from "./pedidos";
import ReportesPago from "./BitacoraPedidos";

export function Home() {
  return (
    <div className="mt-12">
      <div className="">
        <div className="justify-center items-center">
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
