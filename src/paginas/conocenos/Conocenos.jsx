import React from 'react'
import './Conocenos.css'
import { Rectangulo } from '../../componentes/rectangulo/Rectangulo'
import { Estadisticas } from '../../componentes/estadisticas/Estadisticas'

export const Conocenos = () => {
  return (
    <div className="conocenos-container">
      <h1>CONOCE MÁS DEL PROGRAMA</h1>

      <Rectangulo
              titulo="¿QUÉ SON LAS ENFERMEDADES HUÉRFANAS?"
              texto="Las enfermedades huérfanas, también conocidas como enfermedades raras, son aquellas 
              que afectan a un número reducido de personas. Aunque cada una es poco frecuente, en conjunto 
              impactan a miles de familias y representan grandes retos en el diagnóstico, el acceso a la 
              atención y el acompañamiento oportuno."
              color="#7cc455"
            />

      <Rectangulo
              titulo="¿DÓNDE ESTAMOS LLEGANDO?"
              texto="Estos son los municipios a los que estamos llegando, 
              donde desarrollaremos las acciones del programa para fortalecer la atención, el 
              acompañamiento y la articulación con las comunidades."
              color="transparent"
              tituloColor="#24417a"
              textoColor="#24417a"
              paddingInner="10px 120px"
              paddingOuter="20px 20px"
            />
      
      <Estadisticas />
    </div>
  )
}
