import { useState } from 'react'
import './App.css'
import { Header } from './componentes/header/Header'
import { Rectangulo } from './componentes/rectangulo/Rectangulo'
import { Banner } from './componentes/banner/Banner'
import { Estadisticas } from './componentes/estadisticas/Estadisticas'
import imagenHero from "./imagenes/imagen_hero1.png"
import { Hero } from './componentes/hero/Hero'
import { Footer } from './componentes/footer/Footer'


function App() {

  return (
    <>
      <Header />

      <Banner />


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
        titulo="¿Te interesó nuestro programa?"
        descripcion="Puedes profundizar en la información a través de nuestro sitio web CIB."
        textoBoton="Conoce el programa"
        enlace="https://cib.org.co/enfermedades-huerfanas/"
      />


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
        texto="Estos son los municipios en los que se han identificado casos de enfermedades huérfanas y 
        donde se realizará el trabajo del programa."
        color="transparent"
        tituloColor="#24417a"
        textoColor="#24417a"
        paddingInner="10px 120px"
        paddingOuter="20px 20px"
      />
      <Estadisticas />

      <Footer />
    </>
  )
}

export default App
