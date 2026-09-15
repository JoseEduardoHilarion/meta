import { Navigate, Outlet } from 'react-router';
import { useAuth } from './AuthMemoria.jsx';

export const Autenticar = () => {
  return useAuth() ? <Outlet /> : <Navigate to="/login" replace />;
};
