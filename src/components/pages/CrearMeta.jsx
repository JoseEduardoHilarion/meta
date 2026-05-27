import { useNavigate } from 'react-router';

import MetaForm from '../form/MetaForm';
import { metaVacia } from '../../data/mocks.js';
import Button from '../ui/Button';

import { useMetasActions } from '../../components/hooks/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';


/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export default function CrearMeta() {
  const { crearMeta } = useMetasActions();
  const navegar = useNavigate();

  const handleCrear = (datosFormulario) => {
    crearMeta(datosFormulario);
    notificar('OK, se AGREGO con exito la meta> '+ datosFormulario.detalles, 'success');
    navegar('/Lista');
  };
  return (
    <MetaForm initialValues={metaVacia} onSubmit={handleCrear}>
      <Button className="fuerza-oscuro m-3" type="submit">
        Crear
      </Button>
      <Button className="m-3" onClick={() => navegar('/Lista')}>
        Cancelar
      </Button>
    </MetaForm>
  );
}
