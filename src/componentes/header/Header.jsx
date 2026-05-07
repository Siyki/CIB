import React from "react"
import "./Header.css"
import logo_ehr from "../../imagenes/logo-enfermedadblanco.png"
import logo_cib from "../../imagenes/logo_CIBblanco.png"
import { Link } from "react-router-dom"


export const Header = () => {
  return (
    <header className="encabezado-principal">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid contenedor-encabezado">

          {/* Logo izquierda */}
          <div className="contenedor-logo-cib">
            <Link to="/">
              <img src={logo_cib} className="logo-cib" alt="logo corporación CIB" />
            </Link>
          </div>

          {/* Botón responsive */}
          <button
            className="navbar-toggler boton-menu-movil"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu-navegacion"
            aria-expanded="false"
            aria-controls="menu-navegacion"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Menú */}
          <div className="collapse navbar-collapse contenedor-menu" id="menu-navegacion">
            <div className="navbar-nav menu-navegacion">
              <Link className="nav-link enlace-menu" to="/" tabIndex={2}>INICIO</Link>
              <Link className="nav-link enlace-menu" to="/conocenos" tabIndex={3}>CONÓCENOS</Link>
              <Link className="nav-link enlace-menu" to="/inscribete" tabIndex={1}>INSCRÍBETE</Link>
              <Link className="nav-link enlace-menu" to="/testimonios" tabIndex={5}>TESTIMONIOS</Link>
              <Link className="nav-link enlace-menu" to="/foro" tabIndex={4}>FORO</Link>
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



