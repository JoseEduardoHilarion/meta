import { useReducer, createContext, useContext } from 'react';
import { bd } from '../../backend_basedatos/clases.js';

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
  const { dispatch } = useContext(AuthDispatchContext);
  if (!dispatch)
    throw new Error('useAuthActions debe usarse dentro de AuthProvider');
  const login = (usuario) => {
    dispatch({ type: 'LOGIN', payload: usuario });
  };
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  const registrar = (usuario) => {
    return bd.registrarUsuario(usuario);
  };
  return { login, logout, registrar };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const { state } = useContext(AuthStateContext);
  if (!state)
    throw new Error('useAuthActions debe usarse dentro de AuthProvider');
  return state.usuario;
};
