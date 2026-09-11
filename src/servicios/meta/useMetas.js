import { useContext, useMemo, useCallback } from 'react';
import { MetasStateContext, MetasDispatchContext } from './metasContext.js';
import { bd } from '../../backend_basedatos/clases.js';

// Transforma el diccionario y el orden en un array simple para el .map()
const getAllMetas = (estado) => estado.orden.map((id) => estado.objetos[id]);
// Busca una meta específica por su ID
const getMetaById = (estado, id) => estado.objetos[id];
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export function useMetas() {
  const estado = useContext(MetasStateContext);
  if (!estado) throw new Error('useMetas debe usarse dentro de MetasProvider');

  // Leer por metas o por id.
  const metas = useMemo(() => getAllMetas(estado), [estado]);
  const metaPorId = useCallback((id) => getMetaById(estado, id), [estado]);

  // Retornamos una API limpia para los componentes
  return {
    metas, // Un array limpio para hacer el .map() en la UI
    metaPorId,
  };
}
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
export function useMetasActions() {
  const dispatch = useContext(MetasDispatchContext);
  if (!dispatch)
    throw new Error('useMetasActions debe usarse dentro de MetasProvider');
  const crearMeta = (nuevaMeta) => {
    return bd.crearMeta(nuevaMeta).then((metaAgregada) =>
      dispatch({
        type: 'CREAR',
        payload: metaAgregada,
      }),
    );
  };
  const actualizarMeta = (datosActualizados) => {
    return bd.actualizarMeta(datosActualizados).then((metaActualizada) =>
      dispatch({
        type: 'ACTUALIZAR',
        payload: metaActualizada,
      }),
    );
  };
  const borrarMeta = (id) => {
    return bd.borrarMeta(id).then(() => {
      dispatch({
        type: 'BORRAR',
        payload: id,
      });
    });
  };
  // Retornamos una API limpia para los componentes
  return {
    crearMeta,
    actualizarMeta,
    borrarMeta,
  };
}
