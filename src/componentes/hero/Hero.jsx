import React from "react"
import "./Hero.css"

export const Hero = ({ imagen, titulo, descripcion, textoBoton, enlace }) => {
  return (
    <section 
      className="hero"
      style={{ backgroundImage: `url(${imagen})` }}
      aria-labelledby="titulo-hero"
    >
      <div className="overlay-hero">

        <h1 id="titulo-hero" className="titulo-hero">{titulo}</h1>

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

