import React from 'react';
import { ArrowLeft, User, Stethoscope } from 'lucide-react';
import { InsigniaEstado } from '../InsigniaEstado/InsigniaEstado';
import { TarjetaPost } from '../TarjetaPost/TarjetaPost';
import './PerfilUsuario.css';

export const PerfilUsuario = ({ currentUser, posts, savedPostIds, profileTab, onTabChange, onBack, onVerPost }) => {
    const isDoctor = currentUser?.role === 'doctor';

    const postsFiltrados = posts.filter(post =>
        profileTab === 'mis-dudas' ? post.isMine : savedPostIds.includes(post.id)
    );

    return (
        <div className="perfil-usuario" aria-label="Perfil de usuario">
            <button className="perfil-usuario__volver" onClick={onBack} type="button">
                <ArrowLeft size={16} /> Volver al inicio
            </button>

            {/* Tarjeta de perfil */}
            <div className="perfil-usuario__tarjeta">
                {isDoctor ? (
                    <img
                        src={`https://ui-avatars.com/api/?name=${currentUser.name.replace(' ', '+')}&background=0D8B93&color=fff`}
                        alt={`Avatar de ${currentUser.name}`}
                        className="perfil-usuario__avatar-medico"
                    />
                ) : (
                    <div className="perfil-usuario__avatar-anonimo">
                        <User size={32} />
                    </div>
                )}
                <div>
                    <h2 className="perfil-usuario__nombre">
                        {isDoctor ? currentUser.name : 'Mi Perfil'}
                    </h2>
                    <p className="perfil-usuario__tipo">
                        {isDoctor ? currentUser.specialty : currentUser.type}
                    </p>
                </div>
            </div>

            {/* Tabs de paciente */}
            {!isDoctor && (
                <>
                    <div className="perfil-usuario__tabs" role="tablist">
                        <button
                            id="tab-mis-dudas"
                            role="tab"
                            aria-selected={profileTab === 'mis-dudas'}
                            className={`perfil-usuario__tab ${profileTab === 'mis-dudas' ? 'perfil-usuario__tab--activo' : ''}`}
                            onClick={() => onTabChange('mis-dudas')}
                            type="button"
                        >
                            Mis Dudas
                        </button>
                        <button
                            id="tab-guardados"
                            role="tab"
                            aria-selected={profileTab === 'guardados'}
                            className={`perfil-usuario__tab ${profileTab === 'guardados' ? 'perfil-usuario__tab--activo' : ''}`}
                            onClick={() => onTabChange('guardados')}
                            type="button"
                        >
                            Guardados ({savedPostIds.length})
                        </button>
                    </div>

                    {postsFiltrados.length === 0 ? (
                        <div className="perfil-usuario__vacio">
                            <p>
                                {profileTab === 'mis-dudas'
                                    ? 'Aún no has publicado ninguna duda.'
                                    : 'No has guardado publicaciones aún.'}
                            </p>
                        </div>
                    ) : (
                        <div className="perfil-usuario__grid">
                            {postsFiltrados.map(post => (
                                <TarjetaPost key={post.id} post={post} onClick={onVerPost} />
                            ))}
                        </div>
                    )}
                </>
            )}

            {/* Vista de médico: estadísticas */}
            {isDoctor && (
                <div className="perfil-usuario__stats-medico">
                    <div className="perfil-usuario__stat-card perfil-usuario__stat-card--azul">
                        <span className="perfil-usuario__stat-numero">
                            {posts.filter(p => p.status === 'En revisión').length}
                        </span>
                        <span className="perfil-usuario__stat-label">Pendientes de revisión</span>
                    </div>
                    <div className="perfil-usuario__stat-card perfil-usuario__stat-card--verde">
                        <span className="perfil-usuario__stat-numero">
                            {posts.filter(p => p.doctorName === currentUser.name).length}
                        </span>
                        <span className="perfil-usuario__stat-label">Validadas por ti</span>
                    </div>
                </div>
            )}
        </div>
    );
};
