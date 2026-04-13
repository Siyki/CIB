import React, { useState } from 'react'
import './Inscribete.css'
import { Rectangulo } from '../../componentes/rectangulo/Rectangulo'

export const Inscribete = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    identificacion: '',
    celular: '',
    direccion: '',
    municipio: '',
    autorizacion1: false,
    autorizacion2: false
  })

  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      setFormData({
        nombre: '',
        apellidos: '',
        correo: '',
        identificacion: '',
        celular: '',
        direccion: '',
        municipio: '',
        autorizacion1: false,
        autorizacion2: false
      })
    }, 4000)
  }

  return (
    <div className="inscribete-container">
      <h1 className="titulo-inscribete">INSCRÍBETE AQUÍ</h1>

      <div className="contenido-inscribete">
        {/* Columna izquierda - Formulario */}
        <div className="formulario-seccion">
          <h2 className="subtitulo-formulario">INFORMACIÓN PERSONAL</h2>

          <form onSubmit={handleSubmit} className="formulario">
            {/* Nombre y Apellidos */}
            <div className="fila-formulario">
              <div className="campo-formulario">
                <label htmlFor="nombre" className="label-formulario">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="NOMBRE"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="input-formulario"
                  required
                  aria-describedby="ayuda-nombre"
                />
              </div>
              <div className="campo-formulario">
                <label htmlFor="apellidos" className="label-formulario">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  placeholder="APELLIDOS"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="input-formulario"
                  required
                  aria-describedby="ayuda-apellidos"
                />
              </div>
            </div>

            {/* Correo electrónico */}
            <div className="fila-formulario">
              <div className="campo-formulario campo-completo">
                <label htmlFor="correo" className="label-formulario">Correo electrónico</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  placeholder="CORREO ELECTRÓNICO"
                  value={formData.correo}
                  onChange={handleChange}
                  className="input-formulario input-completo"
                  required
                  aria-describedby="ayuda-correo"
                />
              </div>
            </div>

            {/* Identificación y Celular */}
            <div className="fila-formulario">
              <div className="campo-formulario">
                <label htmlFor="identificacion" className="label-formulario">Identificación</label>
                <input
                  type="text"
                  id="identificacion"
                  name="identificacion"
                  placeholder="IDENTIFICACIÓN"
                  value={formData.identificacion}
                  onChange={handleChange}
                  className="input-formulario"
                  required
                  aria-describedby="ayuda-identificacion"
                />
              </div>
              <div className="campo-formulario">
                <label htmlFor="celular" className="label-formulario">Celular</label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  placeholder="CELULAR"
                  value={formData.celular}
                  onChange={handleChange}
                  className="input-formulario"
                  required
                  aria-describedby="ayuda-celular"
                />
              </div>
            </div>

            {/* Dirección y Municipio */}
            <div className="fila-formulario">
              <div className="campo-formulario">
                <label htmlFor="direccion" className="label-formulario">Dirección</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  placeholder="DIRECCIÓN"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="input-formulario"
                  required
                  aria-describedby="ayuda-direccion"
                />
              </div>
              <div className="campo-formulario">
                <label htmlFor="municipio" className="label-formulario">Municipio</label>
                <input
                  type="text"
                  id="municipio"
                  name="municipio"
                  placeholder="MUNICIPIO"
                  value={formData.municipio}
                  onChange={handleChange}
                  className="input-formulario"
                  required
                  aria-describedby="ayuda-municipio"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <fieldset className="seccion-checkboxes">
              <legend className="leyenda-formulario">Autorizaciones requeridas</legend>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="autorizacion1"
                  name="autorizacion1"
                  checked={formData.autorizacion1}
                  onChange={handleChange}
                  aria-describedby="ayuda-autorizacion1"
                />
                <span>Autorizo el tratamiento de mis datos personales</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  id="autorizacion2"
                  name="autorizacion2"
                  checked={formData.autorizacion2}
                  onChange={handleChange}
                  aria-describedby="ayuda-autorizacion2"
                />
                <span>Autorizo el envío de información relacionada con el Programa de atención a enfermedades huérfanas, a través de los medios de contacto proporcionados.</span>
              </label>
            </fieldset>

            {/* Botón de envío */}
            <button
              type="submit"
              className={`boton-unete ${enviado ? 'enviado' : ''}`}
              disabled={!formData.autorizacion1 || !formData.autorizacion2}
              aria-describedby="estado-boton"
            >
              {enviado ? '¡ENVIADO!' : '¡ÚNETE!'}
            </button>
            <div id="estado-boton" className="sr-only">
              {!formData.autorizacion1 || !formData.autorizacion2
                ? 'Debe aceptar ambas autorizaciones para enviar el formulario'
                : 'Formulario listo para enviar'
              }
            </div>
          </form>
        </div>

        {/* Columna derecha - Contactanos usando Rectangulo */}
        <Rectangulo
          titulo="CONTÁCTANOS"
          texto={
            <div className="contacto-contenido">
              <div className="contacto-item">
                <h3 className="label-contacto">TELÉFONO</h3>
                <p className="valor-contacto">(604) 4051808</p>
              </div>

              <div className="contacto-item">
                <h3 className="label-contacto">CORREO</h3>
                <p className="valor-contacto">
                  <a href="mailto:enfermededades@cib.org.co">
                    enfermededadeshuerfanas@cib.org.co
                  </a>
                </p>
              </div>

              <div className="contacto-item">
                <h3 className="label-contacto">DIRECCIÓN</h3>
                <p className="valor-contacto">
                  Cra 73A 78b-141, Altamira,<br />
                  Medellín, Robledo.
                </p>
              </div>
            </div>
          }
          color="#e8e8e8"
          tituloColor="#003d7a"
          textoColor="#003d7a"
          paddingInner="40px 30px"
          paddingOuter="40px 20px"
        />
      </div>
    </div>
  )
}
