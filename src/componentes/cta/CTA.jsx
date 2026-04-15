import React from 'react'
import { Link } from 'react-router-dom'
import './CTA.css'

/**
 * CTA — Sección de llamado a la acción.
 * Props:
 *   titulo      {string} — Título principal
 *   texto       {string} — Párrafo descriptivo
 *   textoBoton  {string} — Texto del botón
 *   enlaceBoton {string} — Ruta interna (Link) del botón
 *   icono       {string} — Clase FontAwesome para el ícono del botón
 *   pieTelefono {string} — Número de WhatsApp (sin +, ej: "573016455765")
 */
export const CTA = ({
  titulo = '¿Quieres ser parte del programa?',
  texto = 'Si tú o un familiar conviven con una enfermedad huérfana en estos municipios, regístrate para recibir nuestro acompañamiento sin costo.',
  textoBoton = 'Llenar Formulario de Inscripción',
  enlaceBoton = '/inscribete',
  icono = 'fas fa-file-signature',
  pieTelefono = '573016455765',
}) => {
  return (
    <section className="cta">
      <div className="cta__blob cta__blob--verde"></div>
      <div className="cta__blob cta__blob--azul"></div>

      <div className="cta__contenido">
        <h2 className="cta__titulo">{titulo}</h2>
        <p className="cta__texto">{texto}</p>

        <Link to={enlaceBoton} className="cta__boton">
          <i className={icono}></i> {textoBoton}
        </Link>

        {pieTelefono && (
          <p className="cta__pie">
            O contáctanos vía WhatsApp al{' '}
            <a
              href={`https://wa.me/${pieTelefono}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{pieTelefono.replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}
            </a>
          </p>
        )}
      </div>
    </section>
  )
}
