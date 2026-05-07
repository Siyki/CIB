
import React from 'react';
import './SeccionHistoria.css';
import seccionDiagnostico from '../../../assets/seccion_diagnostico.png';
import seccionVivir from '../../../assets/seccion_vivir.png';

export const SeccionHistoria = ({ data }) => {
    const images = {
        'seccion_diagnostico.png': seccionDiagnostico,
        'seccion_vivir.png': seccionVivir
    };

    return (
        <section className={`seccion-historia ${data.orden === 'inverso' ? 'seccion-historia--inverso' : ''}`} id={data.id}>
            <div className="seccion-historia__container">
                <div className="seccion-historia__image">
                    <img src={images[data.imagen]} alt={data.titulo} />
                </div>
                <div className="seccion-historia__content">
                    <h2 className="seccion-historia__title">{data.titulo}</h2>
                    <p className="seccion-historia__text">{data.texto}</p>
                </div>
            </div>
        </section>
    );
};
