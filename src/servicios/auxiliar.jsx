import { useReducer, useEffect } from 'react';
import { MetasStateContext, MetasDispatchContext } from './MetasContext.js';
import { adaptarMetaParaFormulario } from '../adapters/metaAdapter.js'; // Importas tu adaptador

// 2. ENVOLTORIO PROTECTOR: Sanitiza automáticamente cualquier payload antes de tocar el reducer
export function metasReducer(state, action) {
  // Si la acción trae un objeto meta (CREAR o ACTUALIZAR), lo adaptamos AQUÍ de un solo tiro
  if (action.type === 'CREAR' || action.type === 'ACTUALIZAR') {
    action = {
      ...action,
      payload: adaptarMetaParaFormulario(action.payload),
    };
  }

  // Se ejecuta el reducer con los datos 100% limpios
  return metasReducerBase(state, action);
}

function metasReducer(state, action) {
  switch (action.type) {
    case 'INICIALIZAR': {
      const metas = action.payload; // Array de metas sin normalizar
      const objetosBase = {};
      const idBase = [];

      metas.forEach((meta) => {
        // 🛡️ Normalizamos CADA meta antes de ingresarla al estado
        const metaAdaptada = adaptarMetaParaFormulario(meta);
        const id = metaAdaptada.id;

        objetosBase[id] = metaAdaptada;
        idBase.push(id);
      });

      return {
        orden: idBase.reverse(),
        objetos: objetosBase,
      };
    }

    case 'CREAR': {
      // 🛡️ Normalizamos la nueva meta antes de guardarla
      const metaAdaptada = adaptarMetaParaFormulario(action.payload);
      const id = metaAdaptada.id;

      return {
        ...state,
        orden: [id, ...state.orden],
        objetos: { ...state.objetos, [id]: metaAdaptada },
      };
    }

    case 'ACTUALIZAR': {
      // 🛡️ Normalizamos la meta editada
      const metaAdaptada = adaptarMetaParaFormulario(action.payload);
      const id = metaAdaptada.id;

      return {
        ...state,
        objetos: {
          ...state.objetos,
          [id]: metaAdaptada,
        },
      };
    }

    case 'BORRAR': {
      const id = String(action.payload);
      const nuevosObjetos = { ...state.objetos };
      delete nuevosObjetos[id];
      const nuevoOrden = state.orden.filter((itemId) => itemId !== id);

      return {
        ...state,
        orden: nuevoOrden,
        objetos: nuevosObjetos,
      };
    }

    default:
      return state;
  }
}

// Función inicializadora perezosa (Lazy Initialization)
const obtenerEstadoInicial = () => {
  const memoriaLocal = localStorage.getItem('metas_app');
  if (!memoriaLocal) return { orden: [], objetos: {} };

  try {
    const estadoGuardado = JSON.parse(memoriaLocal);
    const objetosAdaptados = {};

    // Sanitizamos todos los objetos leídos de memoria por si vienen corruptos/viejos
    Object.keys(estadoGuardado.objetos || {}).forEach((id) => {
      objetosAdaptados[id] = adaptarMetaParaFormulario(
        estadoGuardado.objetos[id],
      );
    });

    return {
      orden: estadoGuardado.orden || [],
      objetos: objetosAdaptados,
    };
  } catch (error) {
    console.error('Error leyendo LocalStorage:', error);
    return { orden: [], objetos: {} };
  }
};

export const Memoria = ({ children }) => {
  // El 3er argumento 'obtenerEstadoInicial' solo se ejecuta 1 sola vez cuando se monta el componente
  const [state, dispatch] = useReducer(
    metasReducer,
    null,
    obtenerEstadoInicial,
  );

  useEffect(() => {
    localStorage.setItem('metas_app', JSON.stringify(state));
  }, [state]);

  return (
    <MetasStateContext.Provider value={state}>
      <MetasDispatchContext.Provider value={dispatch}>
        {children}
      </MetasDispatchContext.Provider>
    </MetasStateContext.Provider>
  );
};
