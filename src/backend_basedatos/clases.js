import { SIN_ERROR, URL_BASE, HORA, ERRORES_BD } from './constantes.js';
class Tabla {
  #endpoint;
  #bd;
  constructor(endpoint, bd) {
    this.#endpoint = endpoint;
    this.#bd = bd;
  }
  listar(filtro = '') {
    const fetchUrl = this.#bd.urlBase + '/' + this.#endpoint + filtro;
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
  #metas;
  constructor(urlBase) {
    this.#urlBase = urlBase;
    this.#usuarios = new Tabla('users', this);
    this.#metas = new Tabla('goals', this);
  }
  get urlBase() {
    return this.#urlBase;
  }
  cambiarUrlBase(url) {
    this.#urlBase = url;
  }
  #validarToken(tokenValor) {
    return this.#usuarios.listar().then((listaUsuarios) => {
      if (listaUsuarios.exito) {
        const usuarioEncontrado = listaUsuarios.datos.find(
          (usuario) => usuario.token.valor === tokenValor,
        );
        if (usuarioEncontrado)
          if (usuarioEncontrado.token.expira > Date.now())
            return {
              codigo_error: SIN_ERROR,
              id: usuarioEncontrado.id,
            };
          else
            return {
              codigo_error: 'TOKEN_VENCIDO',
              id: null,
            };
        else
          return {
            codigo_error: 'TOKEN_INVALIDO',
            id: null,
          };
      } else
        return {
          codigo_error: listaUsuarios.codigo_error,
          id: null,
        };
    });
  }
  ///"¿El token identifica a un usuario válido?"
  #conTokenValido(tokenValor, estrategia) {
    return this.#validarToken(tokenValor).then((usuarioAutenticado) => {
      if (usuarioAutenticado.codigo_error === SIN_ERROR) {
        return estrategia(usuarioAutenticado);
      } else {
        return {
          codigo_error: usuarioAutenticado.codigo_error,
          datos: null,
        };
      }
    });
  }
  //"Tengo una respuesta de Tabla; conviértela al formato que expone BaseDatos."
  #resultadoPublico(resultado) {
    if (resultado.exito) {
      return {
        codigo_error: SIN_ERROR,
        datos: resultado.datos,
      };
    } else {
      return {
        codigo_error: resultado.codigo_error,
        datos: null,
      };
    }
  }
  ///api publica
  listarMetas(tokenValor) {
    return this.#conTokenValido(tokenValor, (usuarioAutenticado) =>
      this.#metas
        .listar('?usuarioId=' + usuarioAutenticado.id)
        .then((resultadoListaMeta) =>
          this.#resultadoPublico({
            ...resultadoListaMeta,
            datos: resultadoListaMeta.exito
              ? resultadoListaMeta.datos.map((meta) =>
                  adaptarMetaParaFormulario(meta),
                )
              : null,
          }),
        ),
    );
  }
  crearMeta(datos, tokenValor) {
    return this.#conTokenValido(tokenValor, (usuarioAutenticado) => {
      const metaCrear = adaptarMetaParaBackend(datos);
      metaCrear.usuarioId = usuarioAutenticado.id;
      return this.#metas.crear(metaCrear).then((resultadoCrear) =>
        this.#resultadoPublico({
          ...resultadoCrear,
          datos: resultadoCrear.exito
            ? adaptarMetaParaFormulario(resultadoCrear.datos)
            : null,
        }),
      );
    });
  }
  actualizarMeta(datos, tokenValor) {
    return this.#conTokenValido(tokenValor, (usuarioAutenticado) => {
      const meta = adaptarMetaParaBackend(datos);
      return this.#metas.obtener(meta.id).then((metaEncontrada) => {
        if (metaEncontrada.exito)
          if (metaEncontrada.datos.usuarioId === usuarioAutenticado.id) {
            meta.usuarioId = usuarioAutenticado.id;
            return this.#metas.modificar(meta).then((resultadoModificar) => {
              return this.#resultadoPublico({
                ...resultadoModificar,
                datos: resultadoModificar.exito
                  ? adaptarMetaParaFormulario(resultadoModificar.datos)
                  : null,
              });
            });
          } else
            return {
              codigo_error: 'USUARIO_NO_REGISTRADO',
              datos: null,
            };
        else
          return {
            codigo_error: metaEncontrada.codigo_error,
            datos: null,
          };
      });
    });
  }
  borrarMeta(id, tokenValor) {
    return this.#conTokenValido(tokenValor, (usuarioAutenticado) => {
      return this.#metas.obtener(id).then((metaEncontrada) => {
        if (metaEncontrada.exito)
          if (metaEncontrada.datos.usuarioId === usuarioAutenticado.id)
            return this.#metas
              .borrar(id)
              .then((metaBorrada) => this.#resultadoPublico(metaBorrada));
          else
            return {
              codigo_error: 'USUARIO_NO_REGISTRADO',
              datos: null,
            };
        else
          return {
            codigo_error: metaEncontrada.codigo_error,
            datos: null,
          };
      });
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
        if (!existeDni && !existeEmail) {
          //se procede a GUARDAR USUARIO
          registro.token = {
            valor: '',
            expira: 0,
          };
          return this.#usuarios.crear(registro).then((resultado) =>
            this.#resultadoPublico({
              ...resultado,
              datos: resultado.exito
                ? {
                    id: resultado.datos.id,
                    nombre: resultado.datos.nombre,
                  }
                : null,
            }),
          );
        } else
          return {
            codigo_error: 'Existe_DNI_o_EMAIL',
            datos: null,
          };
      } else
        return {
          codigo_error: resultado.codigo_error,
          datos: null,
        };
    });
  }
  generarToken(reg) {
    const usuario = adaptarUsuarioParaBackend(reg);
    return this.#usuarios
      .listar('?email=' + usuario.email)
      .then((resultado) => {
        if (resultado.exito) {
          if (resultado.datos.length > 0) {
            const usuarioEncontrado = resultado.datos[0];
            if (usuarioEncontrado.passwordHash === usuario.passwordHash) {
              usuarioEncontrado.token.valor = generarToken();
              usuarioEncontrado.token.expira = Date.now() + 12 * HORA;
              return this.#usuarios
                .modificar(usuarioEncontrado)
                .then((resultadoModificarUsuario) =>
                  this.#resultadoPublico({
                    ...resultadoModificarUsuario,
                    datos: resultadoModificarUsuario.exito
                      ? {
                          id: resultadoModificarUsuario.datos.id,
                          nombre: resultadoModificarUsuario.datos.nombre,
                          token: resultadoModificarUsuario.datos.token.valor,
                        }
                      : null,
                  }),
                );
            } else
              return {
                codigo_error: 'CONTRASENA_INCORRECTA',
                datos: null,
              };
          } else
            return {
              codigo_error: 'USUARIO_NO_REGISTRADO',
              datos: null,
            };
        } else
          return {
            codigo_error: resultado.codigo_error,
            datos: null,
          };
      });
  }
  anularToken(tokenValor) {
    return this.#usuarios.listar().then((listaUsuarios) => {
      if (listaUsuarios.exito) {
        const usuarioEncontrado = listaUsuarios.datos.find(
          (usuario) => usuario.token.valor === tokenValor,
        );
        if (usuarioEncontrado) {
          usuarioEncontrado.token.valor = '';
          usuarioEncontrado.token.expira = 0;
          return this.#usuarios
            .modificar(usuarioEncontrado)
            .then((resultadoModificar) =>
              this.#resultadoPublico(resultadoModificar),
            );
        } else
          return {
            codigo_error: 'TOKEN_INVALIDO',
            datos: null,
          };
      } else
        return {
          codigo_error: listaUsuarios.codigo_error,
          datos: null,
        };
    });
  }
}
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

function generarToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  const bytes2 = [];
  bytes.map((numero) => bytes2.push(numero.toString(16).padStart(2, '0')));

  return bytes2.join('');
}
function hashP(password) {
  return String(password);
}
function adaptarUsuarioParaBackend(usuario) {
  const auxUsuario = {};
  if ('id' in usuario) auxUsuario.id = String(usuario.id);
  if ('nombre' in usuario) auxUsuario.nombre = String(usuario.nombre);
  if ('dni' in usuario) auxUsuario.dni = String(usuario.dni);
  if ('email' in usuario) auxUsuario.email = String(usuario.email);
  if ('password' in usuario) auxUsuario.passwordHash = hashP(usuario.password);
  if ('passwordHash' in usuario)
    auxUsuario.passwordHash = String(usuario.passwordHash);
  if ('token' in usuario) {
    auxUsuario.token = {};
    auxUsuario.token.valor = String(usuario.token.valor);
    auxUsuario.token.expira = Number(usuario.token.expira);
  }
  return auxUsuario;
}
/////////////////////////////////////////////
function adaptarMetaParaBackend(meta) {
  const auxmeta = {};
  if ('id' in meta) auxmeta.id = String(meta.id);
  if ('usuarioId' in meta) auxmeta.usuarioId = String(meta.usuarioId);
  auxmeta.detalles = String(meta.detalles);
  auxmeta.eventos = Number(meta.eventos);
  auxmeta.periodo = String(meta.periodo);
  auxmeta.icono = String(meta.icono);
  auxmeta.meta = Number(meta.meta);
  auxmeta.plazo = String(meta.plazo);
  auxmeta.completado = Number(meta.completado);
  return auxmeta;
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
