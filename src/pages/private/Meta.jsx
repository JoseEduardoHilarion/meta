import { Button } from "../../components/ui/Button.jsx";
import { Item } from "../../components/ui/Item.jsx";
import { Spacer } from "../../components/ui/Spacer.jsx";
import { ProgressBar } from "../../components/ui/ProgressBar.jsx";
import { Icono } from "../../components/ui/Icono.jsx";

import { useMetasActions } from "../../components/hooks/useMetas.js";
import { notificar } from "../../servicios/sistemaNotificaciones.js";

export const Meta = ({
  id,
  icono,
  eventos,
  periodo,
  detalles,
  meta,
  completado,
  onClick,
}) => {
  const { actualizarMeta } = useMetasActions();

  const handleBotonCompletado = (e) => {
    e.stopPropagation(); // Frenamos la propagación
    const completadoMas = completado + 1;
    if (completadoMas > meta)
      notificar("Esta meta: " + detalles + " ya esta COMPLETA", "success");
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
      clickable
      variant="convex"
      onClick={onClick}
      className="m-2 rounded-sm"
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
};
