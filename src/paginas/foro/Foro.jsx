import React, { useState, useEffect } from 'react';
import { Building2, User, Bell, LogIn, Stethoscope, CheckCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarraBusqueda } from '../../componentes/comp-foro/BarraBusqueda/BarraBusqueda';
import { CuadrosInfo } from '../../componentes/comp-foro/CuadrosInfo/CuadrosInfo';
import { DetallePost } from '../../componentes/comp-foro/DetallePost/DetallePost';
import { ModalPublicar } from '../../componentes/comp-foro/ModalPublicar/ModalPublicar';
import { ChatSofia } from '../../componentes/comp-foro/ChatSofia/ChatSofia';
import { Directorio } from '../../componentes/comp-foro/Directorio/Directorio';
import { PerfilUsuario } from '../../componentes/comp-foro/PerfilUsuario/PerfilUsuario';
import { initialPosts } from '../../datos/foroDatos';
import logoCIB from '../../imagenes/logo_CIBblanco.png';
import logoEHR from '../../imagenes/logo-enfermedadblanco.png';
import './Foro.css';

// --- Usuarios de demostración ---
const USUARIOS = [
    { id: 'p1', role: 'patient', name: 'Ana Martínez', type: 'Paciente Anónimo' },
    { id: 'p2', role: 'patient', name: 'Carlos Díaz', type: 'Cuidador' },
    { id: 'd1', role: 'doctor', name: 'Dra. Elena Gómez', specialty: 'Neumóloga Pediatra' },
    { id: 'd2', role: 'doctor', name: 'Dr. Carlos Ruiz', specialty: 'Genetista Clínico' }
];

// --- Hub de Login ---
const LoginHub = ({ onLogin }) => (
    <div className="foro-login">
        <div className="foro-login__tarjeta">
            <div className="foro-login__icono">
                <CheckCircle size={40} />
            </div>
            <h1 className="foro-login__titulo">
                Foro<span className="foro-login__titulo-acento">Huérfanas</span> Colombia
            </h1>
            <p className="foro-login__subtitulo">Selecciona un perfil para ingresar a la plataforma de demostración.</p>

            <div className="foro-login__grupos">
                <div className="foro-login__grupo">
                    <h3 className="foro-login__grupo-titulo"><User size={18} /> Pacientes y Familiares</h3>
                    {USUARIOS.filter(u => u.role === 'patient').map(user => (
                        <button key={user.id} className="foro-login__btn-usuario" onClick={() => onLogin(user)} type="button">
                            <div className="foro-login__avatar-p"><User size={22} /></div>
                            <div>
                                <p className="foro-login__usuario-nombre">{user.name}</p>
                                <p className="foro-login__usuario-tipo">{user.type}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="foro-login__grupo">
                    <h3 className="foro-login__grupo-titulo"><Stethoscope size={18} /> Médicos Especialistas</h3>
                    {USUARIOS.filter(u => u.role === 'doctor').map(user => (
                        <button key={user.id} className="foro-login__btn-usuario foro-login__btn-usuario--doctor" onClick={() => onLogin(user)} type="button">
                            <img
                                src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=332a7e&color=fff`}
                                alt={`Avatar de ${user.name}`}
                                className="foro-login__avatar-d"
                            />
                            <div>
                                <p className="foro-login__usuario-nombre">
                                    {user.name}
                                    <CheckCircle size={13} className="foro-login__check" />
                                </p>
                                <p className="foro-login__usuario-especialidad">{user.specialty}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// --- Página Principal del Foro ---
export const Foro = () => {
    const [currentUser, setCurrentUser] = useState(null);
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
        return <LoginHub onLogin={setCurrentUser} />;
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
            {/* Header propio del foro */}
            <header className="foro-header">
                <div className="foro-header__contenido">

                    {/* Logo CIB izquierda + botón volver */}
                    <div className="foro-header__izquierda">
                        <div className="foro-header__logos">
                            <Link to="/" className="foro-header__logo-link" aria-label="Volver al sitio principal CIB">
                                <img src={logoCIB} alt="Logo CIB" className="foro-header__logo-cib" />
                            </Link>
                        </div>

                        {/* Botón volver al CIB */}
                        <Link
                            to="/"
                            className="foro-header__btn-volver"
                            aria-label="Volver a la página principal del CIB"
                        >
                            <ArrowLeft size={15} /> Volver al CIB
                        </Link>

                        {/* Separador */}
                        <span className="foro-header__separador" aria-hidden="true">|</span>

                        {/* Nombre del foro */}
                        <button
                            className="foro-header__nombre-foro"
                            onClick={handleBackHome}
                            type="button"
                            aria-label="Ir al inicio del foro"
                        >
                            Foro<span className="foro-header__nombre-acento">Huérfanas</span>
                        </button>

                        {/* Directorio */}
                        <button
                            id="btn-directorio"
                            className={`foro-header__btn-nav ${currentView === 'directory' ? 'foro-header__btn-nav--activo' : ''}`}
                            onClick={() => setCurrentView('directory')}
                            type="button"
                        >
                            <Building2 size={15} /> Directorio de Apoyo
                        </button>
                    </div>

                    {/* Controles derecha */}
                    <div className="foro-header__derecha">
                        {/* Notificaciones */}
                        <div className="foro-header__notificaciones">
                            <button
                                id="btn-notificaciones"
                                className="foro-header__btn-icono"
                                onClick={() => setShowNotifications(prev => !prev)}
                                type="button"
                                aria-label="Ver notificaciones"
                            >
                                <Bell size={20} />
                                {notifications.some(n => !n.read) && (
                                    <span className="foro-header__notif-badge" aria-label="Tienes notificaciones sin leer" />
                                )}
                            </button>

                            {showNotifications && (
                                <div className="foro-header__notif-panel" role="region" aria-label="Notificaciones">
                                    <div className="foro-header__notif-titulo">Notificaciones</div>
                                    {notifications.map(notif => (
                                        <div key={notif.id} className={`foro-header__notif-item ${!notif.read ? 'foro-header__notif-item--nueva' : ''}`}>
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
                            className="foro-header__btn-perfil"
                            onClick={() => setCurrentView('profile')}
                            type="button"
                            aria-label="Ver perfil"
                        >
                            {isDoctor ? (
                                <img
                                    src={`https://ui-avatars.com/api/?name=${currentUser.name.replace(' ', '+')}&background=332a7e&color=fff`}
                                    alt="Avatar"
                                    className="foro-header__avatar-medico"
                                />
                            ) : (
                                <div className="foro-header__avatar-p"><User size={18} /></div>
                            )}
                            <span className="foro-header__usuario-nombre">{currentUser.name}</span>
                        </button>

                        {/* Cambiar perfil */}
                        <button
                            className="foro-header__btn-logout"
                            onClick={handleLogout}
                            title="Cambiar perfil"
                            aria-label="Cambiar perfil"
                            type="button"
                        >
                            <LogIn size={18} />
                        </button>

                        {/* Logo EHR derecha */}
                        <img src={logoEHR} alt="Logo Enfermedades Huérfanas" className="foro-header__logo-ehr" />
                    </div>
                </div>
            </header>

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
