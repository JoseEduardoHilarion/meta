import { bd } from '../../backend_basedatos/clases';

const SIN_ERROR = null;
const errores_API = {
  TOKEN_VENCIDO: '',
};

export function listarMetas() {
  const token = obtenerToken();

  bd.listarMetas(token);
}

export function crearMeta(meta) {}

export function actualizarMeta(meta) {}

export function borrarMeta(id) {}

export function registrarUsuario(usuario) {}

export function login(usuario) {}

export function logout() {}
