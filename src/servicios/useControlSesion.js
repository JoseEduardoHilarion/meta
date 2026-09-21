import { useAuthActions } from './auth/AuthMemoria';

export const useControlSesion = (funcion) => {
  const { logout } = useAuthActions();
  return (...parametros) => {
    return funcion(...parametros).then((resultado) => {
      if (
        resultado.codigo_error === 'TOKEN_VENCIDO' ||
        resultado.codigo_error === 'TOKEN_INVALIDO'
      ) {
        logout();
        return { ...resultado, codigo_error: 'SESION_INVALIDA' };
      }
      return resultado;
    });
  };
};
