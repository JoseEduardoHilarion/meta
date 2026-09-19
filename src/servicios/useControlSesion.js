import { useAuthActions } from '/src/servicios/auth/AuthMemoria.jsx';

export const useControlSesion = (funcion) => {
  const { Logout } = useAuthActions();
  return (...parametros) => {
    return funcion(...parametros).then((resultado) => {
      console.log(resultado);
      if (
        resultado.codigo_error === 'TOKEN_VENCIDO' ||
        resultado.codigo_error === 'TOKEN_INVALIDO'
      ) {
        Logout();
        resultado.codigo_error = 'SESION_INVALIDA';
      }
      return resultado;
    });
  };
};
