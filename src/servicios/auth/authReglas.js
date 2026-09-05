/////////////////////////
export function authReglas(datos, campo = null) {
  const errores = {};
  const reglas = {
    usuario: () => {
      if (!datos.usuario?.trim())
        errores.usuario = 'Debe ingresar nombre de Usuario o bien correo';
      else errores.usuario = '';
    },
    password: () => {
      if (!datos.password?.trim())
        errores.password = 'Debe ingresar Contraseña password';
      else errores.password = '';
    },
    password2: () => {
      if (!datos.password2?.trim())
        errores.password2 = 'Debe ingresar Contraseña password';
      else errores.password2 = '';
    },
  };
  const igualdadPassword = () => {
    if (datos.password !== datos.password2)
      errores.password2 = 'Las contraseñas deben ser iguales ';
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
