import React from 'react'
import './FAQ.css'
import { CTA } from '../../componentes/cta/CTA'

import { faqs } from '../../datos/faqDatos'

export const FAQ = () => {

  return (
    <div className="faq-container">
      <header className="faq-header">
        <h1 className="faq-titulo">Preguntas Frecuentes</h1>
        <p className="faq-subtitulo">Resuelve tus dudas sobre el programa y cómo podemos ayudarte.</p>
      </header>

      <section className="faq-content">
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h3 className="faq-pregunta">{faq.pregunta}</h3>
              <p className="faq-respuesta">{faq.respuesta}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA 
        titulo="¿Todavía tienes dudas?" 
        texto="Contáctanos directamente y nuestro equipo te brindará la orientación que necesitas."
      />
    </div>
  )
}
