export const listaPeriodo = [
  { value: 'día', label: 'día' },
  { value: 'semana', label: 'semana' },
  { value: 'mes', label: 'mes' },
  { value: 'año', label: 'año' },
];
export const iconos = [
  { value: '💻', label: '💻' },
  { value: '🏃', label: '🏃' },
  { value: '📚', label: '📚' },
  { value: '✈️', label: '✈️' },
  { value: '💵', label: '💵' },
  { value: '🍎', label: '🍎' },
  { value: '💧', label: '💧' },
];

export const listaMock = [
  {
    id: '1',
    icono: '🍎',
    eventos: 15,
    periodo: 'mes',
    detalles: 'Alimentación saludable',
    meta: 100,
    plazo: '2026/7/5',
    completado: 45,
  },
  {
    id: '2',
    icono: '🏃',
    eventos: 4,
    periodo: 'mes',
    detalles: 'Entrenamiento de cardio',
    meta: 50,
    plazo: '2026/7/5',
    completado: 50,
  },
  {
    id: '3',
    icono: '📚',
    eventos: 12,
    periodo: 'mes',
    detalles: 'Lectura técnica semanal',
    meta: 20,
    plazo: '2026/7/5',
    completado: 12,
  },
  {
    id: '4',
    icono: '💻',
    eventos: 8,
    periodo: 'mes',
    detalles: 'Proyecto de React',
    meta: 1000,
    plazo: '2026/7/5',
    completado: 250,
  },
  {
    id: '5',
    icono: '💧',
    eventos: 20,
    periodo: 'mes',
    detalles: 'Hidratación diaria',
    meta: 8,
    plazo: '2026/7/5',
    completado: 1,
  },
];

export const metaVacia = {
  detalles: '',
  eventos: '0',
  periodo: '',
  icono: '🏃',
  meta: '0',
  plazo: '2030-01-01',
  completado: '',
};
