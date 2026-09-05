import { useContext, useMemo } from 'react';
import { MetasStateContext, MetasDispatchContext } from './MetasContext.js';
import { useCallback } from 'react';
import { adaptarMetaParaFormulario } from './metaReglas.js';

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

  // Crear (Create)
  const crearMeta = (nuevaMeta) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const nuevaMetaS = adaptarMetaParaFormulario({ id, ...nuevaMeta });

    dispatch({
      type: 'CREAR',
      payload: { id, ...nuevaMetaS },
    });
  };

  // Actualizar (Update)
  const actualizarMeta = (datosActualizados) => {
    const nuevaMetaS = adaptarMetaParaFormulario({ ...datosActualizados });

    dispatch({
      type: 'ACTUALIZAR',
      payload: nuevaMetaS,
    });
  };

  // Borrar (Delete)
  const borrarMeta = (id) => {
    dispatch({
      type: 'BORRAR',
      payload: id,
    });
  };

  // Retornamos una API limpia para los componentes
  return {
    crearMeta,
    actualizarMeta,
    borrarMeta,
  };
}
