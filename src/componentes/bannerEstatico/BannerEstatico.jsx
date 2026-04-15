import React from 'react'
import { Link } from 'react-router-dom'
import medicomanosImg from '../../imagenes/medico-manos.jpg'
import './BannerEstatico.css'

/**
 * BannerEstatico — Hero banner con imagen de fondo, título, subtítulo y botones.
 * Props:
 *   etiqueta     {string} — Texto pequeño superior (default: "PROGRAMA DE ATENCIÓN INTEGRAL")
 *   titulo       {string} — Primera línea del título grande
 *   tituloDestacado {string} — Segunda línea en color azulclaro
 *   descripcion  {string} — Párrafo debajo del título
 *   textoPrimario   {string} — Texto botón primario
 *   enlacePrimario  {string} — Ruta del botón primario
 *   textoSecundario {string} — Texto botón secundario
 *   enlaceSecundario{string} — Ruta del botón secundario (ancla o ruta)
 *   imagenFondo  {string} — URL/import de la imagen de fondo (default: medico-manos)
 */
export const BannerEstatico = ({
  etiqueta = 'PROGRAMA DE ATENCIÓN INTEGRAL',
  titulo = 'Juntos frente a las',
  tituloDestacado = 'Enfermedades Huérfanas',
  descripcion = 'Llevamos diagnóstico, acompañamiento y esperanza a miles de familias en Antioquia. No estás solo en este camino.',
  textoPrimario = 'Inscríbete al programa',
  enlacePrimario = '/inscribete',
  textoSecundario = 'Saber más',
  enlaceSecundario = '#que-son',
  imagenFondo = medicomanosImg,
}) => {
  return (
    <header
      className="banner-estatico"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      {/* Overlay azul oscuro sobre la imagen */}
      <div className="banner-estatico__overlay"></div>

      <div className="banner-estatico__contenido">
        <span className="banner-estatico__etiqueta">{etiqueta}</span>

        <h1 className="banner-estatico__titulo">
          {titulo}<br />
          <span className="banner-estatico__titulo--destacado">{tituloDestacado}</span>
        </h1>

        <p className="banner-estatico__descripcion">{descripcion}</p>

        <div className="banner-estatico__botones">
          {textoPrimario && (
            <Link to={enlacePrimario} className="banner-estatico__boton banner-estatico__boton--primario">
              {textoPrimario}
            </Link>
          )}
          {textoSecundario && (
            <Link to={enlaceSecundario} className="banner-estatico__boton banner-estatico__boton--secundario">
              {textoSecundario}
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
