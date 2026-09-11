//  else if (!(error in SyntaxError)) error_tabla = 'DATOS_INVALIDOS';)

const URL_BASE = 'http://localhost:3000';

class Tabla {
  #endpoint;
  #bd;
  constructor(endpoint, bd) {
    this.#endpoint = endpoint;
    this.#bd = bd;
  }

  listar() {
    const fetchUrl = this.#bd.urlBase + '/' + this.#endpoint;
    return fetchGenerico(fetchUrl, 'GET');
  }
  obtener(id) {
    const fetchUrl = this.#bd.urlBase + '/' + this.#endpoint + '/' + id;
    return fetchGenerico(fetchUrl, 'GET');
  }
  crear(registro) {
    const fetchUrl = this.#bd.urlBase + '/' + this.#endpoint;
    return fetchGenerico(fetchUrl, 'POST', registro);
  }
  modificar(registro) {
    const id = registro.id;
    const fetchUrl = this.#bd.urlBase + '/' + this.#endpoint + '/' + id;
    return fetchGenerico(fetchUrl, 'PUT', registro);
  }
  borrar(id) {
    const fetchUrl = this.#bd.urlBase + '/' + this.#endpoint + '/' + id;
    return fetchGenerico(fetchUrl, 'DELETE');
  }
}

class BaseDatos {
  #urlBase;
  #usuarios;
  #sesiones;
  #metas;
  constructor(urlBase) {
    this.#urlBase = urlBase;
    this.#usuarios = new Tabla('users', this);
    this.#sesiones = new Tabla('sessions', this);
    this.#metas = new Tabla('goals', this);
  }
  get urlBase() {
    return this.#urlBase;
  }
  cambiarUrlBase(url) {
    this.#urlBase = url;
  }
  ///api publica
  listarMetas() {
    return this.#metas.listar().then((resultado) => {
      if (resultado.exito)
        return resultado.datos.map((meta) => adaptarMetaParaFormulario(meta));
      else throw new Error(ERRORES_BD[resultado.codigo_error]);
    });
  }
  crearMeta(datos) {
    const meta = adaptarMetaParaBackend(datos);
    delete meta.id;
    return this.#metas.crear(meta).then((resultado) => {
      if (resultado.exito) return adaptarMetaParaFormulario(resultado.datos);
      else throw new Error(ERRORES_BD[resultado.codigo_error]);
    });
  }
  actualizarMeta(datos) {
    return this.#metas
      .modificar(adaptarMetaParaBackend(datos))
      .then((resultado) => {
        if (resultado.exito) return adaptarMetaParaFormulario(resultado.datos);
        else throw new Error(ERRORES_BD[resultado.codigo_error]);
      });
  }
  borrarMeta(id) {
    return this.#metas.borrar(id).then((resultado) => {
      if (!resultado.exito) throw new Error(ERRORES_BD[resultado.codigo_error]);
    });
  }
  ///API PUBLICA
  registrarUsuario(reg) {
    const registro = adaptarUsuarioParaBackend(reg);
    return this.#usuarios.listar().then((resultado) => {
      if (resultado.exito) {
        const existeDni = resultado.datos.some(
          (usuario) => usuario.dni === registro.dni,
        );
        const existeEmail = resultado.datos.some(
          (usuario) => usuario.email === registro.email,
        );
        if (existeDni || existeEmail)
          return {
            ...resultado,
            codigo_error: 'DNI_EMAIL',
            datos: {
              existeDni,
              existeEmail,
            },
          };
        else {
          return this.#usuarios.crear(registro).then((resultado) => {
            if (resultado.exito) {
              return {
                ...resultado,
                codigo_error: null,
                datos: { resultado.id,resultado.nombre },
              };
            }else return resultado;
          });
        }
      } else return resultado;
    });
  }
  login() {}
  logout() {}
}

const ERRORES_BD = {
  SERVIDOR: 'No se pudo comunicar con Base de Datos.',
  CONEXION: 'No hay conexión con la Base de Datos.',
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
function adaptarMetaParaBackend(meta) {
  return {
    id: String(meta.id),
    detalles: String(meta.detalles),
    eventos: Number(meta.eventos),
    periodo: String(meta.periodo),
    icono: String(meta.icono),
    meta: Number(meta.meta),
    plazo: String(meta.plazo),
    completado: Number(meta.completado),
  };
}

function adaptarMetaParaFormulario(metaBackend) {
  return {
    id: String(metaBackend.id ?? ''),
    detalles: String(metaBackend.detalles ?? ''),
    eventos: String(metaBackend.eventos ?? '0'),
    periodo: String(metaBackend.periodo ?? ''),
    icono: String(metaBackend.icono ?? '🏃'),
    meta: String(metaBackend.meta ?? '0'),
    plazo: String(metaBackend.plazo ?? '2030-01-01'),
    completado: String(metaBackend.completado ?? '0'),
  };
}

export const bd = new BaseDatos(URL_BASE);
