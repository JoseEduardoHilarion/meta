import { useReducer, createContext, useContext } from 'react';
import { bd } from '../../backend_basedatos/clases.js';
import { SIN_ERROR } from '../../backend_basedatos/constantes.js';

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
  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthActions = () => {
  const dispatch = useContext(AuthDispatchContext);
  const usuarioLogueado = useAuth();

  if (!dispatch)
    throw new Error('useAuthActions debe usarse dentro de AuthProvider');

  const Login = (usuario) => {
    return bd.generarToken(usuario).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR)
        dispatch({ type: 'LOGIN', payload: resultado.datos });
      return resultado;
    });
  };
  const Logout = () => {
    if (usuarioLogueado) {
      return bd.anularToken(usuarioLogueado.token).then((resultado) => {
        if (resultado.codigo_error === SIN_ERROR) dispatch({ type: 'LOGOUT' });
        return resultado;
      });
    }
  };
  const Registrar = (usuario) => {
    return bd.registrarUsuario(usuario);
  };

  return { Login, Logout, Registrar };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const state = useContext(AuthStateContext);
  if (!state)
    throw new Error('AuthStateContext debe usarse dentro de AuthProvider');
  return state.usuario;
};
