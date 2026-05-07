
import React, { useEffect } from 'react';
import './Testimonios.css';
import { BannerEstatico } from '../../componentes/bannerEstatico/BannerEstatico';
import { StatsGrid } from '../../componentes/comp-testimonios/StatsGrid/StatsGrid';
import { SeccionHistoria } from '../../componentes/comp-testimonios/SeccionHistoria/SeccionHistoria';
import { Protagonistas } from '../../componentes/comp-testimonios/Protagonistas/Protagonistas';
import { TimelineDiagnostico } from '../../componentes/comp-testimonios/TimelineDiagnostico/TimelineDiagnostico';
import { TestimonioCita } from '../../componentes/comp-testimonios/TestimonioCita/TestimonioCita';
import { CTA } from '../../componentes/cta/CTA';

import { 
    testimoniosHero, 
    estadisticasTestimonios, 
    seccionesHistorias, 
    protagonistas, 
    timelinePasos, 
    testimonioDestacado 
} from '../../datos/testimoniosDatos';

import heroBg from '../../assets/hero_testimonios.png';

export const Testimonios = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="testimonios-page">
            <BannerEstatico 
                etiqueta={testimoniosHero.etiqueta}
                titulo={testimoniosHero.titulo}
                tituloDestacado={testimoniosHero.tituloDestacado}
                descripcion={testimoniosHero.descripcion}
                textoPrimario={testimoniosHero.textoPrimario}
                enlacePrimario={testimoniosHero.enlacePrimario}
                imagenFondo={heroBg}
            />
            
            <StatsGrid stats={estadisticasTestimonios} />
            
            <div id="historias">
                {seccionesHistorias.map((seccion, index) => (
                    <SeccionHistoria key={index} data={seccion} />
                ))}
            </div>
            
            <Protagonistas items={protagonistas} />
            
            <TimelineDiagnostico pasos={timelinePasos} />
            
            <TestimonioCita data={testimonioDestacado} />
            
            <CTA 
                titulo="Infórmate y Comparte" 
                texto="Ayuda a crear conciencia sobre las enfermedades raras. Tu apoyo puede cambiar la realidad de miles de personas."
                textoBoton="Conocer Más"
                enlaceBoton="/conocenos"
            />
        </main>
    );
};
