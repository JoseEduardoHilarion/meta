/////////////////////////////////////////////////////////////////////////
////////////////////////Validador Central////////////////////////////////
/**
 * Valida de forma centralizada las reglas de negocio de una Meta.
 * @param {Object} datos - Objeto con { detalles, meta, completado }
 * @returns {Object} { esValido: boolean, errores: Object }
 */
export function validarMeta(datos) {
  const errores = {};

  const completadoNum = Number(datos.completado || 0);
  const metaNum = Number(datos.meta || 0);

  // Regla detalles
  if (!datos.detalles || datos.detalles.trim() === '') {
    errores.detalles = 'La descripción de la meta no puede estar vacía.';
  }
  if (!datos.periodo || datos.periodo.trim() === '') {
    // Le ponés un string común. No pasa nada si no lo usás en la pantalla.
    errores.periodo = 'Debe seleccionar un período';
  }
  // Regla frecuncia
  if (datos.eventos <= 0) {
    errores.eventos = 'La frecuencia debe ser mayor a 0.';
  }

  // Regla meta
  if (metaNum <= 0) {
    errores.meta = 'El objetivo total debe ser mayor a 0.';
  }

  // Regla "RELACIÓN MUTUA completado <= meta"
  if (completadoNum < 0) {
    errores.completado = 'El progreso no puede ser un número negativo.';
  } else if (completadoNum > metaNum) {
    errores.completado = `No podés haber completado (${completadoNum}) más de tu objetivo total (${metaNum}).`;
  }

  return {
    esValido: Object.keys(errores).length === 0, // Es válido si no hay ningún error en el objeto
    errores, // Devolvemos el diccionario de errores por campo
  };
}
export function validarCredenciales(datos) {
  const errores = {};

  if (!datos.usuario || datos.usuario.trim() === '') {
    errores.usuario =
      'Debe ingresar nombre de Usuario o bien correo, no puede estar vacía.';
  }

  if (!datos.password || datos.password.trim() === '') {
    errores.password =
      'Debe ingresar Contraseña password, no puede estar vacía.';
  }
  if (!datos.password2 || datos.password2.trim() === '') {
    errores.password2 =
      'Debe ingresar Contraseña password, no puede estar vacía.';
  }
  if (
    !datos.password ||
    !datos.password2 ||
    datos.password === datos.password2
  ) {
    errores.password = 'Deben ser iguales las contraseñas';
    errores.password2 = errores.password;
  }

  return {
    esValido: Object.keys(errores).length === 0, // Es válido si no hay ningún error en el objeto
    errores, // Devolvemos el diccionario de errores por campo
  };
}
