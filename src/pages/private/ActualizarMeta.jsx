import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import { MetaForm } from '../../components/form/MetaForm.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Modal } from '../../components/ui/Modal.jsx';

import { useMetas, useMetasActions } from '../../servicios/meta/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';
import { ERRORES_BD, SIN_ERROR } from '../../backend_basedatos/constantes.js';

export const ActualizarMeta = () => {
  const { id } = useParams();
  const navegar = useNavigate();

  const { actualizarMeta, borrarMeta } = useMetasActions();
  const { metaPorId } = useMetas();
  const meta = metaPorId(id);

  useEffect(() => {
    if (!meta) {
      navegar('/lista', { replace: true });
    }
  }, [meta, navegar]);

  const handleActualizar = (datosModificados) => {
    actualizarMeta(datosModificados).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR) {
        notificar(
          'OK, se pudo modificar la meta: ' + datosModificados.detalles,
          'success',
        );
        navegar('/lista');
      } else notificar(ERRORES_BD[resultado.codigo_error], 'error');
    });
  };

  const handleEliminar = () => {
    borrarMeta(id).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR) {
        notificar('Ok, se ELIMINO la meta', 'success');
        navegar('/lista');
      } else notificar(ERRORES_BD[resultado.codigo_error], 'error');
    });
  };

  if (!meta) return null;
  return (
    <Modal alCerrar={() => navegar('/lista')}>
      <MetaForm
        initialValues={meta}
        onSubmit={handleActualizar}
        mostrarCompletado
        header={<h2 className="p-2">MODIFICAR META</h2>}
        footer={
          <>
            <Button className="dark" type="submit">
              Guardar Cambios
            </Button>
            <Button onClick={handleEliminar}>Eliminar</Button>
            <Button onClick={() => navegar('/lista')}>Cancelar</Button>
          </>
        }
      />
    </Modal>
  );
};
