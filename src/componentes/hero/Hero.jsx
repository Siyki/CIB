import React from "react"
import "./Hero.css"

export const Hero = ({ imagen, titulo, descripcion, textoBoton, enlace }) => {
  return (
    <section 
      className="hero"
      style={{ backgroundImage: `url(${imagen})` }}
    >
      <div className="overlay-hero">

        <h1 className="titulo-hero">{titulo}</h1>

        <p className="descripcion-hero">{descripcion}</p>

        <a 
          href={enlace} 
          target="_blank" 
          rel="noopener noreferrer"
          className="boton-hero"
        >
          {textoBoton}
        </a>

      </div>
    </section>
  )
}

