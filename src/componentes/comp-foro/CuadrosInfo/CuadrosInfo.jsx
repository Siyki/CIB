import React from 'react';
import { TarjetaPost } from '../TarjetaPost/TarjetaPost';
import './CuadrosInfo.css';

const FILTROS = ['Todos', 'Confirmado', 'Desmentido', 'En revisión'];

export const CuadrosInfo = ({ posts, filterStatus, onFilterChange, onVerPost }) => {
    return (
        <section className="cuadros-info" aria-label="Publicaciones del foro">
            <div className="cuadros-info__cabecera">
                <h3 className="cuadros-info__titulo">Publicaciones Recientes</h3>

                <div className="cuadros-info__filtros" role="group" aria-label="Filtrar publicaciones">
                    {FILTROS.map((status) => (
                        <button
                            key={status}
                            id={`filtro-${status.toLowerCase().replace(' ', '-')}`}
                            className={`cuadros-info__filtro-btn ${filterStatus === status ? 'cuadros-info__filtro-btn--activo' : ''}`}
                            onClick={() => onFilterChange(status)}
                            aria-pressed={filterStatus === status}
                            type="button"
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {posts.length === 0 ? (
                <div className="cuadros-info__vacio">
                    <p>No se encontraron publicaciones con este filtro.</p>
                </div>
            ) : (
                <div className="cuadros-info__grid">
                    {posts.map((post) => (
                        <TarjetaPost
                            key={post.id}
                            post={post}
                            onClick={onVerPost}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
