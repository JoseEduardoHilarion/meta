import { Navigate } from 'react-router';
import { useAuth } from './AuthMemoria';

export const Autenticar = () => {
  const estaAutenticado = useAuth();

  return estaAutenticado ? <Outlet /> : <Navigate to="/login" replace />;
};
