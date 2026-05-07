
import React from 'react';
import './Protagonistas.css';
import lauraImg from '../../../assets/laura.png';
import carlosImg from '../../../assets/carlos.png';
import anaImg from '../../../assets/ana.png';

export const Protagonistas = ({ items }) => {
    const images = {
        'laura.png': lauraImg,
        'carlos.png': carlosImg,
        'ana.png': anaImg
    };

    return (
        <section className="protagonistas">
            <div className="protagonistas__container">
                <div className="protagonistas__header">
                    <h2 className="protagonistas__title">Nuestros Protagonistas</h2>
                </div>
                <div className="protagonistas__grid">
                    {items.map((person) => (
                        <div key={person.id} className="protagonistas__card">
                            <div className="protagonistas__image-wrapper">
                                <img src={images[person.imagen] || person.imagen} alt={person.nombre} />
                            </div>
                            <div className="protagonistas__info">
                                <h3 className="protagonistas__name">{person.nombre}</h3>
                                <p className="protagonistas__role">{person.rol}</p>
                                <p className="protagonistas__desc">{person.descripcion}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
