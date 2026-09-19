import { useNavigate } from 'react-router';

import { MetaForm } from '../../components/form/MetaForm.jsx';
import { metaVacia } from '../../data/mocks.js';
import { Button } from '../../components/ui/Button.jsx';
import { useMetasActions } from '../../servicios/meta/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';
import {
  ERRORES_APLICACION,
  SIN_ERROR,
} from '../../backend_basedatos/constantes.js';

export const CrearMeta = () => {
  const { crearMeta } = useMetasActions();
  const navegar = useNavigate();
  const handleCrear = (datosFormulario) => {
    crearMeta(datosFormulario).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR) {
        notificar(
          'OK, se AGREGO con exito la meta> ' + datosFormulario.detalles,
          'success',
        );
        navegar('/Lista');
      } else notificar(ERRORES_APLICACION[resultado.codigo_error], 'error');
    });
  };
  return (
    <MetaForm
      header={<h2 className="p-2">NUEVA META</h2>}
      initialValues={metaVacia}
      onSubmit={handleCrear}
      footer={
        <>
          <Button className="dark" type="submit">
            Crear
          </Button>
          <Button onClick={() => navegar('/lista')}>Cancelar</Button>
        </>
      }
    />
  );
};
