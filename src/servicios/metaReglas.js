export function validarMeta(datos, campo = null) {
  const errores = {};
  const reglas = {
    detalles: () => {
      if (!datos.detalles?.trim())
        errores.detalles = 'La descripción no puede estar vacía.';
      else errores.detalles = '';
    },
    periodo: () => {
      if (!datos.periodo?.trim())
        errores.periodo = 'Debe seleccionar un período';
      else errores.periodo = '';
    },
    eventos: () => {
      if (!datos.eventos?.trim())
        errores.eventos = 'La frecuencia no puede estar vacia.';
      else if (Number(datos.eventos) <= 0)
        errores.eventos = 'La frecuencia debe ser mayor a 0.';
      else errores.eventos = '';
    },
    meta: () => {
      if (!datos.meta?.trim()) errores.meta = 'La Meta no puede estar vacia.';
      else if (Number(datos.meta) <= 0)
        errores.meta = 'El objetivo total debe ser mayor a 0.';
      else errores.meta = '';
    },
    completado: () => {
      if (!datos.completado?.trim())
        errores.completado = 'Completado no puede estar vacia.';
      else if (Number(datos.completado) < 0)
        errores.completado = 'El progreso no puede ser un número negativo.';
      else errores.completado = '';
    },
  };
  const relacionMetaCompletado = () => {
    const completadoNum = Number(datos.completado);
    const metaNum = Number(datos.meta);
    if (completadoNum > metaNum)
      errores.completado = `No podés haber completado (${completadoNum}) más de tu objetivo total (${metaNum}).`;
  };

  if (!campo) {
    Object.values(reglas).forEach((regla) => regla());

    if (!errores.meta && !errores.completado) relacionMetaCompletado();
  } else if (reglas[campo]) {
    reglas[campo]();
    if (
      (campo === 'meta' || campo === 'completado') &&
      !errores.meta &&
      !errores.completado
    )
      relacionMetaCompletado();
  }
  return {
    esValido: Object.values(errores).every((valor) => !valor),
    errores,
  };
}
/////////////////////////
export function validarCredenciales(datos, campo = null) {
  const errores = {};
  const reglas = {
    usuario: () => {
      if (!datos.usuario?.trim())
        errores.usuario =
          'Debe ingresar nombre de Usuario o bien correo, no puede estar vacía.';
      else errores.usuario = '';
    },
    password: () => {
      if (!datos.password?.trim())
        errores.password =
          'Debe ingresar Contraseña password, no puede estar vacía.';
      else errores.password = '';
    },
    password2: () => {
      if (!datos.password2?.trim())
        errores.password2 =
          'Debe ingresar Contraseña password, no puede estar vacía.';
      else errores.password2 = '';
    },
  };
  const igualdadPassword = () => {
    if (datos.password !== datos.password2)
      errores.password2 = 'Deben ser iguales las contraseñas';
  };

  if (!campo) {
    Object.values(reglas).forEach((regla) => regla());
    if (!errores.password && !errores.password2) igualdadPassword();
  } else if (reglas[campo]) {
    reglas[campo]();
    if (
      (campo === 'password' || campo === 'password2') &&
      !errores.password &&
      !errores.password2
    )
      igualdadPassword();
  }

  return {
    esValido: Object.values(errores).every((valor) => !valor),
    errores,
  };
}
