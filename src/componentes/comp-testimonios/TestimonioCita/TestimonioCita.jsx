
import React from 'react';
import './TestimonioCita.css';

export const TestimonioCita = ({ data }) => {
    return (
        <section className="testimonio-cita">
            <div className="testimonio-cita__container">
                <div className="testimonio-cita__header">
                    <h2 className="testimonio-cita__title">Voces Reales</h2>
                </div>
                <div className="testimonio-cita__card">
                    <div className="testimonio-cita__icon">
                        <i className="fas fa-quote-left"></i>
                    </div>
                    <div className="testimonio-cita__content">
                        <blockquote className="testimonio-cita__quote">
                            "{data.frase}"
                        </blockquote>
                        <div className="testimonio-cita__author">
                            <img src={data.imagen} alt={data.autor} />
                            <cite>— {data.autor}</cite>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
