import { useNavigate } from 'react-router';

import { MetaForm } from '../../components/form/MetaForm.jsx';
import { metaVacia } from '../../data/mocks.js';
import { Button } from '../../components/ui/Button.jsx';
import { useMetasActions } from '../../servicios/meta/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';

export const CrearMeta = () => {
  const { crearMeta } = useMetasActions();
  const navegar = useNavigate();
  const handleCrear = (datosFormulario) => {
    crearMeta(datosFormulario)
      .then(() => {
        notificar(
          'OK, se AGREGO con exito la meta> ' + datosFormulario.detalles,
          'success',
        );
        navegar('/Lista');
      })
      .catch((error) => {
        notificar('NO se pudo AGREGAR por el siguiente error: ' + error);
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
          <Button onClick={() => navegar('/Lista')}>Cancelar</Button>
        </>
      }
    />
  );
};
