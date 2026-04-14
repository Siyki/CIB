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
      <h1>Inscríbete</h1>
      <p>Página en construcción 2.0.</p>
    </div>
  )
}
