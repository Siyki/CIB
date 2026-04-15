import React from "react"
import { Link } from "react-router-dom"
import logoCIBblanco from "../../imagenes/logo_CIBblanco.png"
import "./Footer.css"

export const Footer = () => {
  return (
    <footer className="footer">

      {/* Cuerpo principal: 3 columnas */}
      <div className="footer__cuerpo">

        {/* Columna 1: Logo + descripción */}
        <div className="footer__columna">
          <img
            src={logoCIBblanco}
            alt="Logo CIB"
            className="footer__logo"
          />
          <p className="footer__descripcion">
            Corporación para Investigaciones Biológicas.
            Comprometidos con la salud y el bienestar de las
            comunidades en Antioquia.
          </p>
        </div>

        {/* Columna 2: Enlaces rápidos */}
        <div className="footer__columna">
          <h4 className="footer__titulo-seccion">ENLACES RÁPIDOS</h4>
          <ul className="footer__lista">
            <li><Link to="/" className="footer__enlace">Inicio</Link></li>
            <li><Link to="/conocenos" className="footer__enlace">Conócenos</Link></li>
            <li><Link to="/inscribete" className="footer__enlace">Inscríbete</Link></li>
          </ul>
        </div>

        {/* Columna 3: Redes sociales */}
        <div className="footer__columna">
          <h4 className="footer__titulo-seccion">SÍGUENOS</h4>
          <div className="footer__redes">
            <a
              href="https://www.facebook.com/CIBcolombia"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icono-red"
              aria-label="Visitar Facebook de CIB"
            >
              <i className="bi bi-facebook" aria-hidden="true"></i>
            </a>
            <a
              href="https://www.instagram.com/cibcolombia"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icono-red"
              aria-label="Visitar Instagram de CIB"
            >
              <i className="bi bi-instagram" aria-hidden="true"></i>
            </a>
            <a
              href="https://wa.me/573016455765"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__icono-red"
              aria-label="Contactar por WhatsApp"
            >
              <i className="bi bi-whatsapp" aria-hidden="true"></i>
            </a>
          </div>
        </div>

      </div>

      {/* Línea divisoria + copyright */}
      <div className="footer__copyright">
        &copy; 2026 Corporación para Investigaciones Biológicas. Todos los derechos reservados.
      </div>

    </footer>
  )
}