import React, { useState, useEffect } from 'react';
import reglas from './reglas';

const Recomendaciones = () => {

    const [serviciosSeleccionados, setServiciosSeleccionados] = useState(['Baño para perros']);

    const [recomendaciones, setRecomendaciones] = useState([]);

    useEffect(() => {
        console.log('serviciosSeleccionados:', serviciosSeleccionados);
        console.log('reglas:', reglas);
        
        if (Array.isArray(serviciosSeleccionados) && Array.isArray(reglas)) {
            const nuevasRecomendaciones = reglas
                .filter(regla => {
                    console.log('regla.antecedents:', regla.antecedents);
                    return Array.isArray(regla.antecedents) &&
                           regla.antecedents.every(servicio => serviciosSeleccionados.includes(servicio));
                })
                .map(regla => regla.consequents)
                .flat();
            
            const recomendacionesUnicas = [...new Set(nuevasRecomendaciones)];
            setRecomendaciones(recomendacionesUnicas);
        }
    }, [serviciosSeleccionados]);
    

    return (
        <div>
            <h3>Recomendaciones</h3>
            {recomendaciones.length > 0 ? (
                <ul>
                    {recomendaciones.map((recomendacion, index) => (
                        <li key={index}>{recomendacion}</li>
                    ))}
                </ul>
            ) : (
                <p>No hay recomendaciones disponibles.</p>
            )}
        </div>
    );
};

export default Recomendaciones;
