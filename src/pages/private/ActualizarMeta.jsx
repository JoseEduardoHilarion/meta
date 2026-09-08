import { useNavigate, useParams } from 'react-router';
import { useEffect } from 'react';

import { MetaForm } from '../../components/form/MetaForm.jsx';
import { Button } from '../../components/ui/Button.jsx';
import { Modal } from '../../components/ui/Modal.jsx';

import { useMetas, useMetasActions } from '../../servicios/meta/useMetas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';

export const ActualizarMeta = () => {
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
    actualizarMeta(datosModificados)
      .then(() => {
        notificar(
          'OK, se pudo modificar la meta: ' + datosModificados.detalles,
          'success',
        );
        navegar('/Lista');
      })
      .catch((error) => {
        console.log('ERROR: ' + error);
      });
  };

  const handleEliminar = () => {
    borrarMeta(id);
    notificar('Ok, se ELIMINO la meta', 'success');
    navegar('/Lista');
  };

  if (!meta) return null;
  return (
    <Modal alCerrar={() => navegar('/Lista')}>
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
            <Button onClick={() => navegar('/Lista')}>Cancelar</Button>
          </>
        }
      />
    </Modal>
  );
};

const mensajesError = {
  400: 'Los datos enviados no son válidos.',
  401: 'Debes iniciar sesión.',
  403: 'No tienes permiso.',
  404: 'No se encontró la meta.',
  500: 'Error interno del servidor.',
  desconocido: 'Ocurrió un error inesperado.',
};
const manejarError = (error) => {
  let mensaje = mensajesError[error.status];

  if (mensaje === undefined) mensaje = mensajesError['desconocido'];

  return mensaje;
};
