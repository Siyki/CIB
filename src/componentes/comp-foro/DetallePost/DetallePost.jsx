import React from 'react';
import {
    ArrowLeft, User, Bookmark, ShieldCheck, CheckCircle,
    Volume2, VolumeX, Share2, ThumbsUp, BookOpen
} from 'lucide-react';
import { InsigniaEstado } from '../InsigniaEstado/InsigniaEstado';
import { FormularioMedico } from '../FormularioMedico/FormularioMedico';
import { GLOSSARY } from '../../../datos/foroDatos';
import './DetallePost.css';

const renderTextWithGlossary = (text) => {
    if (!text) return null;
    let result = [text];
    Object.keys(GLOSSARY).forEach(term => {
        const regex = new RegExp(`(${term})`, 'gi');
        result = result.flatMap(part => {
            if (typeof part !== 'string') return [part];
            const pieces = part.split(regex);
            return pieces.map((piece, i) => {
                if (piece.toLowerCase() === term.toLowerCase()) {
                    return (
                        <span key={`${term}-${i}`} className="detalle-post__termino-glosario">
                            {piece}
                            <span className="detalle-post__tooltip-glosario">
                                <strong>{term}</strong>
                                {GLOSSARY[term]}
                            </span>
                        </span>
                    );
                }
                return piece;
            });
        });
    });
    return result;
};

export const DetallePost = ({
    post,
    currentUser,
    savedPostIds,
    isSpeaking,
    onBack,
    onToggleSave,
    onUpvote,
    onSpeak,
    onShare,
    onDoctorValidation
}) => {
    const isDoctor = currentUser?.role === 'doctor';

    return (
        <div className="detalle-post" aria-label="Detalle de publicación">
            <button className="detalle-post__volver" onClick={onBack} type="button">
                <ArrowLeft size={16} /> Volver al inicio
            </button>

            {/* Tarjeta de la pregunta */}
            <div className="detalle-post__pregunta">
                {!isDoctor && (
                    <button
                        className={`detalle-post__btn-guardar ${savedPostIds.includes(post.id) ? 'detalle-post__btn-guardar--activo' : ''}`}
                        onClick={() => onToggleSave(post.id)}
                        title="Guardar publicación"
                        aria-label="Guardar publicación"
                        type="button"
                    >
                        <Bookmark size={22} fill={savedPostIds.includes(post.id) ? 'currentColor' : 'none'} />
                    </button>
                )}

                <div className="detalle-post__meta">
                    <InsigniaEstado status={post.status} />
                    <span className="detalle-post__etiqueta-enfermedad">{post.disease}</span>
                    <span className="detalle-post__fecha">{post.date}</span>
                </div>

                <h2 className="detalle-post__titulo">{post.title}</h2>

                <div className="detalle-post__autor">
                    <div className="detalle-post__avatar-anonimo">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="detalle-post__autor-nombre">Usuario Anónimo</p>
                        <p className="detalle-post__autor-tipo">Paciente / Familiar</p>
                    </div>
                </div>

                {post.content && (
                    <div className="detalle-post__cuerpo">
                        {post.content}
                    </div>
                )}

                {!isDoctor && post.status === 'En revisión' && (
                    <div className="detalle-post__yo-tambien">
                        <p className="detalle-post__yo-tambien-texto">¿Tú también tienes esta duda?</p>
                        <button
                            className="detalle-post__btn-votar"
                            onClick={() => onUpvote(post.id)}
                            type="button"
                        >
                            <ThumbsUp size={18} /> Yo también ({post.upvotes})
                        </button>
                    </div>
                )}
            </div>

            {/* Panel de validación médica */}
            {isDoctor && post.status === 'En revisión' && (
                <FormularioMedico
                    post={post}
                    doctor={currentUser}
                    onSubmitValidation={onDoctorValidation}
                />
            )}

            {/* Respuesta del médico */}
            {post.doctorResponse && (
                <div className="detalle-post__respuesta">
                    <div className="detalle-post__respuesta-cabecera">
                        <div className="detalle-post__respuesta-titulo-grupo">
                            <ShieldCheck size={22} className="detalle-post__icono-shield" />
                            <h3 className="detalle-post__respuesta-titulo">Respuesta del Especialista</h3>
                        </div>

                        {!isDoctor && (
                            <div className="detalle-post__respuesta-acciones">
                                <button
                                    className="detalle-post__btn-accion"
                                    onClick={() => onSpeak(post.doctorResponse)}
                                    type="button"
                                >
                                    {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
                                    {isSpeaking ? 'Detener' : 'Escuchar'}
                                </button>
                                <button
                                    className="detalle-post__btn-compartir"
                                    onClick={() => onShare(post)}
                                    type="button"
                                >
                                    <Share2 size={16} /> Compartir
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="detalle-post__respuesta-cuerpo">
                        <div className="detalle-post__medico-info">
                            <img
                                src={`https://ui-avatars.com/api/?name=${post.doctorName.replace(' ', '+')}&background=0D8B93&color=fff`}
                                alt={`Avatar de ${post.doctorName}`}
                                className="detalle-post__medico-avatar"
                            />
                            <div>
                                <p className="detalle-post__medico-nombre">
                                    {post.doctorName}
                                    <CheckCircle size={15} className="detalle-post__icono-verificado" />
                                </p>
                                <p className="detalle-post__medico-especialidad">{post.doctorSpecialty}</p>
                            </div>
                        </div>

                        <div className="detalle-post__respuesta-texto">
                            {renderTextWithGlossary(post.doctorResponse)}
                        </div>

                        {post.sources && (
                            <div className="detalle-post__fuentes">
                                <BookOpen size={15} className="detalle-post__fuentes-icono" />
                                <div>
                                    <p className="detalle-post__fuentes-label">Evidencia Científica de Apoyo</p>
                                    <p className="detalle-post__fuentes-texto">{post.sources}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
