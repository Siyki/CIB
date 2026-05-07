import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send } from 'lucide-react';
import { callGemini } from '../../../datos/foroDatos';
import './ChatSofia.css';

const SYSTEM_PROMPT = `Eres SofIA, asistente de ForoHuérfanas Colombia. Guía a los pacientes con empatía y calidez. 
REGLA 1: NUNCA des diagnósticos ni tratamientos médicos. 
REGLA 2: Si mencionan síntomas de emergencia remítelos a la Línea 123 o urgencias EPS.
REGLA 3: ERES EXPERTA EN EL SISTEMA DE SALUD COLOMBIANO. Conoces la Ley 1392 de 2010 (reconoce a las enfermedades huérfanas como de especial interés y asegura protección estatal) y el aplicativo MIPRES (Mi Prescripción, usado por médicos para prescribir medicamentos No PBS). Si el usuario pregunta por trabas con su EPS, falta de medicamentos o tutelas, oriéntalo sobre cómo funciona el MIPRES o recomiéndale buscar apoyo en fundaciones.
Estructura tus respuestas con saltos de línea y sé concisa.`;

const MENSAJE_INICIAL = [
    { id: 1, sender: 'sofia', text: '¡Hola! Soy SofIA 🤖. ¿En qué te puedo ayudar hoy?' }
];

export const ChatSofia = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [messages, setMessages] = useState(MENSAJE_INICIAL);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, isOpen]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMsg = { id: Date.now(), sender: 'user', text: chatInput };
        setMessages(prev => [...prev, userMsg]);
        setChatInput('');

        const loadingId = Date.now() + 1;
        setMessages(prev => [...prev, { id: loadingId, sender: 'sofia', text: 'Pensando...', isLoading: true }]);

        const reply = await callGemini(userMsg.text, SYSTEM_PROMPT);

        setMessages(prev =>
            prev.map(msg => msg.id === loadingId ? { ...msg, text: reply, isLoading: false } : msg)
        );
    };

    return (
        <div className="chat-sofia" aria-label="Chatbot SofIA">
            {isOpen && (
                <div className="chat-sofia__ventana" role="dialog" aria-label="Chat con SofIA">
                    <div className="chat-sofia__cabecera">
                        <div className="chat-sofia__cabecera-info">
                            <div className="chat-sofia__icono-bot">
                                <Bot size={20} />
                            </div>
                            <div>
                                <h4 className="chat-sofia__nombre">SofIA</h4>
                                <p className="chat-sofia__subtitulo">Asistente Virtual</p>
                            </div>
                        </div>
                        <button
                            className="chat-sofia__btn-cerrar"
                            onClick={() => setIsOpen(false)}
                            aria-label="Cerrar chat"
                            type="button"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="chat-sofia__mensajes" aria-live="polite">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`chat-sofia__burbuja-contenedor ${msg.sender === 'user' ? 'chat-sofia__burbuja-contenedor--usuario' : ''}`}
                            >
                                <div className={`chat-sofia__burbuja ${msg.sender === 'user' ? 'chat-sofia__burbuja--usuario' : 'chat-sofia__burbuja--sofia'} ${msg.isLoading ? 'chat-sofia__burbuja--cargando' : ''}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    <form className="chat-sofia__formulario" onSubmit={handleSend}>
                        <input
                            type="text"
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Escribe tu duda aquí..."
                            className="chat-sofia__input"
                            aria-label="Mensaje para SofIA"
                        />
                        <button
                            type="submit"
                            disabled={!chatInput.trim()}
                            className="chat-sofia__btn-enviar"
                            aria-label="Enviar mensaje"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button
                id="btn-chat-sofia"
                className={`chat-sofia__fab ${isOpen ? 'chat-sofia__fab--abierto' : ''}`}
                onClick={() => setIsOpen(prev => !prev)}
                aria-label={isOpen ? 'Cerrar chat' : 'Abrir chat con SofIA'}
                type="button"
            >
                {isOpen ? <X size={24} /> : <Bot size={28} />}
            </button>
        </div>
    );
};
