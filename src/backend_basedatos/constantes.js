export const SIN_ERROR = 'SIN_ERROR';
export const URL_BASE = 'http://localhost:3000';
export const HORA = 3600000; //EN MILISEGUNDOS

export const ERRORES_BD = {
  SERVIDOR: 'No se pudo comunicar con Base de Datos.',
  CONEXION: 'No hay conexión con la Base de Datos.',
  DATOS_INVALIDOS: 'Los datos enviados no son válidos.',
  REGISTRO_NO_ENCONTRADO: 'El registro no existe.',
  /////
  USUARIO_NO_REGISTRADO: 'El Usuario no esta REGISTRADO',
  //////
  CONTRASENA_INCORRECTA: 'Contraseña incorrecta',
  Existe_DNI_o_EMAIL: 'El DNI o bien el EMAIL ya existen',
  ////
  TOKEN_INVALIDO: 'Token invalido',
  TOKEN_VENCIDO: 'Token vencido',
  //////
};
export const ERRORES_APLICACION = {
  ...ERRORES_BD,
  SESION_INVALIDA: 'La sesión no es válida.',
};
