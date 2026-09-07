import { Routes, Route, Navigate } from 'react-router';
import { Outlet } from 'react-router';

import { Lista } from '../pages/private/Lista.jsx';
import { ActualizarMeta } from '../pages/private/ActualizarMeta.jsx';
import { CrearMeta } from '../pages/private/CrearMeta.jsx';
import { NoEncontrado } from '../pages/private/NoEncontrado.jsx';
import { Layout } from '../components/layout/Layout.jsx';
import { Login } from '../pages/public/Login.jsx';
import { Registro } from '../pages/public/Registro.jsx';
import { Autenticar } from '../servicios/auth/Autenticar.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
      <Route element={<Layout privado />}>
        <Route path="/" element={<Navigate to="/lista" />} />
        <Route path="/lista" element={<Lista />}>
          <Route path=":id" element={<ActualizarMeta />} />
        </Route>
        <Route path="/nueva" element={<CrearMeta />} />
      </Route>
    </Routes>
  );
}
