import React from 'react';
import { Search, PlusCircle, Mic, MicOff } from 'lucide-react';
import './BarraBusqueda.css';

export const BarraBusqueda = ({ searchQuery, onSearchChange, onPublicar, isListening, onDictate }) => {
    return (
        <section className="foro-hero" aria-label="Buscador del foro">
            <h2 className="foro-hero__titulo">Resuelve tus dudas sobre enfermedades huérfanas</h2>
            <p className="foro-hero__subtitulo">
                Una comunidad segura donde médicos especialistas validan información y desmienten mitos.
            </p>

            <div className="foro-hero__controles">
                <div className="foro-hero__buscador">
                    <Search className="foro-hero__icono-buscar" size={20} aria-hidden="true" />
                    <input
                        id="foro-buscador"
                        type="text"
                        placeholder="Busca una enfermedad, síntoma o mito..."
                        className="foro-hero__input"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                        aria-label="Buscar en el foro"
                    />
                    <button
                        className={`foro-hero__btn-mic ${isListening ? 'foro-hero__btn-mic--activo' : ''}`}
                        onClick={onDictate}
                        title="Dictar búsqueda por voz"
                        aria-label="Activar dictado por voz"
                        type="button"
                    >
                        {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                    </button>
                </div>

                <button
                    id="btn-publicar-duda"
                    className="foro-hero__btn-publicar"
                    onClick={onPublicar}
                    type="button"
                >
                    <PlusCircle size={20} />
                    Publicar Duda
                </button>
            </div>
        </section>
    );
};
