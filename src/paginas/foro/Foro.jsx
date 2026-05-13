import React, { useState, useEffect } from 'react';
import { Building2, User, Bell, LogIn, Stethoscope, CheckCircle, UserPlus, Mail, Lock, ChevronDown } from 'lucide-react';
import { BarraBusqueda } from '../../componentes/comp-foro/BarraBusqueda/BarraBusqueda';
import { CuadrosInfo } from '../../componentes/comp-foro/CuadrosInfo/CuadrosInfo';
import { DetallePost } from '../../componentes/comp-foro/DetallePost/DetallePost';
import { ModalPublicar } from '../../componentes/comp-foro/ModalPublicar/ModalPublicar';
import { ChatSofia } from '../../componentes/comp-foro/ChatSofia/ChatSofia';
import { Directorio } from '../../componentes/comp-foro/Directorio/Directorio';
import { PerfilUsuario } from '../../componentes/comp-foro/PerfilUsuario/PerfilUsuario';
import { initialPosts } from '../../datos/foroDatos';
import './Foro.css';

// --- Sign Up Hub ---
const SignUpHub = ({ onSignUp }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        specialty: '',
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!formData.email.trim()) newErrors.email = 'El correo es obligatorio';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Correo inválido';
        if (!formData.password) newErrors.password = 'La contraseña es obligatoria';
        else if (formData.password.length < 6) newErrors.password = 'Mínimo 6 caracteres';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
        if (!formData.role) newErrors.role = 'Selecciona un tipo de usuario';
        if (formData.role === 'doctor' && !formData.specialty.trim()) newErrors.specialty = 'La especialidad es obligatoria';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const user = {
            id: 'u_' + Date.now(),
            role: formData.role,
            name: formData.name,
            ...(formData.role === 'doctor'
                ? { specialty: formData.specialty }
                : { type: formData.role === 'patient' ? 'Paciente' : 'Cuidador' }
            ),
        };
        // Guardar en localStorage para persistir la sesión
        localStorage.setItem('foroUser', JSON.stringify(user));
        onSignUp(user);
    };

    return (
        <div className="foro-signup">
            <div className="foro-signup__tarjeta">
                <div className="foro-signup__icono">
                    <UserPlus size={36} />
                </div>
                <h2 className="foro-signup__titulo">
                    Únete a Foro<span className="foro-signup__titulo-acento">Huérfanas</span>
                </h2>
                <p className="foro-signup__subtitulo">
                    Crea tu cuenta para participar en la comunidad, publicar tus dudas y recibir orientación médica verificada.
                </p>

                <form className="foro-signup__form" onSubmit={handleSubmit} noValidate>
                    {/* Nombre */}
                    <div className="foro-signup__campo">
                        <label className="foro-signup__label" htmlFor="signup-name">
                            <User size={15} /> Nombre completo
                        </label>
                        <input
                            id="signup-name"
                            className={`foro-signup__input ${submitted && errors.name ? 'foro-signup__input--error' : ''}`}
                            type="text"
                            name="name"
                            placeholder="Ej: Ana María López"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {submitted && errors.name && <span className="foro-signup__error">{errors.name}</span>}
                    </div>

                    {/* Correo */}
                    <div className="foro-signup__campo">
                        <label className="foro-signup__label" htmlFor="signup-email">
                            <Mail size={15} /> Correo electrónico
                        </label>
                        <input
                            id="signup-email"
                            className={`foro-signup__input ${submitted && errors.email ? 'foro-signup__input--error' : ''}`}
                            type="email"
                            name="email"
                            placeholder="correo@ejemplo.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {submitted && errors.email && <span className="foro-signup__error">{errors.email}</span>}
                    </div>

                    {/* Tipo de usuario */}
                    <div className="foro-signup__campo">
                        <label className="foro-signup__label" htmlFor="signup-role">
                            <ChevronDown size={15} /> Tipo de usuario
                        </label>
                        <select
                            id="signup-role"
                            className={`foro-signup__input foro-signup__select ${submitted && errors.role ? 'foro-signup__input--error' : ''}`}
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >
                            <option value="">Selecciona tu perfil...</option>
                            <option value="patient">Paciente</option>
                            <option value="caregiver">Cuidador / Familiar</option>
                            <option value="doctor">Médico Especialista</option>
                        </select>
                        {submitted && errors.role && <span className="foro-signup__error">{errors.role}</span>}
                    </div>

                    {/* Especialidad (solo médicos) */}
                    {formData.role === 'doctor' && (
                        <div className="foro-signup__campo foro-signup__campo--animado">
                            <label className="foro-signup__label" htmlFor="signup-specialty">
                                <Stethoscope size={15} /> Especialidad médica
                            </label>
                            <input
                                id="signup-specialty"
                                className={`foro-signup__input ${submitted && errors.specialty ? 'foro-signup__input--error' : ''}`}
                                type="text"
                                name="specialty"
                                placeholder="Ej: Neumología Pediátrica"
                                value={formData.specialty}
                                onChange={handleChange}
                            />
                            {submitted && errors.specialty && <span className="foro-signup__error">{errors.specialty}</span>}
                        </div>
                    )}

                    {/* Contraseña */}
                    <div className="foro-signup__fila">
                        <div className="foro-signup__campo">
                            <label className="foro-signup__label" htmlFor="signup-password">
                                <Lock size={15} /> Contraseña
                            </label>
                            <input
                                id="signup-password"
                                className={`foro-signup__input ${submitted && errors.password ? 'foro-signup__input--error' : ''}`}
                                type="password"
                                name="password"
                                placeholder="Mínimo 6 caracteres"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {submitted && errors.password && <span className="foro-signup__error">{errors.password}</span>}
                        </div>
                        <div className="foro-signup__campo">
                            <label className="foro-signup__label" htmlFor="signup-confirm">
                                <Lock size={15} /> Confirmar contraseña
                            </label>
                            <input
                                id="signup-confirm"
                                className={`foro-signup__input ${submitted && errors.confirmPassword ? 'foro-signup__input--error' : ''}`}
                                type="password"
                                name="confirmPassword"
                                placeholder="Repite tu contraseña"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {submitted && errors.confirmPassword && <span className="foro-signup__error">{errors.confirmPassword}</span>}
                        </div>
                    </div>

                    <button type="submit" className="foro-signup__btn-submit">
                        <UserPlus size={18} />
                        Crear mi cuenta
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Página Principal del Foro ---
export const Foro = () => {
    const [currentUser, setCurrentUser] = useState(() => {
        // Restaurar usuario desde localStorage si existe
        const saved = localStorage.getItem('foroUser');
        return saved ? JSON.parse(saved) : null;
    });
    const [posts, setPosts] = useState(initialPosts);
    const [currentView, setCurrentView] = useState('home'); // 'home' | 'detail' | 'profile' | 'directory'
    const [selectedPost, setSelectedPost] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('Todos');
    const [isListeningSearch, setIsListeningSearch] = useState(false);
    const [savedPostIds, setSavedPostIds] = useState([1]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Bienvenido a ForoHuérfanas. Empieza buscando o publicando tus dudas.', read: false, time: 'Hace 1 día' }
    ]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [profileTab, setProfileTab] = useState('mis-dudas');

    const isDoctor = currentUser?.role === 'doctor';

    useEffect(() => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    }, [currentView]);

    if (!currentUser) {
        return <SignUpHub onSignUp={setCurrentUser} />;
    }

    // --- HANDLERS ---
    const handleVerPost = (post) => {
        setSelectedPost(post);
        setCurrentView('detail');
    };

    const handleBackHome = () => {
        setSelectedPost(null);
        setCurrentView('home');
    };

    const handleLogout = () => {
        localStorage.removeItem('foroUser');
        setCurrentUser(null);
        setCurrentView('home');
    };

    const handleCreatePost = (newPost) => {
        setPosts([{ ...newPost, id: Date.now(), isMine: true }, ...posts]);
        setIsModalOpen(false);
        setNotifications([
            { id: Date.now(), text: 'Tu duda fue publicada y está en revisión.', read: false, time: 'Justo ahora' },
            ...notifications
        ]);
    };

    const handleToggleSave = (postId) => {
        setSavedPostIds(prev =>
            prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
        );
    };

    const handleUpvote = (postId) => {
        setPosts(posts.map(p => p.id === postId ? { ...p, upvotes: p.upvotes + 1 } : p));
        if (selectedPost?.id === postId) {
            setSelectedPost(prev => ({ ...prev, upvotes: prev.upvotes + 1 }));
        }
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

    const handleShare = (post) => {
        const text = `Mira esta respuesta médica en ForoHuérfanas:\n\n*${post.title}*\n\n👨‍⚕️ ${post.doctorName} responde:\n"${post.doctorResponse}"`;
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
    };

    const handleDoctorValidation = (status, responseText, sourcesText) => {
        const updated = {
            ...selectedPost,
            status,
            doctorResponse: responseText,
            doctorName: currentUser.name,
            doctorSpecialty: currentUser.specialty,
            sources: sourcesText || null,
            date: 'Validado justo ahora'
        };
        setPosts(posts.map(p => p.id === selectedPost.id ? updated : p));
        setSelectedPost(updated);
    };

    const handleDictateSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert('Tu navegador no soporta el dictado por voz. Intenta en Chrome o Edge.');
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

    // Posts filtrados
    const filteredPosts = posts.filter(post => {
        const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.disease.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = filterStatus === 'Todos' || post.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <div className={`foro-pagina ${isDoctor ? 'foro-pagina--medico' : ''}`}>
            {/* Sub-navegación del foro (complementa al Header principal) */}
            <div className="foro-subnav">
                <div className="foro-subnav__contenido">
                    {/* Izquierda: nombre del foro + directorio */}
                    <div className="foro-subnav__izquierda">
                        <button
                            className="foro-subnav__nombre-foro"
                            onClick={handleBackHome}
                            type="button"
                            aria-label="Ir al inicio del foro"
                        >
                            Foro<span className="foro-subnav__nombre-acento">Huérfanas</span>
                        </button>

                        <span className="foro-subnav__separador" aria-hidden="true">|</span>

                        <button
                            id="btn-directorio"
                            className={`foro-subnav__btn-nav ${currentView === 'directory' ? 'foro-subnav__btn-nav--activo' : ''}`}
                            onClick={() => setCurrentView('directory')}
                            type="button"
                        >
                            <Building2 size={15} /> Directorio de Apoyo
                        </button>
                    </div>

                    {/* Derecha: notificaciones + perfil + logout */}
                    <div className="foro-subnav__derecha">
                        {/* Notificaciones */}
                        <div className="foro-subnav__notificaciones">
                            <button
                                id="btn-notificaciones"
                                className="foro-subnav__btn-icono"
                                onClick={() => setShowNotifications(prev => !prev)}
                                type="button"
                                aria-label="Ver notificaciones"
                            >
                                <Bell size={18} />
                                {notifications.some(n => !n.read) && (
                                    <span className="foro-subnav__notif-badge" aria-label="Tienes notificaciones sin leer" />
                                )}
                            </button>

                            {showNotifications && (
                                <div className="foro-subnav__notif-panel" role="region" aria-label="Notificaciones">
                                    <div className="foro-subnav__notif-titulo">Notificaciones</div>
                                    {notifications.map(notif => (
                                        <div key={notif.id} className={`foro-subnav__notif-item ${!notif.read ? 'foro-subnav__notif-item--nueva' : ''}`}>
                                            <p>{notif.text}</p>
                                            <span>{notif.time}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Perfil */}
                        <button
                            id="btn-perfil"
                            className="foro-subnav__btn-perfil"
                            onClick={() => setCurrentView('profile')}
                            type="button"
                            aria-label="Ver perfil"
                        >
                            {isDoctor ? (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${currentUser.name.replace(' ', '+')}&background=332a7e&color=fff`}
                                    alt="Avatar"
                                    className="foro-subnav__avatar-medico"
                                />
                            ) : (
                                <div className="foro-subnav__avatar-p"><User size={16} /></div>
                            )}
                            <span className="foro-subnav__usuario-nombre">{currentUser.name}</span>
                        </button>

                        {/* Cambiar perfil / cerrar sesión */}
                        <button
                            className="foro-subnav__btn-logout"
                            onClick={handleLogout}
                            title="Cerrar sesión"
                            aria-label="Cerrar sesión"
                            type="button"
                        >
                            <LogIn size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <main className="foro-main" id="foro-main-content">

                {/* Vista: Home */}
                {currentView === 'home' && (
                    <div className="foro-vista foro-vista--home">
                        {!isDoctor && (
                            <BarraBusqueda
                                searchQuery={searchQuery}
                                onSearchChange={setSearchQuery}
                                onPublicar={() => setIsModalOpen(true)}
                                isListening={isListeningSearch}
                                onDictate={handleDictateSearch}
                            />
                        )}

                        {isDoctor && (
                            <div className="foro-panel-medico">
                                <div>
                                    <h2 className="foro-panel-medico__titulo">Panel de Especialista</h2>
                                    <p className="foro-panel-medico__subtitulo">
                                        Bienvenido de nuevo, {currentUser.name}. Ayuda a combatir la desinformación validando estas dudas.
                                    </p>
                                </div>
                                <div className="foro-panel-medico__stats">
                                    <div className="foro-panel-medico__stat foro-panel-medico__stat--pendiente">
                                        <span className="foro-panel-medico__stat-num">
                                            {posts.filter(p => p.status === 'En revisión').length}
                                        </span>
                                        <span className="foro-panel-medico__stat-label">Pendientes</span>
                                    </div>
                                    <div className="foro-panel-medico__stat foro-panel-medico__stat--resueltas">
                                        <span className="foro-panel-medico__stat-num">
                                            {posts.filter(p => p.doctorName === currentUser.name).length}
                                        </span>
                                        <span className="foro-panel-medico__stat-label">Resueltas por ti</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <CuadrosInfo
                            posts={filteredPosts}
                            filterStatus={filterStatus}
                            onFilterChange={setFilterStatus}
                            onVerPost={handleVerPost}
                        />
                    </div>
                )}

                {/* Vista: Directorio */}
                {currentView === 'directory' && (
                    <Directorio onVolver={handleBackHome} />
                )}

                {/* Vista: Perfil */}
                {currentView === 'profile' && (
                    <PerfilUsuario
                        currentUser={currentUser}
                        posts={posts}
                        savedPostIds={savedPostIds}
                        profileTab={profileTab}
                        onTabChange={setProfileTab}
                        onBack={handleBackHome}
                        onVerPost={handleVerPost}
                    />
                )}

                {/* Vista: Detalle de publicación */}
                {currentView === 'detail' && selectedPost && (
                    <DetallePost
                        post={selectedPost}
                        currentUser={currentUser}
                        savedPostIds={savedPostIds}
                        isSpeaking={isSpeaking}
                        onBack={handleBackHome}
                        onToggleSave={handleToggleSave}
                        onUpvote={handleUpvote}
                        onSpeak={handleSpeak}
                        onShare={handleShare}
                        onDoctorValidation={handleDoctorValidation}
                    />
                )}
            </main>

            {/* Modal publicar */}
            {isModalOpen && !isDoctor && (
                <ModalPublicar
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreatePost}
                    existingPosts={posts}
                />
            )}

            {/* Chatbot SofIA - solo para pacientes */}
            {!isDoctor && <ChatSofia />}
        </div>
    );
};
