import { Routes, Route, Navigate } from 'react-router';
import { Outlet } from 'react-router';

import { Lista } from '../pages/private/Lista.jsx';
import { ActualizarMeta } from '../pages/private/ActualizarMeta.jsx';
import { CrearMeta } from '../pages/private/CrearMeta.jsx';
import { NoEncontrado } from '../pages/private/NoEncontrado.jsx';
import { Layout } from '../components/layout/Layout.jsx';
import { Login } from '../pages/public/Login.jsx';
import { Registro } from '../pages/public/Registro.jsx';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Login" />} />
      <Route element={<Layout />}>
        <Route path="*" element={<NoEncontrado />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Registro" element={<Registro />} />
      </Route>
      <Route element={<Layout privado />}>
        <Route path="/Lista" element={<Lista />}>
          <Route path=":id" element={<ActualizarMeta />} />
        </Route>
        <Route path="/Nueva" element={<CrearMeta />} />
      </Route>
    </Routes>
  );
}
