import { useAuthActions } from '/src/servicios/auth/AuthMemoria.jsx';

export const useControlar = (
  funcion = (parametros) => {
    return funcion(parametros).then((resultado) => {
      if (resultado.codigo_error === 'TOKEN_VENCIDO') Logout();
      return resultado;
    });
  },
) => {
  const { Logout } = useAuthActions();
};

export const funcion = (parametros) => {
  return funcion(parametros).then((resultado) => {
    if (resultado.codigo_error === 'TOKEN_VENCIDO') Logout();
    return resultado;
  });
};
