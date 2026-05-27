// src/components/ui/Toaster.jsx
import { useSyncExternalStore } from 'react';
import {
  obtenerNotificacion,
  suscribirNotificacion,
} from '../../servicios/sistemaNotificaciones';
import './Toaster.css';
//////////////////////////////////////////////////////
//////////////////////////////////////////////////////
export function Toaster() {
  // Leemos directamente la alerta del almacén externo
  const alerta = useSyncExternalStore(
    suscribirNotificacion,
    obtenerNotificacion,
  );

  // Si el almacén externo dice null (porque pasaron los 4 segundos), no dibujamos nada
  if (!alerta) return null;

  return (
    <div className={`notification-toast neumo-flat ${alerta.tipo}`}>
      <span className="notification-icon">
        {alerta.tipo === 'success' ? '✓' : '✕'}
      </span>
      <p>{alerta.mensaje}</p>
    </div>
  );
}
