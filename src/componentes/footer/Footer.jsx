import React from "react"
import "./Footer.css"

export const Footer = () => {
    return (
        <footer className="py-4 fondo-footer">

            <div className="container">

                <div className="row align-items-center text-center text-md-start">

                    {/* izquierda */}
                    <div className="col-md-4 mb-3 mb-md-0">
                        <div className="marca-footer">
                            © CIB 2026 – todos los derechos reservados
                        </div>
                        <small>Programa de Enfermedades Huérfanas</small>
                    </div>

                    {/* centro */}
                    <div className="col-md-4 mb-3 mb-md-0 text-md-center">
                        <span>(604) 6051808</span>
                        <span className="mx-2">|</span>
                        <span>Medellín, Colombia</span>
                    </div>

                    {/* derecha */}
                    <div className="col-md-4 text-md-end">
                        <p className="mb-1">Síguenos</p>

                        <a href="#" className="icono-red me-3">
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a href="#" className="icono-red me-3">
                            <i className="bi bi-instagram"></i>
                        </a>

                        <a href="#" className="icono-red">
                            <i className="bi bi-whatsapp"></i>
                        </a>

                    </div>

                </div>

            </div>

        </footer>
    )
}