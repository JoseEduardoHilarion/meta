import { useSyncExternalStore } from 'react';
import {
  obtenerNotificacion,
  suscribirNotificacion,
} from '../../servicios/sistemaNotificaciones';
import './Toaster.css';

export const Toaster = () => {
  const alerta = useSyncExternalStore(
    suscribirNotificacion,
    obtenerNotificacion,
  );

  // Almacén externo dice null (porque pasaron los 4.5 segundos), no dibujamos nada
  if (!alerta) return null;
  return (
    <div className={`notification-toast neumo-concave ${alerta.tipo}`}>
      <span className="notification-icon neumo-convex">
        {alerta.tipo === 'success' ? '✓' : '✕'}
      </span>
      <p>{alerta.mensaje}</p>
    </div>
  );
};
