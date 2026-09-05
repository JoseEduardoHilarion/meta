import { useReducer, createContext, useContext } from 'react';

const authContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, usuario: action.payload };
    case 'LOGOUT':
      return { ...state, usuario: '' };
    default:
      return state;
  }
};

const estadoInicial = {
  usuario: '',
};
export const AuthMemoria = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, estadoInicial);

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthActions = () => {
  const { dispatch } = useContext(authContext);
  if (!dispatch)
    throw new Error('useAuthActions debe usarse dentro de AuthProvider');

  const login = (usuario) => {
    dispatch({ type: 'LOGIN', payload: usuario });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return { login, logout };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const { state } = useContext(authContext);
  if (!state)
    throw new Error('useAuthActions debe usarse dentro de AuthProvider');

  return Boolean(state.usuario);
};
