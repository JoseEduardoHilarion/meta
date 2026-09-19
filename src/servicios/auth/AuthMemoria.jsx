import { useReducer, createContext, useContext } from 'react';
import { bd } from '../../backend_basedatos/clases.js';
import { SIN_ERROR } from '../../backend_basedatos/constantes.js';
import { useRef, useEffect, useCallback } from 'react';

const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, usuario: action.payload };
    case 'LOGOUT':
      return { ...state, usuario: null };
    default:
      return state;
  }
};

const estadoInicial = {
  usuario: null,
};
export const AuthMemoria = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, estadoInicial);
  const temporizador = useRef(null);

  const logoutInterno = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
    bd.anularToken(state.usuario.token.valor);
  }, [state.usuario]);

  useEffect(() => {
    if (temporizador.current) clearTimeout(temporizador.current);
    if (state.usuario) {
      const tiempoRestante = state.usuario.token.expira - Date.now();
      temporizador.current = setTimeout(() => {
        logoutInterno();
      }, tiempoRestante);
    }
    return () => clearTimeout(temporizador.current);
  }, [state.usuario, logoutInterno]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={{ dispatch, logoutInterno }}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthActions = () => {
  const { dispatch, logoutInterno } = useContext(AuthDispatchContext);
  const usuarioLogueado = useAuth();

  if (!dispatch)
    throw new Error('useAuthActions debe usarse dentro de AuthProvider');

  const login = (usuario) => {
    return bd.generarToken(usuario).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR)
        dispatch({ type: 'LOGIN', payload: resultado.datos });
      return resultado;
    });
  };
  const logout = () => {
    if (usuarioLogueado) {
      logoutInterno();
    }
  };

  const registrar = (usuario) => {
    return bd.registrarUsuario(usuario);
  };

  return { login, logout, registrar };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const state = useContext(AuthStateContext);
  if (!state)
    throw new Error('AuthStateContext debe usarse dentro de AuthProvider');
  return state.usuario;
};
