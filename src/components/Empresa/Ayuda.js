import React, { useState } from "react";
import imagen from "../home/img/login.jpg";
import "./css/nosotros.css";
const Ayuda = () => {
  const [mostrarInformacion, setMostrarInformacion] = useState({
    question1: false,
    question2: false,
    question3: false,
  });
  const [visibleApartado1, setVisible1] = useState(true);

  const handleClick = (question) => {
    setMostrarInformacion((prev) => ({ ...prev, [question]: !prev[question] }));
  };

  return (
    <div className="container text-center">
      <h1 className="m-5">Apartado de ayuda para los clientes</h1>
      <div className="row">
        <div className="col-6">
          <img src={imagen} className="imgAyuda"></img>
        </div>
        <div className="col-6">
          <div className="accordion w-100 mb-5" id="basicAccordion">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => handleClick("question1")}
                >
                  <h2>¿Quienes somos?</h2>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  mostrarInformacion.question1 && "show"
                }`}
                aria-labelledby="headingOne"
                data-mdb-parent="#basicAccordion"
              >
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => handleClick("question2")}
                >
                  <h2>¿Cómo te llegan los pedidos?</h2>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  mostrarInformacion.question2 && "show"
                }`}
                aria-labelledby="headingTwo"
                data-mdb-parent="#basicAccordion"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  onClick={() => handleClick("question3")}
                >
                  <h2>¿Qué tan seguro es comprar con nosotros?</h2>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${
                  mostrarInformacion.question3 && "show"
                }`}
                aria-labelledby="headingThree"
                data-mdb-parent="#basicAccordion"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ayuda;
