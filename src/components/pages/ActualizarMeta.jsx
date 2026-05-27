import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import MetaForm from '../form/MetaForm';
import Button from '../ui/Button';
import Modal from '../ui/Modal.jsx';

import { useMetas, useMetasActions } from '../../components/hooks/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export default function ActualizarMeta() {
  const { id } = useParams();
  const navegar = useNavigate();

  const { actualizarMeta, borrarMeta } = useMetasActions();
  const { metaPorId } = useMetas();
  const meta = metaPorId(id);

  useEffect(() => {
    if (!meta) {
      navegar('/Lista', { replace: true });
    }
  }, [meta, navegar]);

  const handleActualizar = (datosModificados) => {
    actualizarMeta(datosModificados);
    notificar('OK, se pudo modificar la meta: ' + datosModificados.detalles, 'success');
    navegar('/Lista');
  };

  const handleEliminar = () => {
    borrarMeta(id);
    notificar("Ok, se ELIMINO la meta", 'success');
    navegar('/Lista');
  };

  if (!meta) return null;
  return (
    <Modal alCerrar={() => navegar('/Lista')}>
      <MetaForm
        initialValues={meta}
        onSubmit={handleActualizar}
        mostrarCompletado
      >
        <Button className="fuerza-oscuro m-3" type="submit">
          Guardar Cambios
        </Button>
        <Button className="m-3" onClick={handleEliminar}>
          Eliminar
        </Button>
        <Button className="m-3" onClick={() => navegar('/Lista')}>
          Cancelar
        </Button>
      </MetaForm>
    </Modal>
  );
}
