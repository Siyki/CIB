import React from "react"
import "./Header.css"
import logo_ehr from "../../imagenes/logo-enfermedadblanco.png"
import logo_cib from "../../imagenes/logo_CIBblanco.png"

export const Header = () => {
  return (
    <header className="encabezado-principal">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid contenedor-encabezado">

          {/* Logo izquierda */}
          <div className="contenedor-logo-cib">
            <a href="/">
              <img src={logo_cib} className="logo-cib" alt="logo corporación CIB" />
            </a>
          </div>

          {/* Botón responsive */}
          <button
            className="navbar-toggler boton-menu-movil"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu-navegacion"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú */}
          <div className="collapse navbar-collapse contenedor-menu" id="menu-navegacion">
            <div className="navbar-nav menu-navegacion">
              <a className="nav-link enlace-menu" href="#">INICIO</a>
              <a className="nav-link enlace-menu" href="#">CONÓCENOS</a>
              <a className="nav-link enlace-menu" href="#">INSCRÍBETE</a>
            </div>
          </div>

          {/* Logo derecha */}
          <div className="contenedor-logo-programa">
            <img src={logo_ehr} className="logo-programa" alt="logo programa EHR" />
          </div>

        </div>
      </nav>
    </header>
  )
}



