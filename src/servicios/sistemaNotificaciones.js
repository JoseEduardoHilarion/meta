let suscriptores = [];
let ultimaNotificacion = null;
let timerId = null; // Guardamos el ID del timer para poder cancelarlo si llega otra notificación

export const obtenerNotificacion = () => ultimaNotificacion;

export const suscribirNotificacion = (callback) => {
  suscriptores.push(callback);
  return () => {
    suscriptores = suscriptores.filter((s) => s !== callback);
  };
};

// La función mágica ahora maneja su propio tiempo
export function notificar(mensaje, tipo = "success") {
  // Si había un temporizador corriendo de una notificación anterior, lo cancelamos
  if (timerId) clearTimeout(timerId);

  // Seteamos la nueva notificación
  ultimaNotificacion = { mensaje, tipo, id: Date.now() };
  suscriptores.forEach((callback) => callback());

  // Programamos el borrado automático para dentro de 5 segundos
  timerId = setTimeout(() => {
    ultimaNotificacion = null;
    suscriptores.forEach((callback) => callback());
  }, 4000);
}
