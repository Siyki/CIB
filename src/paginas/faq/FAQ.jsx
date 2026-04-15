import React from 'react'
import './FAQ.css'
import { CTA } from '../../componentes/cta/CTA'

export const FAQ = () => {
  const faqs = [
    {
      pregunta: '¿Qué es el Programa de Enfermedades Huérfanas?',
      respuesta: 'Es una iniciativa de la CIB diseñada para brindar atención integral, diagnóstico oportuno y acompañamiento a personas que conviven con enfermedades de baja prevalencia y sus familias.'
    },
    {
      pregunta: '¿Tiene algún costo inscribirse en el programa?',
      respuesta: 'No, el proceso de inscripción y el acompañamiento inicial brindado por el programa no tienen costo para los pacientes y sus familias.'
    },
    {
      pregunta: '¿En qué municipios está presente el programa?',
      respuesta: 'Actualmente estamos llegando a municipios como San Jerónimo, Santa Fe de Antioquia y Sopetrán, con el objetivo de fortalecer la atención en las regiones.'
    },
    {
      pregunta: '¿Quiénes pueden participar?',
      respuesta: 'Cualquier persona diagnosticada o con sospecha de una enfermedad huérfana que resida en las zonas de influencia del programa, así como sus cuidadores.'
    },
    {
      pregunta: '¿Cómo puedo contactarme directamente?',
      respuesta: 'Puedes escribirnos a nuestro WhatsApp o llamarnos a las líneas de atención que aparecen en el footer de este sitio.'
    }
  ]

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
