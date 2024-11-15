import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more'; // Importar el módulo
import solidgauge from 'highcharts/modules/solid-gauge';

// Activar el módulo highcharts-more
HighchartsMore(Highcharts); // Habilitar solidgauge y otros gráficos especiales
solidgauge(Highcharts);

// Componente para mostrar cada gráfica de las respuestas de las preguntas
export function DashboardGrafica2() {
  const [respuestasPorPregunta, setRespuestasPorPregunta] = useState([]);
  const [mediaGeneral, setMediaGeneral] = useState(0);
    const [usuariosContestaron, setUsuariosContestaron] = useState(0)
  // Obtener las respuestas por pregunta
  useEffect(() => {
    const fetchRespuestasPorPregunta = async () => {
      try {
        const numPreguntas = 6;
        const respuestas = [];

        // Obtener respuestas de todas las preguntas
        for (let i = 4; i <= numPreguntas; i++) {
          const response = await fetch(`https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/ObtenerRespuestasPorIdPregunta/${i}`);
          const data = await response.json();
          respuestas.push({ idPregunta: i, respuestas: data });
        }
        console.log(respuestas/3)
        setUsuariosContestaron(respuestas.length/3)
        // Actualizar las respuestas
        setRespuestasPorPregunta(respuestas);

        // Calcular la media general de todas las respuestas
        const calificaciones = respuestas.flatMap(r => r.respuestas.map(respuesta => respuesta.Calificacion));
        if (calificaciones.length > 0) {
          const media = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length;
          setMediaGeneral(media);
        }
      } catch (error) {
        console.error('Error al obtener las respuestas:', error);
      }
    };

    fetchRespuestasPorPregunta();
  }, []); // Dependencia vacía, solo se ejecuta una vez

  // Función para calcular el promedio de las calificaciones y asignar colores
  const calcularPromedioYColor = (calificaciones) => {
    const promedio = calificaciones.reduce((acc, cal) => acc + cal, 0) / calificaciones.length;
    let color = '#FF0000'; // Rojo por defecto

    // Cambiar color según el promedio
    if (promedio >= 2.5) {
      color = '#FFFF00'; // Azul
    } else if (promedio >= 2) {
      color = '#0000FF'; // Amarillo
    }

    return { promedio, color };
  };

  const generarOpcionesGrafica = (calificaciones, pregunta) => {
    const { promedio } = calcularPromedioYColor(calificaciones); // Usar la función aquí
  
    // Establecer el título basado en la pregunta
    let tituloPregunta = '';
    if (pregunta === 4) {
      tituloPregunta = '¿Cómo sentiste la navegación entre productos?';
    } else if (pregunta === 5) {
      tituloPregunta = '¿Cómo fue tu experiencia con la compra de platillos?';
    } else if (pregunta === 6) {
      tituloPregunta = '¿Cómo sentiste el proceso de pago en la aplicación?';
    }
  
    return {
      chart: {
        type: 'solidgauge',
        height:'250px'
    },
      title: {
        text: tituloPregunta,
        fontSize: '9px',
      },
      pane: {
        center: ['50%', '80%'],
        size: '160%', // Reduce el tamaño general del gráfico
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#f1f1f1',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
      yAxis: {
        min: 0,
        max: 3, // Suponiendo que las calificaciones van de 0 a 3
        lineWidth: 0,
        tickPositions: [],
      },
      series: [{
        name: 'Promedio',
        data: [promedio],
        tooltip: {
          valueSuffix: ' puntos',
        },
        dataLabels: {
          enabled: true,
          format: '{y:.2f} puntos',
          style: {
            fontSize: '13px',
            fontWeight: 'bold',
          },
        },
        dial: {
          backgroundColor: '#0000FF', // Establecer el color según el promedio
        },
      }],
    };
  };
  

  // Opciones de la gráfica general (promedio de todas las respuestas)
  const opcionesGraficaGeneral = {
    chart: {
      type: 'solidgauge',
      height:'250px'

    },
    title: {
      text: 'Promedio General de Calificaciones',
      style: {
        fontSize: '13px',
        fontWeight: 'bold',
      },
    },
    pane: {
        center: ['50%', '80%'],
        size: '160%', // Reduce el tamaño general del gráfico
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: '#f1f1f1',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc',
        },
      },
    yAxis: {
      min: 0,
      max: 3, // Suponiendo que las calificaciones van de 0 a 10
      lineWidth: 0,
      tickPositions: [],
    },
    series: [{
      name: 'Promedio General',
      data: [mediaGeneral],
      tooltip: {
        valueSuffix: ' puntos',
      },
      dataLabels: {
        enabled: true,
        format: '{y:.2f} puntos',
        style: {
          fontSize: '12px',
          fontWeight: 'bold',
        },
      },
      dial: {
        backgroundColor: mediaGeneral >= 2.5 ? '#0000FF' : (mediaGeneral >= 2 ? '#FFFF00' : '#FF0000'),
      },
    }],
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <h2 className="text-2xl font-bold text-center">Gráficas de Calificaciones por Pregunta </h2>

      <h4 className="text-2xl font-bold text-center">Usuarios que contestaron la encuesta: {usuariosContestaron}</h4>

        {/* Mostrar gráficas de cada pregunta */}
        <div className="grid grid-cols-3 gap-2" > {/* Cambia gap-3 a gap-2 para reducir el espacio */}
            {respuestasPorPregunta.map((preguntaData) => (
                <div key={preguntaData.idPregunta} className="card flex flex-col justify-center items-center min-h-[250px] max-w-[600px] p-1 mr-1"> {/* Agrega mr-1 para margen derecho */}
                <div style={{ maxWidth: '400px', maxHeight: '300px' }}> {/* Ajusta el ancho aquí */}
                    <HighchartsReact
                    highcharts={Highcharts}
                    options={generarOpcionesGrafica(preguntaData.respuestas.map(res => res.Calificacion), preguntaData.idPregunta)}
                    />
                </div>
                </div>
            ))}
        </div>

    <div className="mt-12">
    <h3 className="text-xl text-center font-bold">Gráfica General de Calificación Promedio</h3>
    <h4 className="text-xl font-bold text-center">Usuarios que contestaron la encuesta: {usuariosContestaron}</h4>

    <div className="flex justify-center">
        <HighchartsReact
        highcharts={Highcharts}
        options={opcionesGraficaGeneral}
        />
    </div>
    </div>
    </div>
  );
}

export default DashboardGrafica2;
