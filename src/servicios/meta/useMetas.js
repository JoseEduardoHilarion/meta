import { useContext, useMemo, useCallback } from 'react';
import { MetasStateContext, MetasDispatchContext } from './metasContext.js';
import { bd } from '../../backend_basedatos/clases.js';
import { SIN_ERROR } from '../../backend_basedatos/constantes.js';
import { useAuth } from '../auth/AuthMemoria.jsx';

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
  const usuarioLogueado = useAuth();

  if (!dispatch)
    throw new Error('useMetasActions debe usarse dentro de MetasProvider');
  const inicializarMetas = (token) => {
    return bd.listarMetas(token).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR)
        dispatch({
          type: 'INICIALIZAR',
          payload: resultado.datos,
        });
      return resultado;
    });
  };
  const crearMeta = (nuevaMeta) => {
    return bd
      .crearMeta(nuevaMeta, usuarioLogueado.token.valor)
      .then((resultado) => {
        if (resultado.codigo_error === SIN_ERROR)
          dispatch({
            type: 'CREAR',
            payload: resultado.datos,
          });
        return resultado;
      });
  };
  const actualizarMeta = (datosActualizados) => {
    return bd
      .actualizarMeta(datosActualizados, usuarioLogueado.token.valor)
      .then((resultado) => {
        if (resultado.codigo_error === SIN_ERROR)
          dispatch({
            type: 'ACTUALIZAR',
            payload: resultado.datos,
          });
        return resultado;
      });
  };
  const borrarMeta = (id) => {
    return bd.borrarMeta(id, usuarioLogueado.token.valor).then((resultado) => {
      if (resultado.codigo_error === SIN_ERROR)
        dispatch({
          type: 'BORRAR',
          payload: id,
        });
      return resultado;
    });
  };
  // Retornamos una API limpia para los componentes
  return {
    crearMeta,
    actualizarMeta,
    borrarMeta,
    inicializarMetas,
  };
}
