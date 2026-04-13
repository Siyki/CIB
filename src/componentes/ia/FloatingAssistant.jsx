import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
// IMPORTAMOS EL CSS CREADO EN EL PASO 4A
import './FloatingAssistant.css'; 

// 1. Función para hacer la petición con reintentos
const fetchWithRetry = async (url, options, maxRetries = 3) => {
  const delays = [1000, 2000, 4000];
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return await response.json();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      await new Promise(res => setTimeout(res, delays[i]));
    }
  }
};

export function FloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: '¡Hola! Soy tu asistente virtual. ¿En qué te puedo ayudar hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setInput('');
    setIsTyping(true);

    try {
      // 2. Consumir la API de Gemini (Usamos la llave guardada en .env.local)
      const apiKey = "AIzaSyDGM3SJWomuqDglbdtBgoR_17KNCVW9aoQ";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
      
      // 3. Armar el Payload (El cuerpo de la petición)
      const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: {
          parts: [{ text: "Eres un asistente virtual amable y servicial para un proyecto universitario. Responde de manera clara, concisa y estructurada." }]
        }
      };

      const result = await fetchWithRetry(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // 4. Extraer la respuesta
      const responseText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (responseText) {
        setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
      }
    } catch (error) {
      console.error("Error al llamar a Gemini:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Lo siento, tuve un problema de conexión.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="assistant-container">
      
      {/* Ventana del Chat */}
      {isOpen && (
        <div className="chat-window">
          {/* Cabecera */}
          <div className="chat-header">
            <div className="chat-title">
              <Bot size={24} />
              <span>Asistente IA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <X size={20} />
            </button>
          </div>
          
          {/* Mensajes */}
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message-row ${msg.role === 'user' ? 'row-user' : 'row-assistant'}`}>
                <div className={`message-bubble ${msg.role === 'user' ? 'bubble-user' : 'bubble-assistant'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-row row-assistant">
                <div className="typing-indicator">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}
          </div>
          
          {/* Input */}
          <div className="chat-input-area">
            <form onSubmit={handleSubmit} className="chat-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu mensaje..."
                className="chat-input"
                disabled={isTyping}
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="send-btn">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Botón Flotante (Oculto cuando el chat está abierto) */}
      {!isOpen && (
        <button onClick={() => setIsOpen(true)} className="fab-button">
          <MessageSquare size={24} />
        </button>
      )}
    </div>
  );
}