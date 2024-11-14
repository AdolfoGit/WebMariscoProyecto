import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const FeedbackModal = ({ isOpen, onClose, userId }) => {

    const navigate = useNavigate();

  const [responses, setResponses] = useState({
    catalogExperience: '',
    orderProcess: '',
    paymentProcess: ''
  });

  const handleChange = (event, field) => {
    setResponses({
      ...responses,
      [field]: event.target.value
    });
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const questionsMap = [
      { field: 'catalogExperience', idPregunta: 1 },
      { field: 'orderProcess', idPregunta: 2 },
      { field: 'paymentProcess', idPregunta: 3 },
    ];

    try {
      await Promise.all(
        questionsMap.map(async ({ field, idPregunta }) => {
          const calificacion = responses[field];
          
          const data = new FormData();
          data.append("Calificacion", calificacion);
          data.append("IdPregunta", idPregunta);
          data.append("IdUsuario", userId);

          const response = await fetch("https://lacasadelmariscoweb.azurewebsites.net/api/CasaDelMarisco/InsertarRespuesta", {
            method: "POST",
            body: data,
          });

          if (!response.ok) {
            throw new Error(`Error al enviar la respuesta de la pregunta ${idPregunta}`);
          }
        })
      );

      console.log("Respuestas de feedback enviadas correctamente:", responses);
      onClose(); // Cierra el modal después de enviar el feedback
      navigate('/pedidos');

    } catch (error) {
      console.error("Error al enviar el feedback:", error);
      alert("Ocurrió un error al enviar el feedback.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">¡Déjanos tu Opinión!</h2>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          {/* Pregunta 1 */}
          <div>
            <label className="block font-semibold mb-2">
              ¿Cómo sentiste la navegación en el catálogo de productos?
            </label>
            <div className="flex justify-around">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="catalogExperience"
                  value="3"
                  checked={responses.catalogExperience === '3'}
                  onChange={(e) => handleChange(e, 'catalogExperience')}
                  className="mr-2"
                />
                Bien
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="catalogExperience"
                  value="2"
                  checked={responses.catalogExperience === '2'}
                  onChange={(e) => handleChange(e, 'catalogExperience')}
                  className="mr-2"
                />
                Medio
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="catalogExperience"
                  value="1"
                  checked={responses.catalogExperience === '1'}
                  onChange={(e) => handleChange(e, 'catalogExperience')}
                  className="mr-2"
                />
                Difícil
              </label>
            </div>
          </div>

          {/* Pregunta 2 */}
          <div>
            <label className="block font-semibold mb-2">
              ¿Cómo fue tu experiencia con el proceso de pedir un platillo?
            </label>
            <div className="flex justify-around">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="orderProcess"
                  value="3"
                  checked={responses.orderProcess === '3'}
                  onChange={(e) => handleChange(e, 'orderProcess')}
                  className="mr-2"
                />
                Bien
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="orderProcess"
                  value="2"
                  checked={responses.orderProcess === '2'}
                  onChange={(e) => handleChange(e, 'orderProcess')}
                  className="mr-2"
                />
                Medio
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="orderProcess"
                  value="1"
                  checked={responses.orderProcess === '1'}
                  onChange={(e) => handleChange(e, 'orderProcess')}
                  className="mr-2"
                />
                Difícil
              </label>
            </div>
          </div>

          {/* Pregunta 3 */}
          <div>
            <label className="block font-semibold mb-2">
              ¿Qué te pareció el proceso de pago de tu pedido?
            </label>
            <div className="flex justify-around">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentProcess"
                  value="3"
                  checked={responses.paymentProcess === '3'}
                  onChange={(e) => handleChange(e, 'paymentProcess')}
                  className="mr-2"
                />
                Bien
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentProcess"
                  value="2"
                  checked={responses.paymentProcess === '2'}
                  onChange={(e) => handleChange(e, 'paymentProcess')}
                  className="mr-2"
                />
                Medio
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentProcess"
                  value="1"
                  checked={responses.paymentProcess === '1'}
                  onChange={(e) => handleChange(e, 'paymentProcess')}
                  className="mr-2"
                />
                Difícil
              </label>
            </div>
          </div>

          {/* Botones de Enviar y Cerrar */}
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            >
              Cerrar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

export default FeedbackModal;
