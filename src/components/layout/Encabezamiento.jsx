import { Item } from '../ui/Item';
import { Icono } from '../ui/Icono';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Spacer } from '../ui/Spacer';
import { useState } from 'react';
import { Drawer } from '../ui/Drawer';
import { Aside } from './Aside';

import './Encabezamiento.css';
import { Button } from '../ui/Button';

export const Encabezamiento = () => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarMenu = () => setMenuAbierto(false);
  const onMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <header className={'neumo-convex'}>
      <Item>
        <Button
          className="aside-menu"
          onClick={onMenu}
          aria-label="Abrir menú lateral"
        >
          ☰
        </Button>
        <Icono>
          <img src="/img/logo.svg" alt="logo" />
        </Icono>
        <h2>METAS APP</h2>
        <Spacer />
        <ThemeToggle />
      </Item>
      <Drawer isOpen={menuAbierto} onClose={cerrarMenu}>
        <Aside esMovil={true} cerrarMenu={cerrarMenu} />
      </Drawer>
    </header>
  );
};
