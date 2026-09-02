// 1. Normalizador de entrada: Backend/LocalStorage -> Estado de React
export function adaptarMetaParaFormulario(metaBackend) {
  // Si no hay datos, devolvemos la estructura inicial estándar
  if (!metaBackend) return metaVacia;

  export const metaVacia = {
    detalles: '',
    eventos: '0',
    periodo: '',
    icono: '🏃',
    meta: '0',
    plazo: '2030-01-01',
    completado: '',
  };
  return {
    id: String(metaBackend.id ?? ''),
    detalles: String(metaBackend.detalles ?? ''),
    eventos: String(metaBackend.eventos ?? '0'),
    periodo: String(metaBackend.periodo ?? ''),
    icono: String(metaBackend.icono ?? '🏃'),
    meta: String(metaBackend.meta ?? '0'),
    plazo: metaBackend.plazo
      ? String(metaBackend.plazo).split('T')[0]
      : '2030-01-01',
    completado: String(metaBackend.completado ?? '0'),
  };
}

// 2. Normalizador de salida: Estado de React -> Backend/LocalStorage
export function adaptarMetaParaBackend(formState) {
  return {
    ...(formState.id ? { id: formState.id } : {}),
    detalles: formState.detalles.trim(),
    periodo: formState.periodo,
    icono: formState.icono,

    // Convertimos de nuevo a números para enviar al Backend/DB
    eventos: Number(formState.eventos),
    meta: Number(formState.meta),
    completado: Number(formState.completado),
    plazo: formState.plazo,
  };
}
