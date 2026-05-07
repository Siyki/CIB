import React from "react"
import { Rectangulo } from '../../componentes/rectangulo/Rectangulo'
import { Banner } from '../../componentes/banner/Banner'
import imagenHero from "../../imagenes/imagen_hero1.png"
import { imagenesBanner } from '../../datos/bannerDatos'
import { Hero } from '../../componentes/hero/Hero'
import './Inicio.css'

export const Inicio = () => {
  return (
    <>
      <Banner imagenes={imagenesBanner} />

      <Rectangulo
        titulo="¿QUIÉNES SOMOS?"
        texto="Somos un equipo transdisciplinario comprometido con mejorar la calidad de vida de 
        las personas con enfermedades huérfanas o raras en Colombia. El proyecto identifica las 
        barreras de acceso que enfrentan los pacientes y sus cuidadores dentro del sistema de salud 
        y propone iniciativas para fortalecer una atención digna, integral y articulada."
        color="#69c5ec"
      />

      <Hero
        imagen={imagenHero}
        titulo="¿Te interesa saber más de nuestro programa?"
        descripcion="Puedes profundizar en la información a través de nuestro sitio web CIB."
        textoBoton="Conoce el programa"
        enlace="https://cib.org.co/enfermedades-huerfanas/"
      />

    </>
  )
}