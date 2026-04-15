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
      <h1 className="titulo-inscribete">INSCRÍBETE</h1>
      
      <div className="contenido-inscribete">
        {/* Formulario */}
        <div className="formulario-seccion">
          <h2 className="subtitulo-formulario">Formulario de Inscripción</h2>
          
          <form className="formulario" onSubmit={handleSubmit}>
            <div className="fila-formulario">
              <div className="campo-formulario">
                <label htmlFor="nombre" className="label-formulario">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="input-formulario"
                  placeholder="Ingresa tu nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="campo-formulario">
                <label htmlFor="apellidos" className="label-formulario">Apellidos</label>
                <input
                  type="text"
                  id="apellidos"
                  name="apellidos"
                  className="input-formulario"
                  placeholder="Ingresa tus apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="fila-formulario">
              <div className="campo-formulario">
                <label htmlFor="correo" className="label-formulario">Correo Electrónico</label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  className="input-formulario"
                  placeholder="Ingresa tu correo electrónico"
                  value={formData.correo}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="campo-formulario">
                <label htmlFor="identificacion" className="label-formulario">Identificación</label>
                <input
                  type="text"
                  id="identificacion"
                  name="identificacion"
                  className="input-formulario"
                  placeholder="Ingresa tu identificación"
                  value={formData.identificacion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="fila-formulario">
              <div className="campo-formulario">
                <label htmlFor="celular" className="label-formulario">Celular</label>
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  className="input-formulario"
                  placeholder="Ingresa tu número de celular"
                  value={formData.celular}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="campo-formulario">
                <label htmlFor="municipio" className="label-formulario">Municipio</label>
                <input
                  type="text"
                  id="municipio"
                  name="municipio"
                  className="input-formulario"
                  placeholder="Ingresa tu municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="campo-formulario campo-completo">
              <label htmlFor="direccion" className="label-formulario">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                className="input-formulario"
                placeholder="Ingresa tu dirección"
                value={formData.direccion}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="seccion-checkboxes">
              <legend className="leyenda-formulario">Autorizaciones</legend>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="autorizacion1"
                  checked={formData.autorizacion1}
                  onChange={handleChange}
                  required
                />
                Autorizo el tratamiento de mis datos personales conforme a la política de protección de datos personales de la CIB.
              </label>
              
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="autorizacion2"
                  checked={formData.autorizacion2}
                  onChange={handleChange}
                  required
                />
                Autorizo el envío de información relacionada con el programa de enfermedades huérfanas y raras.
              </label>
            </div>
            
            <button 
              type="submit" 
              className={`boton-unete ${enviado ? 'enviado' : ''}`}
              disabled={!formData.autorizacion1 || !formData.autorizacion2}
            >
              {enviado ? '¡ENVIADO!' : 'ÚNETE AL PROGRAMA'}
            </button>
          </form>
        </div>
        
        {/* Información de Contacto */}
        <Rectangulo
          titulo="CONTÁCTANOS"
          texto={
            <div className="contacto-contenido">
              <div className="contacto-item">
                <p className="label-contacto" style={{ color: 'white' }}>Dirección:</p>
                <p className="valor-contacto" style={{ color: 'white' }}>Carrera 72a#78b-141</p>
              </div>
              <div className="contacto-item">
                <p className="label-contacto" style={{ color: 'white' }}>Teléfono:</p>
                <p className="valor-contacto" style={{ color: 'white' }}>(+57) 601 743 0550</p>
              </div>
              <div className="contacto-item">
                <p className="label-contacto" style={{ color: 'white' }}>Correo electrónico:</p>
                <p className="valor-contacto" style={{ color: 'white' }}>
                  <a href="mailto:enfermedadeshuerfanas@cib.org.co" style={{ color: 'white' }}>enfermedadeshuerfanas@cib.org.co</a>
                </p>
              </div>
              <div className="contacto-item">
                <p className="label-contacto" style={{ color: 'white' }}>Sitio web:</p>
                <p className="valor-contacto" style={{ color: 'white' }}>
                  <a href="https://cib.org.co" target="_blank" rel="noopener noreferrer" style={{ color: 'white' }}>cib.org.co</a>
                </p>
              </div>
            </div>
          }
          color="#003d7a"
          tituloColor="white"
          textoColor="white"
          paddingInner="40px"
        />
      </div>
    </div>
  )
}
