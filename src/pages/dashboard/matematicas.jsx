import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Chart from "chart.js/auto";

export function Matematicas() {
  const semanas = [
    { Semana: 1, Fecha: "06-01-2024", Consumo: 36 },
    { Semana: 2, Fecha: "13-01-2024", Consumo: 38 },
    { Semana: 3, Fecha: "20-01-2024", Consumo: 41 },
    { Semana: 4, Fecha: "27-01-2024", Consumo: 43 },
    { Semana: 5, Fecha: "03-02-2024", Consumo: 45 },
    { Semana: 6, Fecha: "10-02-2024", Consumo: 46 },
    { Semana: 7, Fecha: "17-02-2024", Consumo: 46 },
    { Semana: 8, Fecha: "24-02-2024", Consumo: 47 },
    { Semana: 9, Fecha: "02-03-2024", Consumo: 50 },
    { Semana: 10, Fecha: "09-03-2024", Consumo: 51 },
  ];
  const semana2 = [
    { Semana: 1, Fecha: "06-01-2024" },
    { Semana: 2, Fecha: "13-01-2024" },
    { Semana: 3, Fecha: "20-01-2024" },
    { Semana: 4, Fecha: "27-01-2024" },
    { Semana: 5, Fecha: "03-02-2024" },
    { Semana: 6, Fecha: "10-02-2024" },
    { Semana: 7, Fecha: "17-02-2024" },
    { Semana: 8, Fecha: "24-02-2024" },
    { Semana: 9, Fecha: "02-03-2024" },
    { Semana: 10, Fecha: "09-03-2024" },
    { Semana: 11, Fecha: "16-03-2024" },
    { Semana: 12, Fecha: "23-03-2024" },
    { Semana: 13, Fecha: "30-03-2024" },
    { Semana: 14, Fecha: "06-04-2024" },
    { Semana: 15, Fecha: "13-04-2024" },
    { Semana: 16, Fecha: "20-04-2024" },
    { Semana: 17, Fecha: "27-04-2024" },
    { Semana: 18, Fecha: "04-05-2024" },
    { Semana: 19, Fecha: "11-05-2024" },
    { Semana: 20, Fecha: "18-05-2024" },
    { Semana: 21, Fecha: "25-05-2024" },
    { Semana: 22, Fecha: "01-06-2024" },
    { Semana: 23, Fecha: "08-06-2024" },
    { Semana: 24, Fecha: "15-06-2024" },
    { Semana: 25, Fecha: "22-06-2024" },
    { Semana: 26, Fecha: "29-06-2024" },
    { Semana: 27, Fecha: "06-07-2024" },
    { Semana: 28, Fecha: "13-07-2024" },
    { Semana: 29, Fecha: "20-07-2024" },
    { Semana: 30, Fecha: "27-07-2024" },
    { Semana: 31, Fecha: "03-08-2024" },
    { Semana: 32, Fecha: "10-08-2024" },
    { Semana: 33, Fecha: "17-08-2024" },
    { Semana: 34, Fecha: "24-08-2024" },
    { Semana: 35, Fecha: "31-08-2024" },
  ];
  const [semanaInicial, setSemanaInicial] = useState("");
  const [semanaFinal, setSemanaFinal] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState("");
  const [consumoSeleccionado, setConsumoSeleccionado] = useState("");
  const [fechaSeleccionadaFinal, setFechaSeleccionadaFinal] = useState("");
  const [consumoSeleccionadoFinal, setConsumoSeleccionadoFinal] = useState("");
  const [resultadoC, setResultadoC] = useState(0);
  const [consumo1, setConsumo1] = useState(0);
  const [consumo2, setConsumo2] = useState(0);
  const [tiempo1, setTiempo1] = useState(0);
  const [tiempo2, setTiempo2] = useState(0);
  const [tiempo3, setTiempo3] = useState(0);

  const [semanaSeleccionada, setSemanaSeleccionada] = useState("");
  const [fechaSeleccionada2, setFechaSeleccionada2] = useState("");

  const handleSemanaChange = (event) => {
    const semana = parseInt(event.target.value);
    setSemanaSeleccionada(semana);
    const semanaEncontrada = semana2.find((item) => item.Semana === semana);
    if (semanaEncontrada) {
      setFechaSeleccionada2(semanaEncontrada.Fecha);
      setTiempo3(parseInt(semanaEncontrada.Semana));
    } else {
      setFechaSeleccionada("");
    }
  };

  const handleSemanaInicialChange = (event) => {
    const semana = parseInt(event.target.value);
    setSemanaInicial(semana);
    const semanasFiltradas = semanas.filter((item) => item.Semana > semana);
    setSemanaFinal("");
    if (semanasFiltradas.length > 0) {
      setSemanaFinal(semanasFiltradas[0].Semana);
    }
    const semanaEncontrada = semanas.find((item) => item.Semana === semana);
    if (semanaEncontrada) {
      setFechaSeleccionada(semanaEncontrada.Fecha);
      setConsumoSeleccionado(semanaEncontrada.Consumo);
      setConsumo1(parseInt(semanaEncontrada.Consumo));
      setTiempo1(parseInt(semanaEncontrada.Semana));
    }
  };

  const calcularK = () => {
    console.log(tiempo1);
    console.log(tiempo2);

    console.log(consumo1);
    console.log(consumo2);

    const k = Math.log(consumo2 / consumo1) / (tiempo2 - tiempo1);

    const r = consumo1 * Math.exp(k * (tiempo3 - tiempo1));

    console.log("k =", k.toFixed(4)); // Mostrar el valor de k con cuatro decimales
    console.log("r =", r.toFixed(4)); // Mostrar el valor de k con cuatro decimales
    setResultadoC(parseFloat(r));
  };

  // Ejemplo de uso:

  const handleSemanaFinalChange = (event) => {
    const semana = parseInt(event.target.value);
    setSemanaFinal(semana);
    const semanaEncontrada = semanas.find((item) => item.Semana === semana);
    if (semanaEncontrada) {
      setFechaSeleccionadaFinal(semanaEncontrada.Fecha);
      setConsumoSeleccionadoFinal(semanaEncontrada.Consumo);
      setConsumo2(parseInt(semanaEncontrada.Consumo));
      setTiempo2(parseInt(semanaEncontrada.Semana));
    } else {
      setFechaSeleccionadaFinal("");
      setConsumoSeleccionadoFinal("");
      setResultadoC("");
    }
  };
  React.useEffect(() => {
    const ctx = document.getElementById('grafico').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line', // Cambiamos el tipo de gráfico a "line"
      data: {
        datasets: [{
          label: 'Puntos',
          data: [
            { x: tiempo1, y: consumo1 },
            { x: tiempo2, y: consumo2 },
            { x: tiempo3, y: resultadoC }
          ],
          fill: false, // No rellenamos el área bajo la línea
          borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
          borderWidth: 2, // Grosor de la línea
          pointRadius: 5, // Tamaño de los puntos
          pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Color de los puntos
          pointBorderColor: 'rgba(255, 99, 132, 1)', // Borde de los puntos
          pointHoverRadius: 7 // Tamaño de los puntos al pasar el ratón
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Número de semana'
            },
            beginAtZero: true
          },
          y: {
            title: {
              display: true,
              text: 'Consumo'
            },
            beginAtZero: true
          }
        }
      }
    });

    // Limpia el gráfico cuando el componente se desmonta
    return () => {
      myChart.destroy();
    };
  }, [tiempo1, tiempo2, tiempo3, consumo1, consumo2, resultadoC]);

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody>
          <form>
            <label htmlFor="semanaInicialSelect">Seleccione una semana:</label>
            <select
              id="semanaInicialSelect"
              value={semanaInicial}
              onChange={handleSemanaInicialChange}
            >
              <option value="">Seleccione...</option>
              {semanas.map((semana) => (
                <option key={semana.Semana} value={semana.Semana}>
                  {semana.Semana}
                </option>
              ))}
            </select>

            <label>Fecha:</label>
            {fechaSeleccionada && (
              <div>
                <label>{fechaSeleccionada}</label>
              </div>
            )}
            <label>Consumo:</label>
            {consumoSeleccionado && (
              <div>
                <label>{consumoSeleccionado} Kg</label>
              </div>
            )}
          </form>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          {semanaFinal && (
            <div>
              <label htmlFor="semanaFinalSelect">
                Seleccione una semana posterior:
              </label>
              <select
                id="semanaFinalSelect"
                value={semanaFinal}
                onChange={handleSemanaFinalChange}
              >
                <option value="">Seleccione...</option>
                {semanas
                  .filter((semana) => semana.Semana > semanaInicial)
                  .map((semana) => (
                    <option key={semana.Semana} value={semana.Semana}>
                      {semana.Semana}
                    </option>
                  ))}
              </select>
              <br></br>
              <label>Fecha:</label>
              {fechaSeleccionadaFinal && (
                <div>
                  <label>{fechaSeleccionadaFinal}</label>
                </div>
              )}
              <br></br>
              <label>Consumo:</label>
              {consumoSeleccionadoFinal && (
                <div>
                  <label>{consumoSeleccionadoFinal} Kg</label>
                </div>
              )}
            </div>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <label htmlFor="semanaSelect">Seleccione una semana:</label>
          <select
            id="semanaSelect"
            value={semanaSeleccionada}
            onChange={handleSemanaChange}
          >
            <option value="">Seleccione...</option>
            {semana2.map((semana) => (
              <option key={semana.Semana} value={semana.Semana}>
                {semana.Semana}
              </option>
            ))}
          </select>

          {fechaSeleccionada2 && (
            <div>
              <label>Fecha:</label>
              <label>{fechaSeleccionada2}</label>
            </div>
          )}

          <button type="button" className="btn btn-warning" onClick={calcularK}>
            Calcular
          </button>
          {resultadoC && (
            <div>
              <h1>Resultado de c:</h1>
              <h1>{resultadoC} Kg</h1>
            </div>
          )}
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <div className="mt-12 mb-8 flex flex-col gap-12">
            <canvas id="grafico" width="100" height="100"></canvas>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Matematicas;
