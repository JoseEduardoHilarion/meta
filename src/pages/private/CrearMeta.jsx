import { useNavigate } from 'react-router';

import { MetaForm } from '../../components/form/MetaForm.jsx';
import { metaVacia } from '../../data/mocks.js';
import { Button } from '../../components/ui/Button.jsx';

import { useMetasActions } from '../../components/hooks/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';

export const CrearMeta = () => {
  const { crearMeta } = useMetasActions();
  const navegar = useNavigate();

  const handleCrear = (datosFormulario) => {
    crearMeta(datosFormulario);
    notificar(
      'OK, se AGREGO con exito la meta> ' + datosFormulario.detalles,
      'success',
    );
    navegar('/Lista');
  };
  return (
    <MetaForm
      initialValues={metaVacia}
      onSubmit={handleCrear}
      footer={
        <>
          <Button className="fuerza-oscuro m-3" type="submit">
            Crear
          </Button>
          <Button className="m-3" onClick={() => navegar('/Lista')}>
            Cancelar
          </Button>
        </>
      }
    />
  );
};
