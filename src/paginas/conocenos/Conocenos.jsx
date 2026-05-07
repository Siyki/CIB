import React from 'react'
import './Conocenos.css'
import { BannerEstatico } from '../../componentes/bannerEstatico/BannerEstatico'
import { Rectangulo } from '../../componentes/rectangulo/Rectangulo'
import { Estadisticas } from '../../componentes/estadisticas/Estadisticas'
import { IconoTexto } from '../../componentes/iconos/IconoTexto'
import { CTA } from '../../componentes/cta/CTA'
import medicomanosImg from '../../imagenes/medico-manos.jpg'
import { datosMunicipios } from '../../datos/estadisticasDatos'

export const Conocenos = () => {
  return (
    <div className="conocenos-container">

      {/* Banner / Hero */}
      <BannerEstatico 
        etiqueta="PROGRAMA DE ATENCIÓN INTEGRAL"
        titulo="Juntos frente a las"
        tituloDestacado="Enfermedades Huérfanas"
        descripcion="Llevamos diagnóstico, acompañamiento y esperanza a miles de familias en Antioquia. No estás solo en este camino."
        textoPrimario="Inscríbete al programa"
        enlacePrimario="/inscribete"
        textoSecundario="Saber más"
        enlaceSecundario="/faq" 
        imagenFondo={medicomanosImg}
      />

      {/* Sección: ¿Qué son? + Ejes de acción */}
      <section className="conocenos-seccion-info">
        <div className="conocenos-info-grid">

          {/* Caja verde izquierda */}
          <Rectangulo
            titulo="¿Qué son las enfermedades huérfanas?"
            texto="Las enfermedades huérfanas, también conocidas como enfermedades raras, son aquellas
            que afectan a un número reducido de personas. Aunque cada una es poco frecuente, en conjunto
            impactan a miles de familias y representan grandes retos en el diagnóstico, el acceso a la
            atención y el acompañamiento oportuno."
            color="#7cc455"
            tituloColor="white"
            textoColor="white"
            paddingInner="48px"
          />

          {/* Ejes de acción con íconos */}
          <div className="conocenos-ejes">
            <h3 className="conocenos-ejes__titulo">Nuestros ejes de acción</h3>
            <p className="conocenos-ejes__subtitulo">
              Trabajamos articuladamente para transformar la realidad de los pacientes en las regiones.
            </p>

            <div className="conocenos-ejes__lista">
              <IconoTexto
                icono="fas fa-stethoscope"
                titulo="Diagnóstico Oportuno"
                descripcion="Facilitamos rutas de atención para reducir el tiempo de incertidumbre médica."
                colorFondo="#dbeafe"
                colorIcono="var(--azul1)"
              />
              <IconoTexto
                icono="fas fa-hands-holding-child"
                titulo="Acompañamiento"
                descripcion="Apoyo psicosocial y educación para pacientes y sus cuidadores primarios."
                colorFondo="#dcfce7"
                colorIcono="#4d9e2c"
              />
              <IconoTexto
                icono="fas fa-network-wired"
                titulo="Articulación Comunitaria"
                descripcion="Conectamos a las comunidades con las instituciones de salud locales."
                colorFondo="#dbeafe"
                colorIcono="var(--azul1)"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Sección: ¿Dónde estamos llegando? */}
      <section className="conocenos-seccion-municipios">
        <div className="conocenos-municipios-encabezado">
          <h2>¿Dónde estamos llegando?</h2>
          <div className="conocenos-linea-verde"></div>
          <Rectangulo
            titulo=""
            texto="Estos son los municipios a los que estamos llegando,
            donde desarrollaremos las acciones del programa para fortalecer la atención, el
            acompañamiento y la articulación con las comunidades."
            color="transparent"
            tituloColor="#24417a"
            textoColor="#24417a"
            paddingInner="10px 80px"
            paddingOuter="0"
          />
        </div>

        <Estadisticas datos={datosMunicipios} />
      </section>

      {/* Sección: CTA Final */}
      <CTA />

    </div>
  )
}