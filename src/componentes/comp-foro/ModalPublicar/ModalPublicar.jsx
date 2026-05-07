import React, { useState, useEffect } from 'react';
import { PlusCircle, XCircle, Search, AlertTriangle, Mic, MicOff } from 'lucide-react';
import { ENFERMEDADES_SUGERIDAS } from '../../../datos/foroDatos';
import './ModalPublicar.css';

const PALABRAS_EMERGENCIA = ['sangre', 'sangrado', 'emergencia', 'desmayo', 'no puedo respirar', 'infarto', 'ahogando', 'suicidio'];

export const ModalPublicar = ({ onClose, onSubmit, existingPosts }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [disease, setDisease] = useState('');
    const [type, setType] = useState('Duda');
    const [emergencyWarning, setEmergencyWarning] = useState(false);
    const [similarPosts, setSimilarPosts] = useState([]);
    const [isListeningTitle, setIsListeningTitle] = useState(false);
    const [isListeningContent, setIsListeningContent] = useState(false);

    useEffect(() => {
        if (title.length > 5) {
            const keywords = title.toLowerCase().split(' ').filter(w => w.length > 3);
            const matches = existingPosts.filter(p =>
                keywords.some(k => p.title.toLowerCase().includes(k)) && p.status !== 'En revisión'
            );
            setSimilarPosts(matches.slice(0, 2));
        } else {
            setSimilarPosts([]);
        }
        const textToCheck = (title + ' ' + content).toLowerCase();
        setEmergencyWarning(PALABRAS_EMERGENCIA.some(kw => textToCheck.includes(kw)));
    }, [title, content, existingPosts]);

    const handleDictate = (setter, activeSetter, append = false) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Tu navegador no soporta el dictado por voz. Intenta en Chrome o Edge.');
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO';
        recognition.onstart = () => activeSetter(true);
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setter(prev => append ? `${prev} ${transcript}`.trim() : transcript);
        };
        recognition.onerror = () => activeSetter(false);
        recognition.onend = () => activeSetter(false);
        recognition.start();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (emergencyWarning) return;
        const finalDisease = disease.trim() === '' ? 'Enfermedad General' : disease;
        let safeContent = content
            .replace(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g, '[CORREO OCULTO]')
            .replace(/\b\d{7,10}\b/g, '[TELÉFONO OCULTO]');
        onSubmit({
            title,
            content: safeContent,
            disease: finalDisease,
            type,
            status: 'En revisión',
            doctorResponse: null,
            doctorName: null,
            doctorSpecialty: null,
            date: 'Justo ahora',
            upvotes: 1
        });
    };

    return (
        <div className="modal-publicar__overlay" role="dialog" aria-modal="true" aria-label="Publicar duda">
            <div className="modal-publicar__contenido">
                {/* Cabecera */}
                <div className="modal-publicar__cabecera">
                    <h2 className="modal-publicar__titulo">
                        <PlusCircle size={20} /> Publicar una Duda
                    </h2>
                    <button
                        className="modal-publicar__btn-cerrar"
                        onClick={onClose}
                        aria-label="Cerrar modal"
                        type="button"
                    >
                        <XCircle size={24} />
                    </button>
                </div>

                {/* Cuerpo */}
                <div className="modal-publicar__cuerpo">
                    {emergencyWarning && (
                        <div className="modal-publicar__alerta-emergencia" role="alert">
                            <AlertTriangle size={24} className="modal-publicar__alerta-icono" />
                            <div>
                                <h3 className="modal-publicar__alerta-titulo">¡Atención! Posible Emergencia Médica</h3>
                                <p className="modal-publicar__alerta-texto">
                                    Si tú o tu familiar presentan síntomas graves, <strong>llama al 123 o acude a urgencias de tu EPS inmediatamente.</strong>
                                </p>
                            </div>
                        </div>
                    )}

                    <form id="form-publicar" onSubmit={handleSubmit} className="modal-publicar__form">
                        {/* Título */}
                        <div className="modal-publicar__campo">
                            <div className="modal-publicar__campo-fila">
                                <label className="modal-publicar__label" htmlFor="mp-titulo">
                                    Título de tu publicación <span className="modal-publicar__requerido">*</span>
                                </label>
                                <button
                                    type="button"
                                    className={`modal-publicar__btn-dictar ${isListeningTitle ? 'modal-publicar__btn-dictar--activo' : ''}`}
                                    onClick={() => handleDictate(setTitle, setIsListeningTitle, false)}
                                >
                                    {isListeningTitle ? <Mic size={14} /> : <MicOff size={14} />} Dictar
                                </button>
                            </div>
                            <input
                                id="mp-titulo"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ej. ¿Es cierto que el dolor empeora con el frío?"
                                className="modal-publicar__input"
                                required
                            />
                        </div>

                        {/* Posts similares */}
                        {similarPosts.length > 0 && !emergencyWarning && (
                            <div className="modal-publicar__similares">
                                <p className="modal-publicar__similares-titulo">
                                    <Search size={14} /> Quizás ya resolvimos tu duda:
                                </p>
                                {similarPosts.map(p => (
                                    <p key={p.id} className="modal-publicar__similar-item">
                                        "{p.title}" — <span>{p.status}</span>
                                    </p>
                                ))}
                            </div>
                        )}

                        {/* Detalles */}
                        <div className="modal-publicar__campo">
                            <div className="modal-publicar__campo-fila">
                                <label className="modal-publicar__label" htmlFor="mp-detalles">
                                    Detalles (Opcional)
                                </label>
                                <button
                                    type="button"
                                    className={`modal-publicar__btn-dictar ${isListeningContent ? 'modal-publicar__btn-dictar--activo' : ''}`}
                                    onClick={() => handleDictate(setContent, setIsListeningContent, true)}
                                >
                                    {isListeningContent ? <Mic size={14} /> : <MicOff size={14} />} Dictar
                                </button>
                            </div>
                            <textarea
                                id="mp-detalles"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Escribe detalles adicionales de tu duda o contexto..."
                                className="modal-publicar__textarea"
                                rows={4}
                            />
                        </div>

                        {/* Enfermedad y tipo */}
                        <div className="modal-publicar__fila-doble">
                            <div className="modal-publicar__campo">
                                <label className="modal-publicar__label" htmlFor="mp-enfermedad">
                                    Enfermedad <span className="modal-publicar__requerido">*</span>
                                </label>
                                <input
                                    id="mp-enfermedad"
                                    type="text"
                                    value={disease}
                                    onChange={(e) => setDisease(e.target.value)}
                                    list="lista-enfermedades"
                                    placeholder="Escribe la enfermedad..."
                                    className="modal-publicar__input"
                                    required
                                />
                                <datalist id="lista-enfermedades">
                                    {ENFERMEDADES_SUGERIDAS.map(e => (
                                        <option key={e} value={e} />
                                    ))}
                                </datalist>
                            </div>

                            <div className="modal-publicar__campo">
                                <label className="modal-publicar__label" htmlFor="mp-tipo">
                                    Tipo de publicación
                                </label>
                                <select
                                    id="mp-tipo"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="modal-publicar__select"
                                >
                                    <option value="Duda">Duda general</option>
                                    <option value="Mito">Mito o rumor</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Pie */}
                <div className="modal-publicar__pie">
                    <button type="button" onClick={onClose} className="modal-publicar__btn-cancelar">
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="form-publicar"
                        disabled={emergencyWarning}
                        className="modal-publicar__btn-publicar"
                    >
                        Publicar Duda
                    </button>
                </div>
            </div>
        </div>
    );
};
