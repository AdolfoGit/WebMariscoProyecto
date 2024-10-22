import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";


import Reportes1 from './ReportesLogin';
import ReportesOauht from './ReportesOauth';
import ReportesBloque from './ReportesBloqueo';
import ReportesCambioPasword from './ReporteCambioPasword';
import ReportesPago from './BitacoraPedidos';


export function Reportes() {
  


  const [userData, setUserData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7); // Cantidad de elementos por página
  const apiurll = "https://lacasadelmariscoweb.azurewebsites.net/";
 

  useEffect(() => {
    obtenerDatosUsuarios();
  }, [itemsPerPage]); // Se ejecuta solo una vez al montar el componente

  const obtenerDatosUsuarios = async () => {
    try {
      const response = await fetch(
        `${apiurll}/api/CasaDelMarisco/ReportesRegistro`,
        {
          method: 'GET',
          // No es necesario incluir el body para una solicitud GET
        }
      );

      if (response.ok) {
        const userData1 = await response.json();
        setUserData(userData1);
        //console.log(userData1);
      } else {
        console.error('Error al obtener datos de los usuarios:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
    }
  };



  // Calcular índices de inicio y fin de los datos a mostrar en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userData !== null ? userData.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-8">
          <Typography variant="h6" color="white" className="text-2xl">
            Reportes de Registro
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["IDBitacora","Nombre del Movimiento", "Usuario","Fecha"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="h4"
                      className="text-[14px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map(({ idBitacora, NombreMovimiento, Nombre, Fecha }) => {
                const className = `py-3 px-5 ${
                  idBitacora === currentItems.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={idBitacora}>
                    <td className={className}>
                      <Typography variant="h5" color="blue-gray" className="font-semibold">
                        {idBitacora}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xl text-bold">{NombreMovimiento}</Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xl text-bold">{Nombre}</Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xl text-bold">{Fecha}</Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
          <div className="flex items-center gap-4 mr-4 ml-4">
            <Button
              variant="text"

              className="flex items-center gap-2 text-xl"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Anterior
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({length: Math.ceil(userData?.length / itemsPerPage)}, (_, i) => (
                <Button key={i + 1} onClick={() => paginate(i + 1)} variant={currentPage=== i+1?"filled":"text"}>{i + 1}</Button>
              ))}
            </div>
            <Button
              variant="text"
              className="flex items-center gap-2 text-xl"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(userData?.length / itemsPerPage)}
            >
              Siguiente
            </Button>
          </div>

        </CardBody>

      </Card>

      <Reportes1/>
      <ReportesOauht/>
      <ReportesBloque/>
      <ReportesCambioPasword/>
      <ReportesPago/>
 
      
    </div>
  );
}

export default Reportes;
