fetchGenerico(url, metodo, registro = {}) {
  const opciones = {
    method: metodo
  };

  if (Object.keys(registro).length > 0) {
    opciones.headers = {
      'Content-Type': 'application/json'
    };

    opciones.body = JSON.stringify(registro);
  }

  // fetch(url, opciones)
}

const ERRORES_TABLA = {
  SERVIDOR: 'ERROR_SERVIDOR',
  CONEXION: 'ERROR_CONEXION',
  DATOS_INVALIDOS: 'DATOS_INVALIDOS',
  REGISTRO_NO_ENCONTRADO: 'REGISTRO_NO_ENCONTRADO',
};

HTTP                 codigo_error de Tabla
────────────────────────────────────────────
500
502
503
504       ─────────→  ERROR_SERVIDOR

fallo de red        ─────────→  ERROR_CONEXION

400
422       ─────────→  DATOS_INVALIDOS

404       ─────────→  REGISTRO_NO_ENCONTRADO

