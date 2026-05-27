import { useContext, useMemo } from 'react';
import {
  MetasStateContext,
  MetasDispatchContext,
} from '../../servicios/MetasContext.js';

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

  const metaPorId = (id) => {
    return getMetaById(estado, id);
  };
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
    const id = self.crypto.randomUUID();
    dispatch({
      type: 'CREAR',
      payload: { id, ...nuevaMeta },
    });
  };

  // Actualizar (Update)
  const actualizarMeta = (datosActualizados) => {
    dispatch({
      type: 'ACTUALIZAR',
      payload: { ...datosActualizados },
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
/////////////////////////////////////////////////////////////////////////
////////////////////////Validador Central////////////////////////////////
/**
 * Valida de forma centralizada las reglas de negocio de una Meta.
 * @param {Object} datos - Objeto con { detalles, target, completado }
 * @returns {Object} { esValido: boolean, errores: Object }
 */
export function validarMeta(datos) {
  const errores = {};
  
  const completadoNum = Number(datos.completado || 0);
  const targetNum = Number(datos.target || 0);

  // Regla 1: Validar el texto
  if (!datos.detalles || datos.detalles.trim() === '') {
    errores.detalles = 'La descripción de la meta no puede estar vacía.';
  }

  // Regla 2: Validar que el total sea lógico
  if (targetNum <= 0) {
    errores.target = 'El objetivo total debe ser mayor a 0.';
  }

  // Regla 3: LA RELACIÓN MUTUA (Tu Bug central)
  if (completadoNum > targetNum) {
    errores.completado = `No podés haber completado (${completadoNum}) más de tu objetivo total (${targetNum}).`;
  }

  if (completadoNum < 0) {
    errores.completado = 'El progreso no puede ser un número negativo.';
  }

  return {
    esValido: Object.keys(errores).length === 0, // Es válido si no hay ningún error en el objeto
    errores // Devolvemos el diccionario de errores por campo
  };
}
