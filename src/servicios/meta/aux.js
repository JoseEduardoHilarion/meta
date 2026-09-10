


const fetchUrl = `${URL_BASE}/${endpointMetas}`;

/////////////////////////////rttptrd errores




const mensajesError = {
200:"OK",
201:"creado",

//red
  400: 'Datos incorrectos',
  401: 'Debes iniciar sesión.',
  403: 'No tienes permiso.',

  404: 'Registro no encontrado',

//HTTP
  500: 'Error interno del servidor.',
  504:
  desconocido: 'Ocurrió un error inesperado.'
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

