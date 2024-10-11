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
        <div className="row">
        <div className="col-6 mt-20">
          <img src={imagen} className="imgAyuda"></img>
        </div>
        <div className="col-6">
          <section id="faqs" className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8 mt-20 scroll-m-20 sm:mt-24 sm:scroll-m-24 xl:mt-32 xl:scroll-m-32">
            <div className="mx-auto grid-cols-1 gap-x-14 gap-y-16 lg:max-w-none lg:grid-cols-12">
              <div className="-mb-4 space-y-12 lg:col-span-8 xl:col-span-7 xl:col-start-6">
                <section>
                  <h1 className="text-x16">Preguntas De Ayuda hola</h1>
                  <dl className="mt-2 divide-y divide-slate-100">
                    <details className="group py-4 marker:content-['']">
                      <summary className="flex w-full cursor-pointer select-none justify-between text-left text-base font-semibold leading-7  group-open:text-indigo-600 [&amp;::-webkit-details-marker]:hidden">¿Como comprar?<svg className="ml-1 mt-0.5 h-6 w-6 flex-none stroke-slate-700 group-open:stroke-indigo-500" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11H6"></path><path className="group-open:hidden" d="M10 7v12"></path></svg></summary>
                      <div className="pb-6 pt-6">
                        <div className="prose prose-slate max-w-none prose-a:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                          <p>Tailwind UI products are a <strong>one-time purchase, with no recurring subscription</strong>. When you purchase any Tailwind UI product, you have access to all of the content in that product forever.</p>
                        </div>
                      </div>
                    </details>
                  </dl>
                  <dl className="mt-2 divide-y divide-slate-100">
                    <details className="group py-4 marker:content-['']">
                    <summary className="flex w-full cursor-pointer select-none justify-between text-left text-base font-semibold leading-7  group-open:text-indigo-600 [&amp;::-webkit-details-marker]:hidden">¿Porque no puedo añadir cosas a mi carrito?<svg className="ml-1 mt-0.5 h-6 w-6 flex-none stroke-slate-700 group-open:stroke-indigo-500" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11H6"></path><path className="group-open:hidden" d="M10 7v12"></path></svg></summary>
                      <div className="pb-6 pt-6">
                        <div className="prose prose-slate max-w-none prose-a:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                          <p>Tailwind UI products are a <strong>one-time purchase, with no recurring subscription</strong>. When you purchase any Tailwind UI product, you have access to all of the content in that product forever.</p>
                        </div>
                      </div>
                    </details>
                  </dl>
                  <dl className="mt-2 divide-y divide-slate-100">
                    <details className="group py-4 marker:content-['']">
                    <summary className="flex w-full cursor-pointer select-none justify-between text-left text-base font-semibold leading-7  group-open:text-indigo-600 [&amp;::-webkit-details-marker]:hidden">¿Mi cuenta a sido bloqueda?<svg className="ml-1 mt-0.5 h-6 w-6 flex-none stroke-slate-700 group-open:stroke-indigo-500" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11H6"></path><path className="group-open:hidden" d="M10 7v12"></path></svg></summary>
                      <div className="pb-6 pt-6">
                        <div className="prose prose-slate max-w-none prose-a:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                          <p>Tailwind UI products are a <strong>one-time purchase, with no recurring subscription</strong>. When you purchase any Tailwind UI product, you have access to all of the content in that product forever.</p>
                        </div>
                      </div>
                    </details>
                  </dl>
                  <dl className="mt-2 divide-y divide-slate-100">
                    <details className="group py-4 marker:content-['']">
                    <summary className="flex w-full cursor-pointer select-none justify-between text-left text-base font-semibold leading-7  group-open:text-indigo-600 [&amp;::-webkit-details-marker]:hidden">¿No puedo realizar una reservacion en el restaurante?<svg className="ml-1 mt-0.5 h-6 w-6 flex-none stroke-slate-700 group-open:stroke-indigo-500" fill="none" xmlns="http://www.w3.org/2000/svg" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11H6"></path><path className="group-open:hidden" d="M10 7v12"></path></svg></summary>
                      <div className="pb-6 pt-6">
                        <div className="prose prose-slate max-w-none prose-a:font-semibold prose-a:text-indigo-600 hover:prose-a:text-indigo-500">
                          <p>Tailwind UI products are a <strong>one-time purchase, with no recurring subscription</strong>. When you purchase any Tailwind UI product, you have access to all of the content in that product forever.</p>
                        </div>
                      </div>
                    </details>
                  </dl>
                </section>

              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Ayuda;
