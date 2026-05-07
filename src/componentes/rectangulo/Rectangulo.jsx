import React, { useEffect, useRef } from "react"
import "./Rectangulo.css"

export const Rectangulo = ({
  titulo,
  texto,
  color,
  tituloColor = "white",
  textoColor = "white",
  paddingInner = "60px 120px",
  paddingOuter = "40px 20px"

  //observador de animacion
}) => {
  const elementoRef = useRef(null)


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("activa")
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementoRef.current) {
      observer.observe(elementoRef.current)
    }

    return () => {
      if (elementoRef.current) {
        observer.unobserve(elementoRef.current)
      }
    }
  }, [])

  return (
    <div
      className="contenedor-rectangulo"
      ref={elementoRef}
      style={{ padding: paddingOuter }}
    >
      <div className="row row-cols-1">
        <div className="col">
          <div className="card tarjeta-rectangulo" style={{ backgroundColor: color }}>
            <div className="card-body contenido-rectangulo" style={{ color: textoColor, padding: paddingInner }}>

              <h2 className="titulo-rectangulo" style={{ color: tituloColor }}>
                {titulo}
              </h2>

              <p className="texto-rectangulo">
                {texto}
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


