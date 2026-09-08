import { useContext, useMemo, useCallback } from 'react';
import { MetasStateContext, MetasDispatchContext } from './metasContext.js';
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
const URL_BASE = 'http://localhost:3000';
const endpointMetas = 'goals';
export function useMetasActions() {
  const dispatch = useContext(MetasDispatchContext);
  if (!dispatch)
    throw new Error('useMetasActions debe usarse dentro de MetasProvider');

  // Crear (Create)
  const crearMeta = (nuevaMeta) => {
    //const id = Date.now().toString(36) + Math.random().toString(36).slice(2);
    const nuevaMetaS = adaptarMetaParaFormulario(nuevaMeta);
    fetch(`${URL_BASE}/${endpointMetas}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaMetaS),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(`Error HTTP: ${res.status}`);
      })
      .then((metaAgregada) =>
        dispatch({
          type: 'CREAR',
          payload: metaAgregada,
        }),
      )
      .catch((error) => {
        console.log('ERROR: ' + error);
      });
  };

  // Actualizar (Update)
  const actualizarMeta = (datosActualizados) => {
    const nuevaMetaS = adaptarMetaParaFormulario(datosActualizados);
    const id = datosActualizados.id;

    return fetch(`${URL_BASE}/${endpointMetas}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevaMetaS),
    })
      .then((res) => {
        if (res.ok) return res.json();
        else throw new Error(`Error HTTP: ${res.status}`);
      })
      .then((metaActualizada) =>
        dispatch({
          type: 'ACTUALIZAR',
          payload: metaActualizada,
        }),
      );
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
