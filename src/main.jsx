import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';

import './index.css';

import App from './App.jsx';
import Lista from './components/pages/Lista.jsx';
import NoEncontrado from './components/pages/NoEncontrado.jsx';
import Memoria from './servicios/Memoria.jsx';
import ActualizarMeta from './components/pages/ActualizarMeta';
import CrearMeta from './components/pages/CrearMeta';
import { Toaster } from './components/ui/Toaster.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Memoria>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Lista />} />
            <Route path="/Lista" element={<Lista />}>
              <Route path="/Lista/:id" element={<ActualizarMeta />} />
            </Route>
            <Route path="/Nueva" element={<CrearMeta />} />
          </Route>
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </BrowserRouter>
    </Memoria>
  </StrictMode>,
);
