import { Navigate, Outlet } from 'react-router';
import { useAuth } from './AuthMemoria.jsx';

export const Autenticar = () => {
  const usuarioAutenticado = useAuth();

  return usuarioAutenticado ? <Outlet /> : <Navigate to="/login" replace />;
};
