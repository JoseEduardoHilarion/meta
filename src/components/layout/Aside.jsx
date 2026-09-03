import { useNavigate, useLocation } from 'react-router';
import { Item } from '../ui/Item';
import { Icono } from '../ui/Icono';
import { cn } from '../../utils';

export const Aside = ({ esMovil, cerrarMenu }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Obtenemos la ruta actual del navegador

  // Verificamos si la ruta actual coincide exactamente
  const esActivo = (ruta) => (location.pathname === ruta ? 'item-activo' : '');

  const handleLinkClick = (ruta) => {
    if (esMovil && cerrarMenu) cerrarMenu();
    navigate(ruta);
  };
  return (
    <div>
      <Item
        clickable
        className={cn('fw-bold', esActivo('/lista'))}
        onClick={() => handleLinkClick('/lista')}
      >
        <Icono>
          <img src="/img/lista.svg" alt="Lista de Metas" />
        </Icono>
        <h3 className="p-2">Lista de Metas</h3>
      </Item>

      <Item
        clickable
        className={cn('fw-bold', esActivo('/nueva'))}
        onClick={() => handleLinkClick('/nueva')}
      >
        <Icono>
          <img src="/img/nueva.svg" alt="Nueva Meta" />
        </Icono>
        <h3 className="p-2">Nueva Meta</h3>
      </Item>
    </div>
  );
};
