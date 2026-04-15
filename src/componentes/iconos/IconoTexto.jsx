import React from 'react'
import './IconoTexto.css'

/**
 * IconoTexto — Componente reutilizable para mostrar un ícono + título + descripción en fila.
 * Props:
 *   icono      {string}  — Clase de FontAwesome, ej: "fas fa-stethoscope"
 *   titulo     {string}  — Título del ítem
 *   descripcion{string}  — Texto descriptivo
 *   colorFondo {string}  — Color de fondo del círculo del ícono (default: "#dbeafe")
 *   colorIcono {string}  — Color del ícono (default: var(--azul1))
 */
export const IconoTexto = ({
  icono,
  titulo,
  descripcion,
  colorFondo = '#dbeafe',
  colorIcono = 'var(--azul1)',
}) => {
  return (
    <div className="icono-texto">
      <div className="icono-texto__circulo" style={{ backgroundColor: colorFondo }}>
        <i className={icono} style={{ color: colorIcono }}></i>
      </div>
      <div className="icono-texto__contenido">
        <h4 className="icono-texto__titulo">{titulo}</h4>
        <p className="icono-texto__descripcion">{descripcion}</p>
      </div>
    </div>
  )
}
