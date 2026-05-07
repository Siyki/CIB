import React, { useState, useEffect, useRef } from 'react';
import {
    Search, PlusCircle, CheckCircle, XCircle, Clock,
    ShieldCheck, User, ArrowLeft, AlertCircle, Info,
    Bell, Bookmark, Volume2, VolumeX, Share2, Stethoscope, ThumbsUp, AlertTriangle, Send,
    Bot, X, LogIn, Sparkles, Mic, MicOff, BookOpen, Link, Building2, Phone
} from 'lucide-react';

// --- GLOSARIO MÉDICO SIMULADO ---
const GLOSSARY = {
    "autosómico dominante": "Patrón de herencia donde solo se necesita una copia del gen mutado (de uno de los padres) para heredar la enfermedad.",
    "mutación genética": "Un cambio permanente en la secuencia de ADN que forma un gen.",
    "enzimas pancreáticas": "Proteínas que ayudan a descomponer los alimentos. En la Fibrosis Quística a menudo deben tomarse como suplemento.",
    "tejido conectivo": "El tejido que sostiene, protege y da estructura a otros tejidos y órganos del cuerpo."
};

// --- MOCK DATA INSTITUCIONAL (NUEVO DIRECTORIO) ---
const FOUNDATIONS = [
    { id: 1, name: "FECOER", focus: "Federación Colombiana de Enfermedades Raras", phone: "+57 310 123 4567", website: "www.fecoer.org", description: "Agrupa a organizaciones de pacientes con enfermedades raras en Colombia. Ofrece asesoría legal y apoyo para la Ley 1392." },
    { id: 2, name: "Asociación Colombiana de Fibrosis Quística", focus: "Fibrosis Quística", phone: "+57 311 987 6543", website: "www.fqcolombia.org", description: "Apoyo integral a pacientes y familias con FQ, facilitando acceso a tratamientos y terapias respiratorias." },
    { id: 3, name: "Fundación Colombiana para el Huntington", focus: "Enfermedad de Huntington", phone: "+57 320 456 7890", website: "www.huntingtoncolombia.org", description: "Acompañamiento psicológico y asesoramiento genético para familias con herencia de Huntington." }
];

// --- MOCK DATA ---
const initialPosts = [
    {
        id: 1,
        title: "¿Las dietas estrictas sin gluten curan la Fibrosis Quística?",
        type: "Mito",
        disease: "Fibrosis Quística",
        status: "Desmentido",
        content: "He leído en varios grupos de redes sociales que si elimino el gluten y los lácteos de la dieta de mi hijo, la fibrosis quística puede desaparecer. ¿Es esto cierto? Me da miedo cambiar su dieta sin saber.",
        doctorResponse: "Hola. Entiendo perfectamente tu preocupación. Sin embargo, la Fibrosis Quística es una enfermedad genética que afecta principalmente los pulmones y el sistema digestivo. Eliminar el gluten o los lácteos no cura la enfermedad, e incluso podría ser perjudicial si no se reemplazan adecuadamente las calorías y nutrientes esenciales que los pacientes con FQ necesitan. El tratamiento debe enfocarse en terapias respiratorias, enzimas pancreáticas y medicación prescrita. Te sugiero consultar siempre con su nutricionista clínico antes de hacer cambios.",
        doctorName: "Dra. Elena Gómez",
        doctorSpecialty: "Neumóloga Pediatra",
        date: "Hace 2 días",
        upvotes: 45,
        sources: null,
        isMine: false
    },
    {
        id: 2,
        title: "¿La enfermedad de Huntington siempre se hereda si el padre la tiene?",
        type: "Pregunta",
        disease: "Enfermedad de Huntington",
        status: "Confirmado",
        content: "Mi padre acaba de ser diagnosticado con Huntington. He leído que tengo un 50% de probabilidades de tenerla, pero no estoy seguro si siempre es así o si hay excepciones o formas de prevenirlo.",
        doctorResponse: "Es muy comprensible que tengas esta duda. La enfermedad de Huntington tiene un patrón de herencia autosómico dominante. Esto significa que cada hijo de una persona con la mutación genética tiene un 50% de probabilidad de heredar el gen mutado. Si se hereda el gen, la enfermedad se desarrollará eventualmente. No hay excepciones a esta regla genética. Te recomiendo fuertemente acudir a un asesoramiento genético EPS para hablar sobre la posibilidad de realizarte pruebas predictivas.",
        doctorName: "Dr. Carlos Ruiz",
        doctorSpecialty: "Genetista Clínico",
        date: "Hace 5 días",
        upvotes: 112,
        sources: "Guía de Práctica Clínica para Huntington (MinSalud Colombia).",
        isMine: false
    },
    {
        id: 3,
        title: "¿El dolor muscular en la ELA se puede tratar con masajes fuertes?",
        type: "Duda",
        disease: "Esclerosis Lateral Amiotrófica (ELA)",
        status: "En revisión",
        content: "Mi tía tiene ELA y sufre de muchos calambres y dolor muscular. Un vecino nos recomendó hacerle masajes de tejido profundo muy fuertes para 'soltar' el músculo. Queremos saber si esto es seguro para ella.",
        doctorResponse: null,
        doctorName: null,
        doctorSpecialty: null,
        date: "Hace 4 horas",
        upvotes: 12,
        sources: null,
        isMine: true
    },
    {
        id: 4,
        title: "¿Las personas con Síndrome de Marfan no pueden hacer ningún tipo de ejercicio?",
        type: "Mito",
        disease: "Síndrome de Marfan",
        status: "Desmentido",
        content: "Me acaban de diagnosticar y un familiar me dijo que debo quedarme en cama y no hacer ningún deporte jamás porque mi corazón puede fallar. ¿Es verdad que debo dejar toda actividad física?",
        doctorResponse: "Hola, gracias por tu pregunta. Es un mito que no puedas hacer *ningún* ejercicio. El Síndrome de Marfan afecta el tejido conectivo, por lo que se deben evitar los deportes de contacto o de alta intensidad isométrica (como el levantamiento de pesas pesadas). Sin embargo, el ejercicio aeróbico de baja a moderada intensidad, como caminar, nadar a ritmo suave o usar bicicleta estática, es generalmente seguro y beneficioso para tu salud cardiovascular. Es vital que diseñes un plan de ejercicio personalizado con tu cardiólogo.",
        doctorName: "Dr. Carlos Ruiz",
        doctorSpecialty: "Genetista Clínico",
        date: "Hace 1 semana",
        upvotes: 89,
        sources: "Fundación Marfan - Pautas de Actividad Física.",
        isMine: false
    },
    {
        id: 5,
        title: "¿El clima frío y húmedo en Bogotá empeora el endurecimiento de la piel en la Esclerodermia?",
        type: "Duda",
        disease: "Esclerodermia",
        status: "En revisión",
        content: "Siento que desde que empezó la temporada de lluvias mis manos se ponen más rígidas y cambian de color más rápido. ¿El clima frío realmente afecta la enfermedad o es coincidencia?",
        doctorResponse: null,
        doctorName: null,
        doctorSpecialty: null,
        date: "Hace 1 hora",
        upvotes: 3,
        sources: null,
        isMine: false
    }
];

const apiKey = "";

const fetchWithRetry = async (url, options, retries = 5) => {
    const delays = [1000, 2000, 4000, 8000, 16000];
    for (let i = 0; i < retries; i++) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            if (i === retries - 1) throw error;
            await new Promise(res => setTimeout(res, delays[i]));
        }
    }
};

// Función genérica para llamar a Gemini con diferentes instrucciones
const callGemini = async (userText, systemInstruction) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
        contents: [{ parts: [{ text: userText }] }],
        systemInstruction: { parts: [{ text: systemInstruction }] }
    };

    try {
        const result = await fetchWithRetry(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "Lo siento, tuve un problema procesando la solicitud.";
    } catch (error) {
        return "Error de conexión. Por favor, intenta de nuevo más tarde.";
    }
};

// --- COMPONENTE LOGIN HUB ---
function LoginHub({ onLogin }) {
    const users = [
        { id: 'p1', role: 'patient', name: 'Ana Martínez', type: 'Paciente Anónimo', color: 'teal' },
        { id: 'p2', role: 'patient', name: 'Carlos Díaz', type: 'Cuidador', color: 'emerald' },
        { id: 'd1', role: 'doctor', name: 'Dra. Elena Gómez', specialty: 'Neumóloga Pediatra', color: 'blue' },
        { id: 'd2', role: 'doctor', name: 'Dr. Carlos Ruiz', specialty: 'Genetista Clínico', color: 'indigo' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-3xl">
                <div className="text-center mb-10">
                    <div className="bg-teal-600 text-white p-3 rounded-2xl inline-block mb-4 shadow-md">
                        <ShieldCheck size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Foro<span className="text-teal-600">Huérfanas</span> Colombia</h1>
                    <p className="text-slate-500 mt-2">Selecciona un perfil para ingresar a la plataforma de demostración.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2"><User size={20} /> Pacientes y Familiares</h3>
                        {users.filter(u => u.role === 'patient').map(user => (
                            <button key={user.id} onClick={() => onLogin(user)} className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-teal-400 hover:bg-teal-50 transition-all text-left">
                                <div className={`w-12 h-12 rounded-full bg-${user.color}-100 flex items-center justify-center text-${user.color}-700 shrink-0`}>
                                    <User size={24} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">{user.name}</p>
                                    <p className="text-sm text-slate-500">{user.type}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-slate-700 flex items-center gap-2 border-b border-slate-200 pb-2"><Stethoscope size={20} /> Médicos Especialistas</h3>
                        {users.filter(u => u.role === 'doctor').map(user => (
                            <button key={user.id} onClick={() => onLogin(user)} className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-slate-100 hover:border-blue-400 hover:bg-blue-50 transition-all text-left">
                                <img src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=0D8B93&color=fff`} alt="Avatar Dr." className="w-12 h-12 rounded-full shadow-sm" />
                                <div>
                                    <p className="font-bold text-slate-800 flex items-center gap-1.5">{user.name} <CheckCircle size={14} className="text-blue-500" /></p>
                                    <p className="text-sm text-blue-600 font-medium">{user.specialty}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState(initialPosts);
    const [currentView, setCurrentView] = useState('home'); // 'home', 'detail', 'profile', 'directory'
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [isListeningSearch, setIsListeningSearch] = useState(false);

    const [savedPostIds, setSavedPostIds] = useState([1]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: "Bienvenido a ForoHuérfanas. Empieza buscando o publicando tus dudas.", read: false, time: "Hace 1 día" }
    ]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [profileTab, setProfileTab] = useState('mis-dudas');

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatInput, setChatInput] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { id: 1, sender: 'sofia', text: '¡Hola! Soy SofIA 🤖. ¿En qué te puedo ayudar hoy?' }
    ]);
    const chatMessagesEndRef = useRef(null);

    const isDoctorMode = currentUser?.role === 'doctor';

    useEffect(() => {
        if (chatMessagesEndRef.current) {
            chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatMessages, isChatOpen]);

    useEffect(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [currentView]);

    if (!currentUser) return <LoginHub onLogin={setCurrentUser} />;

    // --- HANDLERS ---
    const handleViewPost = (post) => {
        setSelectedPost(post);
        setCurrentView('detail');
    };

    const handleBackHome = () => {
        setSelectedPost(null);
        setCurrentView('home');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setCurrentView('home');
    };

    const handleCreatePost = (newPost) => {
        setPosts([{ ...newPost, id: Date.now(), isMine: true }, ...posts]);
        setIsModalOpen(false);
        setNotifications([{ id: Date.now(), text: "Tu duda fue publicada y está en revisión.", read: false, time: "Justo ahora" }, ...notifications]);
    };

    const toggleSavePost = (postId) => {
        setSavedPostIds(prev => prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]);
    };

    // HANDLER DICTADO POR VOZ (Búsqueda)
    const handleDictateSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta el dictado por voz. Intenta en Chrome o Edge.");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = 'es-CO';
        recognition.onstart = () => setIsListeningSearch(true);
        recognition.onresult = (event) => setSearchQuery(event.results[0][0].transcript);
        recognition.onerror = () => setIsListeningSearch(false);
        recognition.onend = () => setIsListeningSearch(false);
        recognition.start();
    };

    const handleSpeak = (text) => {
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'es-CO';
            utterance.onend = () => setIsSpeaking(false);
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    };

    const handleShareWhatsApp = (post) => {
        const text = `Mira esta respuesta médica en ForoHuérfanas:\n\n*${post.title}*\n\n👨‍⚕️ ${post.doctorName} responde:\n"${post.doctorResponse}"`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleUpvote = (postId) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
        if (selectedPost && selectedPost.id === postId) {
            setSelectedPost({ ...selectedPost, upvotes: selectedPost.upvotes + 1 });
        }
    };

    const handleDoctorValidation = (status, responseText, sourcesText) => {
        const updatedPost = {
            ...selectedPost,
            status: status,
            doctorResponse: responseText,
            doctorName: currentUser.name,
            doctorSpecialty: currentUser.specialty,
            sources: sourcesText || null,
            date: "Validado justo ahora"
        };
        setPosts(posts.map(p => p.id === selectedPost.id ? updatedPost : p));
        setSelectedPost(updatedPost);
    };

    const handleSendChatMessage = async (e) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const newUserMsg = { id: Date.now(), sender: 'user', text: chatInput };
        setChatMessages(prev => [...prev, newUserMsg]);
        setChatInput('');

        const loadingId = Date.now() + 1;
        setChatMessages(prev => [...prev, { id: loadingId, sender: 'sofia', text: 'Pensando...', isLoading: true }]);

        // PROMPT ACTUALIZADO CON RUTAS DE ATENCIÓN (MIPRES / LEY 1392)
        const systemPrompt = `Eres SofIA, asistente de ForoHuérfanas Colombia. Guía a los pacientes con empatía y calidez. 
    REGLA 1: NUNCA des diagnósticos ni tratamientos médicos. 
    REGLA 2: Si mencionan síntomas de emergencia remítelos a la Línea 123 o urgencias EPS.
    REGLA 3: ERES EXPERTA EN EL SISTEMA DE SALUD COLOMBIANO. Conoces la Ley 1392 de 2010 (reconoce a las enfermedades huérfanas como de especial interés y asegura protección estatal) y el aplicativo MIPRES (Mi Prescripción, usado por médicos para prescribir medicamentos No PBS). Si el usuario pregunta por trabas con su EPS, falta de medicamentos o tutelas, oriéntalo sobre cómo funciona el MIPRES o recomiéndale buscar apoyo en fundaciones.
    Estructura tus respuestas con saltos de línea y sé concisa.`;

        const sofiaReply = await callGemini(newUserMsg.text, systemPrompt);

        setChatMessages(prev => prev.map(msg => msg.id === loadingId ? { ...msg, text: sofiaReply, isLoading: false } : msg));
    };

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
                            <span key={`${term}-${i}`} className="relative group inline-block border-b border-dashed border-teal-500 text-teal-700 cursor-help">
                                {piece}
                                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 block text-left whitespace-normal">
                                    <strong className="block text-teal-300 mb-1 capitalize">{term}</strong>
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

    const filteredPosts = posts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.disease.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'Todos' ? true : post.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Desmentido': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle size={14} /> Desmentido</span>;
            case 'Confirmado': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={14} /> Confirmado</span>;
            case 'Requiere consulta médica': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Stethoscope size={14} /> Requiere consulta</span>;
            case 'En revisión': return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={14} /> En revisión</span>;
            default: return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
        }
    };

    return (
        <div className={`min-h-screen font-sans flex flex-col ${isDoctorMode ? 'bg-blue-50' : 'bg-slate-50'}`}>
            {/* HEADER */}
            <header className={`${isDoctorMode ? 'bg-blue-900 text-white' : 'bg-white text-slate-800'} border-b border-slate-200 sticky top-0 z-10 transition-colors`}>
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={handleBackHome}>
                            <div className={`${isDoctorMode ? 'bg-blue-800 text-blue-200' : 'bg-teal-600 text-white'} p-1.5 rounded-lg`}>
                                {isDoctorMode ? <Stethoscope size={24} /> : <ShieldCheck size={24} />}
                            </div>
                            <h1 className="text-xl font-bold hidden sm:block">
                                Foro<span className={isDoctorMode ? "text-blue-300" : "text-teal-600"}>Huérfanas</span>
                            </h1>
                        </div>

                        {/* Navegación al Directorio */}
                        {!isDoctorMode && (
                            <button
                                onClick={() => setCurrentView('directory')}
                                className={`ml-4 px-3 py-1.5 rounded-full text-sm font-medium transition-colors hidden sm:flex items-center gap-1.5 ${currentView === 'directory' ? 'bg-teal-100 text-teal-700' : 'text-slate-600 hover:bg-slate-100'}`}
                            >
                                <Building2 size={16} /> Directorio de Apoyo
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {!isDoctorMode && (
                            <div className="relative">
                                <button onClick={() => setShowNotifications(!showNotifications)} className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full">
                                    <Bell size={20} />
                                    {notifications.some(n => !n.read) && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
                                </button>
                                {showNotifications && (
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden z-50">
                                        <div className="p-3 border-b border-slate-100 bg-slate-50 font-semibold text-sm text-slate-700">Notificaciones</div>
                                        <div className="max-h-64 overflow-y-auto">
                                            {notifications.map(notif => (
                                                <div key={notif.id} className={`p-4 border-b border-slate-50 text-sm ${notif.read ? 'text-slate-500' : 'text-slate-800 font-medium bg-blue-50/30'}`}>
                                                    <p>{notif.text}</p>
                                                    <span className="text-xs text-slate-400 mt-1 block">{notif.time}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-3">
                            <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity">
                                {isDoctorMode ? (
                                    <img src={`https://ui-avatars.com/api/?name=${currentUser.name.replace(' ', '+')}&background=0D8B93&color=fff`} alt="Avatar" className="w-8 h-8 rounded-full border border-blue-400" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700"><User size={18} /></div>
                                )}
                                <span className="hidden sm:block">{currentUser.name}</span>
                            </button>

                            <button onClick={handleLogout} className={`p-1.5 rounded-lg ml-2 ${isDoctorMode ? 'hover:bg-blue-800 text-blue-200' : 'hover:bg-slate-100 text-slate-500'}`} title="Cambiar Perfil">
                                <LogIn size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-8">

                {/* --- VISTA HOME --- */}
                {currentView === 'home' && (
                    <div className="space-y-8">
                        {/* HERO */}
                        {!isDoctorMode ? (
                            <div className="bg-blue-50 rounded-3xl p-8 text-center border border-blue-100 shadow-sm relative overflow-hidden">
                                <h2 className="text-2xl md:text-3xl font-bold text-blue-950 mb-3">Resuelve tus dudas sobre enfermedades huérfanas</h2>
                                <p className="text-blue-800 mb-6 max-w-2xl mx-auto">Una comunidad segura donde médicos especialistas validan información y desmienten mitos.</p>
                                <div className="max-w-2xl mx-auto relative flex gap-3 flex-col sm:flex-row">
                                    <div className="relative flex-grow flex items-center">
                                        <Search className="absolute left-4 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            placeholder="Busca una enfermedad, síntoma o mito..."
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-sm text-slate-700"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        {/* Botón de Dictado en Buscador */}
                                        <button
                                            onClick={handleDictateSearch}
                                            className={`absolute right-3 p-1.5 rounded-full transition-colors ${isListeningSearch ? 'bg-red-100 text-red-600 animate-pulse' : 'text-slate-400 hover:bg-slate-100 hover:text-teal-600'}`}
                                            title="Dictar búsqueda por voz"
                                        >
                                            {isListeningSearch ? <Mic size={18} /> : <MicOff size={18} />}
                                        </button>
                                    </div>
                                    <button onClick={() => setIsModalOpen(true)} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap">
                                        <PlusCircle size={20} /> Publicar Duda
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-3xl p-8 border border-blue-200 shadow-sm flex items-center justify-between flex-wrap gap-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-1">Panel de Especialista</h2>
                                    <p className="text-slate-500">Bienvenido de nuevo, {currentUser.name}. Ayuda a combatir la desinformación validando estas dudas.</p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="text-center px-4 py-2 bg-blue-50 rounded-xl border border-blue-100">
                                        <span className="block text-2xl font-bold text-blue-700">{posts.filter(p => p.status === 'En revisión').length}</span>
                                        <span className="text-xs text-blue-600 font-medium uppercase">Pendientes</span>
                                    </div>
                                    <div className="text-center px-4 py-2 bg-green-50 rounded-xl border border-green-100">
                                        <span className="block text-2xl font-bold text-green-700">{posts.filter(p => p.doctorName === currentUser.name).length}</span>
                                        <span className="text-xs text-green-600 font-medium uppercase">Resueltas por ti</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* LISTADO DE POSTS */}
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                                <h3 className="text-lg font-semibold text-slate-800">{isDoctorMode ? "Bandeja de Pendientes" : "Publicaciones Recientes"}</h3>
                                <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                                    {['Todos', 'Confirmado', 'Desmentido', 'En revisión'].map(status => (
                                        <button key={status} onClick={() => setFilterStatus(status)} className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status ? 'bg-slate-800 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                                            {status}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredPosts.map(post => (
                                    <div key={post.id} onClick={() => handleViewPost(post)} className={`bg-white rounded-2xl p-5 border shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col h-full ${isDoctorMode && post.status === 'En revisión' ? 'border-blue-300 ring-2 ring-blue-50' : 'border-slate-200'}`}>
                                        <div className="flex justify-between items-start mb-3">
                                            {getStatusBadge(post.status)}
                                            <div className="flex items-center gap-1 text-slate-400 text-xs font-medium">
                                                <ThumbsUp size={12} /> {post.upvotes}
                                            </div>
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2 leading-tight">{post.title}</h4>
                                        <p className="text-slate-500 text-sm mb-4 line-clamp-3 flex-grow">{post.content || "Sin detalles adicionales."}</p>
                                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                                            <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">{post.disease}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* --- VISTA DIRECTORIO (NUEVA) --- */}
                {currentView === 'directory' && (
                    <div className="space-y-6">
                        <button onClick={handleBackHome} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm mb-2"><ArrowLeft size={16} /> Volver al inicio</button>
                        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2"><Building2 size={24} className="text-teal-600" /> Directorio de Apoyo Institucional</h2>
                            <p className="text-slate-600">Encuentra fundaciones y asociaciones en Colombia que pueden brindarte acompañamiento legal (Ley 1392, tutelas), psicológico y social.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {FOUNDATIONS.map(foundation => (
                                <div key={foundation.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
                                    <h3 className="font-bold text-lg text-slate-800 mb-1">{foundation.name}</h3>
                                    <span className="text-xs font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded inline-block mb-3 self-start">{foundation.focus}</span>
                                    <p className="text-slate-500 text-sm mb-6 flex-grow">{foundation.description}</p>
                                    <div className="space-y-2 pt-4 border-t border-slate-100">
                                        <a href={`tel:${foundation.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors"><Phone size={16} /> {foundation.phone}</a>
                                        <a href={`https://${foundation.website}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors"><Link size={16} /> {foundation.website}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- VISTA PERFIL --- */}
                {currentView === 'profile' && (
                    <div className="max-w-4xl mx-auto space-y-6">
                        <button onClick={handleBackHome} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm mb-2"><ArrowLeft size={16} /> Volver al inicio</button>
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center gap-4">
                            {isDoctorMode ? (
                                <img src={`https://ui-avatars.com/api/?name=${currentUser.name.replace(' ', '+')}&background=0D8B93&color=fff`} alt="Avatar Dr." className="w-16 h-16 rounded-full" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center text-teal-700"><User size={32} /></div>
                            )}
                            <div><h2 className="text-2xl font-bold text-slate-800">{isDoctorMode ? currentUser.name : "Mi Perfil"}</h2><p className="text-slate-500">{isDoctorMode ? currentUser.specialty : currentUser.type}</p></div>
                        </div>

                        {!isDoctorMode && (
                            <>
                                <div className="flex border-b border-slate-200 gap-6">
                                    <button onClick={() => setProfileTab('mis-dudas')} className={`pb-3 font-medium transition-colors border-b-2 ${profileTab === 'mis-dudas' ? 'text-teal-600 border-teal-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}>Mis Dudas</button>
                                    <button onClick={() => setProfileTab('guardados')} className={`pb-3 font-medium transition-colors border-b-2 ${profileTab === 'guardados' ? 'text-teal-600 border-teal-600' : 'text-slate-500 border-transparent hover:text-slate-700'}`}>Guardados ({savedPostIds.length})</button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {posts.filter(post => profileTab === 'mis-dudas' ? post.isMine : savedPostIds.includes(post.id)).map(post => (
                                        <div key={post.id} onClick={() => handleViewPost(post)} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col">
                                            <div className="flex justify-between items-start mb-3">{getStatusBadge(post.status)}</div>
                                            <h4 className="font-bold text-slate-800 text-lg mb-2 line-clamp-2">{post.title}</h4>
                                            <div className="mt-auto pt-4 border-t border-slate-100"><span className="text-xs font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md">{post.disease}</span></div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* --- VISTA DETALLE DE PUBLICACIÓN --- */}
                {currentView === 'detail' && selectedPost && (
                    <div className="max-w-3xl mx-auto space-y-6">
                        <button onClick={handleBackHome} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium text-sm mb-2"><ArrowLeft size={16} /> Volver al inicio</button>

                        {/* TARJETA DE PREGUNTA */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm relative">
                            {!isDoctorMode && (
                                <button onClick={() => toggleSavePost(selectedPost.id)} className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${savedPostIds.includes(selectedPost.id) ? 'bg-teal-50 text-teal-600' : 'text-slate-400 hover:bg-slate-50'}`} title="Guardar">
                                    <Bookmark size={22} fill={savedPostIds.includes(selectedPost.id) ? "currentColor" : "none"} />
                                </button>
                            )}
                            <div className="flex flex-wrap items-center gap-3 mb-4 pr-10">
                                {getStatusBadge(selectedPost.status)}
                                <span className="text-sm font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-md">{selectedPost.disease}</span>
                                <span className="text-sm text-slate-400 ml-auto">{selectedPost.date}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">{selectedPost.title}</h2>
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center"><User size={20} className="text-slate-400" /></div>
                                <div><p className="text-sm font-semibold text-slate-700">Usuario Anónimo</p><p className="text-xs text-slate-500">Paciente / Familiar</p></div>
                            </div>
                            {selectedPost.content && (
                                <div className="text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-xl border border-slate-100 text-lg">
                                    {selectedPost.content}
                                </div>
                            )}

                            {/* ANTI-DUPLICADOS: BOTÓN DE VOTO */}
                            {!isDoctorMode && selectedPost.status === 'En revisión' && (
                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                                    <p className="text-sm text-slate-500">¿Tú también tienes esta duda?</p>
                                    <button onClick={() => handleUpvote(selectedPost.id)} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 font-medium hover:bg-teal-50 hover:text-teal-600 transition-all">
                                        <ThumbsUp size={18} /> Yo también ({selectedPost.upvotes})
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* MODO MÉDICO: PANEL DE VALIDACIÓN (Si está en revisión) */}
                        {isDoctorMode && selectedPost.status === 'En revisión' && (
                            <DoctorValidationForm post={selectedPost} onSubmitValidation={handleDoctorValidation} doctor={currentUser} />
                        )}

                        {/* RESPUESTA DEL MÉDICO (Si existe) */}
                        {selectedPost.doctorResponse && (
                            <div className="bg-blue-50/50 rounded-2xl p-6 md:p-8 border-2 border-blue-100 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><ShieldCheck size={120} /></div>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
                                    <div className="flex items-center gap-2"><ShieldCheck className="text-blue-600" size={24} /><h3 className="text-xl font-bold text-blue-900">Respuesta del Especialista</h3></div>
                                    {!isDoctorMode && (
                                        <div className="flex flex-wrap items-center gap-2">
                                            <button onClick={() => handleSpeak(selectedPost.doctorResponse)} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-blue-200 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                                                {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />} {isSpeaking ? "Detener" : "Escuchar"}
                                            </button>
                                            <button onClick={() => handleShareWhatsApp(selectedPost)} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-sm font-medium hover:bg-[#20bd5a] transition-colors shadow-sm">
                                                <Share2 size={16} /> Compartir
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm border border-blue-50 relative z-10">
                                    <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-100">
                                        <img src={`https://ui-avatars.com/api/?name=${selectedPost.doctorName.replace(' ', '+')}&background=0D8B93&color=fff`} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" />
                                        <div>
                                            <p className="font-bold text-slate-800 flex items-center gap-1.5">{selectedPost.doctorName} <CheckCircle size={16} className="text-blue-500" /></p>
                                            <p className="text-sm text-blue-700 font-medium">{selectedPost.doctorSpecialty}</p>
                                        </div>
                                    </div>
                                    <div className="text-slate-700 leading-relaxed space-y-4">
                                        <div className="whitespace-pre-wrap">{renderTextWithGlossary(selectedPost.doctorResponse)}</div>
                                    </div>

                                    {/* NUEVO: RENDERIZADO DE FUENTES CIENTÍFICAS */}
                                    {selectedPost.sources && (
                                        <div className="mt-6 pt-4 border-t border-slate-100">
                                            <div className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                                                <BookOpen size={16} className="text-slate-400 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-1">Evidencia Científica de Apoyo</p>
                                                    <p className="text-sm text-slate-600">{selectedPost.sources}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* PUBLISH MODAL */}
            {isModalOpen && !isDoctorMode && (
                <PublishModal onClose={() => setIsModalOpen(false)} onSubmit={handleCreatePost} existingPosts={posts} />
            )}

            {/* --- CHATBOT SOFIA --- */}
            {!isDoctorMode && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
                    {isChatOpen && (
                        <div className="mb-4 w-[90vw] sm:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-96 animate-in slide-in-from-bottom-5 fade-in duration-200 origin-bottom-right">
                            <div className="bg-teal-600 p-4 flex items-center justify-between text-white shadow-sm z-10">
                                <div className="flex items-center gap-2"><div className="bg-white/20 p-1.5 rounded-full"><Bot size={20} /></div><div><h4 className="font-bold text-sm leading-none">SofIA</h4><p className="text-[10px] text-teal-100 mt-0.5">Asistente Virtual</p></div></div>
                                <button onClick={() => setIsChatOpen(false)} className="text-teal-100 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1"><X size={18} /></button>
                            </div>
                            <div className="flex-grow bg-slate-50 p-4 overflow-y-auto flex flex-col gap-3">
                                {chatMessages.map((msg) => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-wrap ${msg.sender === 'user' ? 'bg-teal-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'} ${msg.isLoading ? 'animate-pulse text-slate-400 italic' : ''}`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatMessagesEndRef} />
                            </div>
                            <form onSubmit={handleSendChatMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2 items-center">
                                <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Escribe tu duda aquí..." className="flex-grow p-2.5 bg-slate-100 border-transparent focus:bg-white rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all" />
                                <button type="submit" disabled={!chatInput.trim()} className="bg-teal-600 hover:bg-teal-700 text-white p-2.5 rounded-xl transition-colors disabled:opacity-50 shrink-0"><Send size={18} /></button>
                            </form>
                        </div>
                    )}
                    <button onClick={() => setIsChatOpen(!isChatOpen)} className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105 active:scale-95 ${isChatOpen ? 'bg-slate-700' : 'bg-teal-600 hover:bg-teal-700'}`}>
                        {isChatOpen ? <X size={24} /> : <Bot size={28} />}
                    </button>
                </div>
            )}
        </div>
    );
}

// --- SUBCOMPONENTS ---

// 1. Panel de Médico (Con Borrador de IA y Fuentes)
function DoctorValidationForm({ post, onSubmitValidation, doctor }) {
    const [status, setStatus] = useState("Confirmado");
    const [response, setResponse] = useState("");
    const [sources, setSources] = useState(""); // NUEVO: Evidencia Científica
    const [isGenerating, setIsGenerating] = useState(false);

    const applyTemplate = (type) => {
        if (type === 'saludo') setResponse(`Hola. Entiendo perfectamente tu duda. Soy el ${doctor.name}, ${doctor.specialty}. ${response}`);
        if (type === 'urgencia') setResponse(`${response} \n\nPor favor, ten en cuenta que los síntomas descritos requieren evaluación clínica. Acude a urgencias o tu EPS de inmediato.`);
    };

    const handleGenerateAI = async () => {
        setIsGenerating(true);
        setResponse("Generando borrador médico...");
        const systemPrompt = `Eres un asistente experto para médicos. Actúa como ${doctor.name} (${doctor.specialty}). Redacta un BORRADOR de respuesta médica para desmentir o confirmar el mito o duda del paciente. Usa un tono humano, comprensivo y adaptado al contexto del sistema de salud en Colombia (EPS). Usa lenguaje muy accesible y conciso. NO des diagnósticos certeros. La pregunta del paciente es sobre la enfermedad: ${post.disease}. Título: ${post.title}. Detalles: ${post.content || 'Sin detalles'}.`;
        const aiDraft = await callGemini("Por favor, redacta el borrador.", systemPrompt);
        setResponse(aiDraft);
        setIsGenerating(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitValidation(status, response, sources);
    };

    return (
        <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 shadow-md relative mt-6">
            <div className="absolute -top-3 left-6 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                <Stethoscope size={14} /> Tu turno de validar
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-5">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">1. Veredicto Médico</label>
                    <div className="flex flex-wrap gap-3">
                        {[{ id: 'Confirmado', color: 'green' }, { id: 'Desmentido', color: 'red' }, { id: 'Requiere consulta médica', color: 'purple' }].map(opt => (
                            <label key={opt.id} className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border-2 transition-all ${status === opt.id ? `border-${opt.color}-500 bg-${opt.color}-50` : 'border-slate-200 hover:bg-slate-50'}`}>
                                <input type="radio" name="verdict" value={opt.id} checked={status === opt.id} onChange={(e) => setStatus(e.target.value)} className="hidden" />
                                <span className={`font-semibold ${status === opt.id ? `text-${opt.color}-700` : 'text-slate-600'}`}>{opt.id}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-end mb-2">
                        <label className="block text-sm font-bold text-slate-700">2. Tu explicación</label>
                        <button type="button" onClick={handleGenerateAI} disabled={isGenerating} className="text-xs bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg flex items-center gap-1 font-medium transition-colors disabled:opacity-50">
                            <Sparkles size={14} /> {isGenerating ? "Generando..." : "Generar borrador con IA"}
                        </button>
                    </div>
                    <div className="flex gap-2 mb-2">
                        <button type="button" onClick={() => applyTemplate('saludo')} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded"> + Plantilla Saludo</button>
                        <button type="button" onClick={() => applyTemplate('urgencia')} className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-1 rounded"> + Plantilla Urgencia</button>
                    </div>
                    <textarea required value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Redacta o edita tu respuesta médica aquí..." className="w-full p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px] resize-y bg-blue-50/30" />
                </div>

                {/* NUEVO: EVIDENCIA CIENTÍFICA */}
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><BookOpen size={16} /> 3. Evidencia Científica (Opcional)</label>
                    <input
                        type="text"
                        value={sources}
                        onChange={(e) => setSources(e.target.value)}
                        placeholder="Ej. Guía de Práctica Clínica MinSalud, PubMed ID, Orphanet..."
                        className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-xs text-slate-400 mt-1">Añadir fuentes aumenta la confianza y educa a la comunidad.</p>
                </div>

                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-sm">
                    Publicar Validación Médica
                </button>
            </form>
        </div>
    );
}

// 2. Modal de Publicación del Paciente (Con Dictado por Voz)
function PublishModal({ onClose, onSubmit, existingPosts }) {
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
            const matches = existingPosts.filter(p => keywords.some(k => p.title.toLowerCase().includes(k)) && p.status !== 'En revisión');
            setSimilarPosts(matches.slice(0, 2));
        } else {
            setSimilarPosts([]);
        }

        const emergencyKeywords = ['sangre', 'sangrado', 'emergencia', 'desmayo', 'no puedo respirar', 'infarto', 'ahogando', 'suicidio'];
        const textToCheck = (title + " " + content).toLowerCase();
        setEmergencyWarning(emergencyKeywords.some(keyword => textToCheck.includes(keyword)));
    }, [title, content, existingPosts]);

    // Hook para dictado
    const handleDictate = (setter, activeSetter, append = false) => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Tu navegador no soporta el dictado por voz. Intenta en Chrome o Edge.");
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
        let safeContent = content;
        safeContent = safeContent.replace(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}/g, '[CORREO OCULTO]');
        safeContent = safeContent.replace(/\b\d{7,10}\b/g, '[TELÉFONO OCULTO]');

        onSubmit({
            title, content: safeContent, disease: finalDisease, type,
            status: 'En revisión', doctorResponse: null, doctorName: null, doctorSpecialty: null,
            date: 'Justo ahora', upvotes: 1
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">

                <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><PlusCircle size={20} /> Publicar una Duda</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><XCircle size={24} /></button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow relative">
                    {emergencyWarning && (
                        <div className="bg-red-100 border-l-4 border-red-600 p-4 rounded-r-lg mb-6 flex items-start gap-3">
                            <AlertTriangle className="text-red-600 shrink-0 mt-0.5" size={24} />
                            <div>
                                <h3 className="text-red-800 font-bold">¡Atención! Posible Emergencia Médica</h3>
                                <p className="text-red-700 text-sm mt-1">Si tú o tu familiar presentan síntomas graves, <strong>por favor llama al 123 o acude a urgencias de tu EPS inmediatamente.</strong></p>
                            </div>
                        </div>
                    )}

                    <form id="publish-form" onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <label className="block text-sm font-semibold text-slate-700">Título de tu publicación <span className="text-red-500">*</span></label>
                                {/* Botón Dictado Título */}
                                <button type="button" onClick={() => handleDictate(setTitle, setIsListeningTitle, false)} className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors ${isListeningTitle ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    {isListeningTitle ? <Mic size={14} /> : <MicOff size={14} />} Dictar
                                </button>
                            </div>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. ¿Es cierto que el dolor empeora con el frío?" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500" required />
                        </div>

                        {similarPosts.length > 0 && !emergencyWarning && (
                            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-xl text-sm">
                                <p className="font-semibold text-yellow-800 mb-2 flex items-center gap-1"><Search size={14} /> Quizás ya resolvimos tu duda:</p>
                                {similarPosts.map(p => (
                                    <div key={p.id} className="text-yellow-700 mb-1 line-clamp-1 hover:underline cursor-pointer opacity-80">
                                        "{p.title}" - <span className="font-medium">{p.status}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div>
                            <div className="flex justify-between items-end mb-1">
                                <label className="block text-sm font-semibold text-slate-700">Detalles (Opcional)</label>
                                {/* Botón Dictado Detalles */}
                                <button type="button" onClick={() => handleDictate(setContent, setIsListeningContent, true)} className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded transition-colors ${isListeningContent ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                                    {isListeningContent ? <Mic size={14} /> : <MicOff size={14} />} Dictar
                                </button>
                            </div>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe detalles adicionales de tu duda o contexto..." className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 min-h-[100px] resize-y" />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Enfermedad <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={disease}
                                    onChange={(e) => setDisease(e.target.value)}
                                    list="disease-list"
                                    placeholder="Escribe la enfermedad..."
                                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 bg-white"
                                    required
                                />
                                <datalist id="disease-list">
                                    <option value="Fibrosis Quística" />
                                    <option value="Enfermedad de Huntington" />
                                    <option value="Esclerosis Lateral Amiotrófica (ELA)" />
                                    <option value="Síndrome de Marfan" />
                                    <option value="Esclerodermia" />
                                    <option value="Atrofia Muscular Espinal" />
                                    <option value="Hemofilia" />
                                </datalist>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Tipo de publicación</label>
                                <select value={type} onChange={(e) => setType(e.target.value)} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 bg-white">
                                    <option value="Duda">Duda general</option>
                                    <option value="Mito">Mito o rumor</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="px-6 py-4 border-t border-slate-200 flex justify-end gap-3 bg-white">
                    <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl font-medium text-slate-600 hover:bg-slate-100">Cancelar</button>
                    <button type="submit" form="publish-form" disabled={emergencyWarning} className="px-5 py-2.5 rounded-xl font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        Publicar Duda
                    </button>
                </div>

            </div>
        </div>
    );
}