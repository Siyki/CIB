import React, { useState } from 'react';
import { Sparkles, Stethoscope, BookOpen } from 'lucide-react';
import { callGemini } from '../../../datos/foroDatos';
import './FormularioMedico.css';

const VEREDICTOS = [
    { id: 'Confirmado', color: 'verde' },
    { id: 'Desmentido', color: 'rojo' },
    { id: 'Requiere consulta médica', color: 'morado' }
];

export const FormularioMedico = ({ post, doctor, onSubmitValidation }) => {
    const [status, setStatus] = useState('Confirmado');
    const [response, setResponse] = useState('');
    const [sources, setSources] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    const applyTemplate = (type) => {
        if (type === 'saludo') {
            setResponse(`Hola. Entiendo perfectamente tu duda. Soy ${doctor.name}, ${doctor.specialty}. ${response}`);
        }
        if (type === 'urgencia') {
            setResponse(`${response}\n\nPor favor, ten en cuenta que los síntomas descritos requieren evaluación clínica. Acude a urgencias o tu EPS de inmediato.`);
        }
    };

    const handleGenerateAI = async () => {
        setIsGenerating(true);
        setResponse('Generando borrador médico...');
        const systemPrompt = `Eres un asistente experto para médicos. Actúa como ${doctor.name} (${doctor.specialty}). Redacta un BORRADOR de respuesta médica para desmentir o confirmar el mito o duda del paciente. Usa un tono humano, comprensivo y adaptado al contexto del sistema de salud en Colombia (EPS). Usa lenguaje muy accesible y conciso. NO des diagnósticos certeros. La pregunta del paciente es sobre la enfermedad: ${post.disease}. Título: ${post.title}. Detalles: ${post.content || 'Sin detalles'}.`;
        const aiDraft = await callGemini('Por favor, redacta el borrador.', systemPrompt);
        setResponse(aiDraft);
        setIsGenerating(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitValidation(status, response, sources);
    };

    return (
        <div className="formulario-medico" aria-label="Panel de validación médica">
            <div className="formulario-medico__etiqueta">
                <Stethoscope size={14} /> Tu turno de validar
            </div>

            <form onSubmit={handleSubmit} className="formulario-medico__form">
                {/* Veredicto */}
                <div className="formulario-medico__campo">
                    <label className="formulario-medico__label">1. Veredicto Médico</label>
                    <div className="formulario-medico__veredictos">
                        {VEREDICTOS.map((opt) => (
                            <label
                                key={opt.id}
                                className={`formulario-medico__opcion formulario-medico__opcion--${opt.color} ${status === opt.id ? 'formulario-medico__opcion--activa' : ''}`}
                            >
                                <input
                                    type="radio"
                                    name="verdict"
                                    value={opt.id}
                                    checked={status === opt.id}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                                {opt.id}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Explicación */}
                <div className="formulario-medico__campo">
                    <div className="formulario-medico__label-row">
                        <label className="formulario-medico__label">2. Tu explicación</label>
                        <button
                            type="button"
                            className={`formulario-medico__btn-ia ${isGenerating ? 'formulario-medico__btn-ia--generando' : ''}`}
                            onClick={handleGenerateAI}
                            disabled={isGenerating}
                        >
                            <Sparkles size={14} />
                            {isGenerating ? 'Generando...' : 'Borrador con IA'}
                        </button>
                    </div>

                    <div className="formulario-medico__plantillas">
                        <button type="button" className="formulario-medico__btn-plantilla" onClick={() => applyTemplate('saludo')}>
                            + Plantilla Saludo
                        </button>
                        <button type="button" className="formulario-medico__btn-plantilla" onClick={() => applyTemplate('urgencia')}>
                            + Plantilla Urgencia
                        </button>
                    </div>

                    <textarea
                        required
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        placeholder="Redacta o edita tu respuesta médica aquí..."
                        className="formulario-medico__textarea"
                        rows={6}
                    />
                </div>

                {/* Fuentes */}
                <div className="formulario-medico__campo">
                    <label className="formulario-medico__label formulario-medico__label--icono">
                        <BookOpen size={16} /> 3. Evidencia Científica (Opcional)
                    </label>
                    <input
                        type="text"
                        value={sources}
                        onChange={(e) => setSources(e.target.value)}
                        placeholder="Ej. Guía de Práctica Clínica MinSalud, PubMed ID, Orphanet..."
                        className="formulario-medico__input"
                    />
                    <p className="formulario-medico__ayuda">Añadir fuentes aumenta la confianza y educa a la comunidad.</p>
                </div>

                <button type="submit" className="formulario-medico__btn-enviar">
                    Publicar Validación Médica
                </button>
            </form>
        </div>
    );
};
