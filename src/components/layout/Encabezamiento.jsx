import { Item } from '../ui/Item';
import { Icono } from '../ui/Icono';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Spacer } from '../ui/Spacer';
import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Aside } from './Aside';

import './Encabezamiento.css';
import { Button } from '../ui/Button';
import { useAuth, useAuthActions } from '../../servicios/auth/AuthMemoria';

export const Encabezamiento = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { logout } = useAuthActions();

  const cerrarMenu = () => setMenuAbierto(false);
  const onMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  const usuarioLogueado = useAuth();
  return (
    <header className={'neumo-gradient'}>
      <Item>
        <Button
          className="aside-menu dark"
          onClick={onMenu}
          aria-label="Abrir menú lateral"
        >
          ☰
        </Button>
        <Icono source={<img src="/img/logo.svg" alt="logo" />} />
        <h2>METAS APP</h2>
        <Spacer />
        <Icono
          clickable
          onClick={logout}
          source={<img src="/img/perfil.svg" alt="Perfil" />}
          cartel="Cerrar Sesion"
        >
          {usuarioLogueado && <h3>{usuarioLogueado.nombre}</h3>}
        </Icono>
        <ThemeToggle />
      </Item>
      <Drawer isOpen={menuAbierto} onClose={cerrarMenu}>
        <Aside esMovil={true} cerrarMenu={cerrarMenu} />
      </Drawer>
    </header>
  );
};
