import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { InsigniaEstado } from '../InsigniaEstado/InsigniaEstado';
import './TarjetaPost.css';

export const TarjetaPost = ({ post, onClick }) => {
    return (
        <article
            className="tarjeta-post"
            onClick={() => onClick(post)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onClick(post)}
            aria-label={`Ver publicación: ${post.title}`}
        >
            <div className="tarjeta-post__cabecera">
                <InsigniaEstado status={post.status} />
                <div className="tarjeta-post__votos">
                    <ThumbsUp size={12} />
                    {post.upvotes}
                </div>
            </div>

            <h4 className="tarjeta-post__titulo">{post.title}</h4>
            <p className="tarjeta-post__contenido">
                {post.content || "Sin detalles adicionales."}
            </p>

            <div className="tarjeta-post__pie">
                <span className="tarjeta-post__enfermedad">{post.disease}</span>
            </div>
        </article>
    );
};
