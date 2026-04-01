import React from "react"
import b1 from "../../imagenes/Banner_1.png"
import b2 from "../../imagenes/Banner_2.png"
import b3 from "../../imagenes/Banner_3.png"
import "./Banner.css"

export const Banner = () => {
  return (
    <div className="contenedor-banner">

      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-bs-interval="2500">

        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active indicador-banner"
            aria-current="true"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            className="indicador-banner"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            className="indicador-banner"
          ></button>
        </div>

        <div className="carousel-inner">

          <div className="carousel-item active">
            <img src={b1} className="imagen-banner" alt="banner 1" />
          </div>

          <div className="carousel-item">
            <img src={b2} className="imagen-banner" alt="banner 2" />
          </div>

          <div className="carousel-item">
            <img src={b3} className="imagen-banner" alt="banner 3" />
          </div>

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

