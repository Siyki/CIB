import React from 'react';
import { CheckCircle, XCircle, Clock, Stethoscope } from 'lucide-react';
import './InsigniaEstado.css';

export const InsigniaEstado = ({ status }) => {
    switch (status) {
        case 'Desmentido':
            return (
                <span className="insignia insignia-desmentido">
                    <XCircle size={14} /> Desmentido
                </span>
            );
        case 'Confirmado':
            return (
                <span className="insignia insignia-confirmado">
                    <CheckCircle size={14} /> Confirmado
                </span>
            );
        case 'Requiere consulta médica':
            return (
                <span className="insignia insignia-consulta">
                    <Stethoscope size={14} /> Requiere consulta
                </span>
            );
        case 'En revisión':
            return (
                <span className="insignia insignia-revision">
                    <Clock size={14} /> En revisión
                </span>
            );
        default:
            return (
                <span className="insignia insignia-default">
                    {status}
                </span>
            );
    }
};
