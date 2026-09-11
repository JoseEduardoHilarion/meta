import { useReducer, useEffect } from 'react';
import { MetasStateContext, MetasDispatchContext } from './metasContext.js';
import { bd } from '../../backend_basedatos/clases.js';
import { notificar } from '../sistemaNotificaciones.js';

function metasReducer(state, action) {
  switch (action.type) {
    case 'INICIALIZAR': {
      const metas = action.payload;
      const objetosBase = {};
      const idBase = []; // Usamos un array normal
      metas.forEach((meta) => {
        // 1. Acceso directo al objeto (O(1))
        objetosBase[meta.id] = meta;
        // 2. Push al final del array (O(1)) - Muy rápido
        idBase.push(meta.id);
      });
      return {
        // 3. Si quieres que el último agregado aparezca arriba:
        orden: idBase.reverse(),
        objetos: objetosBase,
      };
    }
    case 'CREAR': {
      const id = action.payload.id;
      const nuevaMeta = { ...action.payload };
      return {
        ...state,
        orden: [id, ...state.orden],
        objetos: { ...state.objetos, [id]: nuevaMeta },
      };
    }
    case 'BORRAR': {
      const id = action.payload;
      // 1. CREAMOS COPIA del diccionario (Inmutabilidad)
      const nuevosObjetos = { ...state.objetos };
      // 2. BORRAMOS de la copia (Seguro, no afecta al original todavía)
      delete nuevosObjetos[id];
      // 3. FILTRAMOS el array de orden (Crea un array nuevo automáticamente)
      const nuevoOrden = state.orden.filter((itemId) => itemId !== id);
      return {
        ...state,
        orden: nuevoOrden,
        objetos: nuevosObjetos, // Ahora sí, es una referencia nueva
      };
    }
    case 'ACTUALIZAR': {
      const id = action.payload.id;
      return {
        ...state, // 1. Copiamos el nivel superior (orden, etc.)
        objetos: {
          ...state.objetos, // 2. Copiamos el diccionario de objetos
          [id]: {
            ...action.payload, // 4. Pisamos con los nuevos datos
          },
        },
      };
    }
    default:
      return state;
  }
}

// Definimos el respaldo por si el LocalStorage está vacío (Primera vez del usuario)
const estadoInicial = {
  orden: [],
  objetos: {},
};
export const MetaMemoria = ({ children }) => {
  const [state, dispatch] = useReducer(metasReducer, estadoInicial);
  useEffect(() => {
    bd.listarMetas()
      .then((metas) =>
        dispatch({
          type: 'INICIALIZAR',
          payload: metas,
        }),
      )
      .catch((error) => {
        notificar('problemas con la INICIALIZACION : ' + error.message);
      });
  }, []);

  return (
    <MetasStateContext.Provider value={state}>
      <MetasDispatchContext.Provider value={dispatch}>
        {children}
      </MetasDispatchContext.Provider>
    </MetasStateContext.Provider>
  );
};
