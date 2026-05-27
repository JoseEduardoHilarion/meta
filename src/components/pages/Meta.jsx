import Button from '../ui/Button';
import Item from '../ui/Item';
import Spacer from '../ui/Spacer';
import ProgressBar from '../ui/ProgressBar';
import Icono from '../ui/Icono';

export default function Meta({
  icono,
  eventos,
  periodo,
  detalles,
  meta,
  completado,
  onClick,
}) {
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
      <Button>Completado</Button>
    </Item>
  );
}
