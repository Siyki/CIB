
import React from 'react';
import './TimelineDiagnostico.css';
import { Frown, Search, ClipboardList, Heart } from 'lucide-react';

export const TimelineDiagnostico = ({ pasos }) => {
    const getIcon = (name) => {
        switch (name) {
            case 'frown': return <Frown size={28} />; /* Aumentado */
            case 'search': return <Search size={28} />;
            case 'clipboard': return <ClipboardList size={28} />;
            case 'heart': return <Heart size={28} />;
            default: return <Search size={28} />;
        }
    };

    return (
        <section className="timeline-section">
            <div className="timeline-section__container">
                <div className="timeline-section__header">
                    <h2 className="timeline-section__title">El Camino del Diagnóstico</h2>
                </div>
                <div className="timeline">
                    <div className="timeline__line"></div>
                    <div className="timeline__items">
                        {pasos.map((paso, index) => (
                            <div key={index} className="timeline__item">
                                <div className="timeline__icon" style={{ borderColor: paso.color, color: paso.color }}>
                                    {getIcon(paso.icono)}
                                </div>
                                <p className="timeline__label" style={{ color: paso.color }}>{paso.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
