import React from "react"
import "./Header.css"
import logo_ehr from "../../imagenes/logo-enfermedadblanco.webp"
import logo_cib from "../../imagenes/logo_CIBblanco.webp"
import { Link, useLocation } from "react-router-dom"


export const Header = () => {
  const location = useLocation()

  const enlaces = [
    { to: "/", label: "INICIO", tabIndex: 2 },
    { to: "/conocenos", label: "CONÓCENOS", tabIndex: 3 },
    { to: "/inscribete", label: "INSCRÍBETE", tabIndex: 1 },
    { to: "/testimonios", label: "TESTIMONIOS", tabIndex: 5 },
    { to: "/foro", label: "FORO", tabIndex: 4 },
  ]

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/"
    return location.pathname.startsWith(path)
  }

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
              {enlaces.map((enlace) => (
                <Link
                  key={enlace.to}
                  className={`nav-link enlace-menu ${isActive(enlace.to) ? 'enlace-menu--activo' : ''}`}
                  to={enlace.to}
                  tabIndex={enlace.tabIndex}
                >
                  {enlace.label}
                </Link>
              ))}
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




