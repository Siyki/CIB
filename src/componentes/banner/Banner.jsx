import React from "react"
import "./Banner.css"

// Componente Banner. Recibe un arreglo de 'imagenes' para el carrusel.
export const Banner = ({ imagenes = [] }) => {
  if (imagenes.length === 0) return null;

  return (
    <div className="contenedor-banner">
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">
        
        <div className="carousel-indicators">
          {imagenes.map((_, index) => (
            <button
              key={`indicator-${index}`}
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={index}
              className={`${index === 0 ? "active" : ""} indicador-banner`}
              aria-current={index === 0 ? "true" : "false"}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
          {imagenes.map((img, index) => (
            <div key={`slide-${index}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <img src={img} className="imagen-banner" alt={`Imagen promocional ${index + 1}`} />
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev boton-banner"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon icono-banner"></span>
        </button>

        <button
          className="carousel-control-next boton-banner"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon icono-banner"></span>
        </button>

      </div>
    </div>
  )
}