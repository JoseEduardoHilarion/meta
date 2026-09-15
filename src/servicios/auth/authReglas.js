/////////////////////////
export function authReglas(datos, campo = null) {
  const errores = {};
  const reglas = {
    email: () => {
      if (!datos.email?.trim()) errores.email = 'Debe ingresar el correo';
      else errores.email = '';
    },
    password: () => {
      if (!datos.password?.trim())
        errores.password = 'Debe ingresar Contraseña password';
      else errores.password = '';
    },
    password2: () => {
      if (password2 in datos) {
        if (!datos.password2?.trim())
          errores.password2 = 'Debe ingresar Contraseña password';
        else errores.password2 = '';
      }
    },
  };
  const igualdadPassword = () => {
    if ('password2' in datos && datos.password !== datos.password2)
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
