import React from 'react'
import { Link } from 'react-router-dom'
import './BannerEstatico.css'

/**
 * BannerEstatico — Hero banner con imagen de fondo, título, subtítulo y botones.
 */
export const BannerEstatico = ({
  etiqueta = '',
  titulo = '',
  tituloDestacado = '',
  descripcion = '',
  textoPrimario = '',
  enlacePrimario = '',
  textoSecundario = '',
  enlaceSecundario = '',
  imagenFondo = null,
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