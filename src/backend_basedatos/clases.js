const manejarError = (error) => {
  return !(error instanceof ErrorHttp)
    ? 'No se pudo conectar con el servidor.'
    : error.status in mensajesError
      ? mensajesError[error.status]
      : mensajesError.desconocido;
};
//  else if (!(error in SyntaxError)) error_tabla = 'DATOS_INVALIDOS';)

const URL_BASE = 'http://localhost:3000';
const END_POINT_METAS = 'goals';

class BaseDatos {
  #contrato;
  #usuarios;
  #sesiones;
  #metas;

  constructor() {
    this.#contrato = {
      urlBase: 'http://localhost:3000',
    };

    this.#usuarios = new Tabla('users', this.#contrato);
    this.#sesiones = new Tabla('sessions', this.#contrato);
    this.#metas = new Tabla('goals', this.#contrato);
  }
}
class Contrato {
  #urlBase;
  constructor(urlBase) {
    this.#urlBase = urlBase;
  }
  get urlBase() {
    return this.#urlBase;
  }
}
class Tabla {
  #endpoint;
  #contrato;

  constructor(endpoint, contrato) {
    this.#endpoint = endpoint;
    this.#contrato = contrato;
  }

  listar() {}
  obtener(id) {}
  crear(registro) {}
  modificar(registro) {}
  borrar(id) {}
}

const ERRORES_TABLA = {
  SERVIDOR: 'No se pudo comunicar con el servidor.',
  CONEXION: 'No hay conexión con el servidor.',
  DATOS_INVALIDOS: 'Los datos enviados no son válidos.',
  REGISTRO_NO_ENCONTRADO: 'El registro no existe.',
};

class ErrorHttp extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
function procesadorErrores(error) {
  let error_tabla = '';
  if (!(error instanceof ErrorHttp)) error_tabla = 'CONEXION';
  else {
    const codigo = Number(error.status);
    if (codigo === 404) error_tabla = 'REGISTRO_NO_ENCONTRADO';
    else if (codigo >= 400 && codigo <= 422) error_tabla = 'DATOS_INVALIDOS';
    else if (codigo >= 500 && codigo <= 504) error_tabla = 'SERVIDOR';
  }
  return error_tabla;
}

function fetchGenerico(url, metodo, registro = {}) {
  //GET y DELETE
  const opciones = {
    method: metodo,
  };
  if (Object.keys(registro).length > 0) {
    //si es POST o PUT
    opciones.headers = { 'Content-Type': 'application/json' };
    opciones.body = JSON.stringify(registro);
  }
  return fetch(url, opciones)
    .then((res) => {
      if (!res.ok) throw new ErrorHttp('Error : ', res.status);
      return res.json();
    })
    .then((data) => {
      return {
        exito: true,
        codigo_error: null,
        datos: data,
      };
    })
    .catch((err) => {
      return {
        exito: false,
        codigo_error: procesadorErrores(err),
        datos: null,
      };
    });
}
