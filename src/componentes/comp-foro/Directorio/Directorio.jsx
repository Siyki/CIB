import React from 'react';
import { ArrowLeft, Building2, Phone, Link } from 'lucide-react';
import { FOUNDATIONS } from '../../../datos/foroDatos';
import './Directorio.css';

export const Directorio = ({ onVolver }) => {
    return (
        <section className="directorio" aria-label="Directorio de apoyo institucional">
            <button className="directorio__volver" onClick={onVolver} type="button">
                <ArrowLeft size={16} /> Volver al inicio
            </button>

            <div className="directorio__cabecera">
                <h2 className="directorio__titulo">
                    <Building2 size={24} /> Directorio de Apoyo Institucional
                </h2>
                <p className="directorio__descripcion">
                    Encuentra fundaciones y asociaciones en Colombia que pueden brindarte acompañamiento
                    legal (Ley 1392, tutelas), psicológico y social.
                </p>
            </div>

            <div className="directorio__grid">
                {FOUNDATIONS.map((foundation) => (
                    <article key={foundation.id} className="directorio__tarjeta">
                        <h3 className="directorio__tarjeta-nombre">{foundation.name}</h3>
                        <span className="directorio__tarjeta-enfoque">{foundation.focus}</span>
                        <p className="directorio__tarjeta-descripcion">{foundation.description}</p>

                        <div className="directorio__tarjeta-contacto">
                            <a
                                href={`tel:${foundation.phone}`}
                                className="directorio__tarjeta-enlace"
                                aria-label={`Llamar a ${foundation.name}`}
                            >
                                <Phone size={15} /> {foundation.phone}
                            </a>
                            <a
                                href={`https://${foundation.website}`}
                                target="_blank"
                                rel="noreferrer"
                                className="directorio__tarjeta-enlace"
                                aria-label={`Visitar sitio web de ${foundation.name}`}
                            >
                                <Link size={15} /> {foundation.website}
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};
