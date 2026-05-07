
import React from 'react';
import './StatsGrid.css';

export const StatsGrid = ({ stats }) => {
    return (
        <section className="stats-grid">
            <div className="stats-grid__container">
                {stats.map((item, index) => (
                    <div key={index} className="stats-grid__card">
                        <div className="stats-grid__icon">
                            <i className={item.icono}></i>
                        </div>
                        <div className="stats-grid__info">
                            <h3 className="stats-grid__value">{item.valor}</h3>
                            <p className="stats-grid__label">{item.label}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
