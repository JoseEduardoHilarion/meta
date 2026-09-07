import { useReducer, useEffect } from 'react';
import { MetasStateContext, MetasDispatchContext } from './metasContext.js';

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
      const nuevaMetaConId = { ...action.payload, id }; // Inyectamos el ID en el objeto

      return {
        ...state,
        orden: [id, ...state.orden],
        objetos: { ...state.objetos, [id]: nuevaMetaConId },
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
const respaldoVacio = {
  orden: [],
  objetos: {},
};
// Intentamos leer lo que haya guardado en el navegador
const memoriaLocal = localStorage.getItem('metas_app');
// Si hay algo, lo transformamos de texto a objeto. Si no, usamos el vacío.
const estadoInicial = memoriaLocal ? JSON.parse(memoriaLocal) : respaldoVacio;

const URL_BASE = 'http://localhost:3000';
const endpointMetas = 'goals';
const obtenerMetas = () =>
  fetch(`${URL_BASE}/${endpointMetas}`).then((res) => res.json());

export const MetaMemoria = ({ children }) => {
  const [state, dispatch] = useReducer(metasReducer, estadoInicial);
  // Cada vez que 'state' cambie, este efecto guarda la lista ordenada completa
  useEffect(() => {
    //localStorage.setItem('metas_app', JSON.stringify(state));
    obtenerMetas().then((metas) =>
      dispatch({
        type: 'INICIALIZAR',
        payload: metas,
      }),
    );
  }, []);

  return (
    <MetasStateContext.Provider value={state}>
      <MetasDispatchContext.Provider value={dispatch}>
        {children}
      </MetasDispatchContext.Provider>
    </MetasStateContext.Provider>
  );
};
