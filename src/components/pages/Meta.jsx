import Button from '../ui/Button';
import Item from '../ui/Item';
import Spacer from '../ui/Spacer';
import ProgressBar from '../ui/ProgressBar';
import Icono from '../ui/Icono';

import { useMetasActions } from '../../components/hooks/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';

export default function Meta({
  id,
  icono,
  eventos,
  periodo,
  detalles,
  meta,
  completado,
  onClick,
}) {
  const { actualizarMeta } = useMetasActions();
  const handleBotonCompletado = (e) => {
    e.stopPropagation();
    const completadoMas = completado + 1;
    if (completadoMas > meta)
      notificar('Esta meta: ' + detalles + ' ya esta COMPLETA', 'success');
    else
      actualizarMeta({
        id,
        icono,
        eventos,
        periodo,
        detalles,
        meta,
        completado: completadoMas,
      });
  };

  return (
    <Item
      interactive
      variant="flat"
      className="m-1 p-1 rounded-md"
      onClick={onClick}
    >
      <Icono variant="inset" className="circulo">
        {icono}
      </Icono>
      <div>
        <p className="txt-xl m-2">
          {eventos}
          <sub className="txt-xs txt-gray">/ {periodo}</sub>
        </p>
      </div>
      <p>{detalles}</p>
      <Spacer />
      <ProgressBar completadas={completado} total={meta} />
      <Button onClick={handleBotonCompletado}>Completado</Button>
    </Item>
  );
}
