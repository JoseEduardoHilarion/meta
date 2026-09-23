// src/test/Login.test.jsx
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from '../pages/public/Login';
import { SIN_ERROR } from '../backend_basedatos/constantes';

// ─── MOCKS ───────────────────────────────────────────────
// Funciones espía que reemplazan los módulos reales
const mockNavegar = vi.fn();
const mockLogin = vi.fn();
const mockInicializarMetas = vi.fn();
const mockNotificar = vi.fn();

// vi.mock reemplaza el módulo entero por lo que vos definís
// Login llama useNavigate() — le damos nuestra función espía
vi.mock('react-router', () => ({
  useNavigate: () => mockNavegar,
  NavLink: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Login llama useAuthActions() — le damos nuestro mock
vi.mock('../servicios/auth/AuthMemoria.jsx', () => ({
  useAuthActions: () => ({ login: mockLogin }),
}));

// Login llama useMetasActions() — le damos nuestro mock
vi.mock('../servicios/meta/useMetas.js', () => ({
  useMetasActions: () => ({ inicializarMetas: mockInicializarMetas }),
}));

// Login llama notificar() — la espiamos
vi.mock('../servicios/sistemaNotificaciones.js', () => ({
  notificar: mockNotificar,
}));

// ─── HELPER ──────────────────────────────────────────────
// Reutilizable para no repetir en cada test
async function llenarForm(email = 'jose@mail.com', password = '123456') {
  await userEvent.type(screen.getByLabelText(/correo/i), email);
  await userEvent.type(screen.getByLabelText(/clave/i), password);
}

// ─── TESTS ───────────────────────────────────────────────
describe('Login', () => {
  // Antes de cada test limpia los contadores de los mocks
  // sin esto, el segundo test vería las llamadas del primero
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renderiza los dos campos y el botón', () => {
    render(<Login />);
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/clave/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /acceder/i }),
    ).toBeInTheDocument();
  });

  test('no llama login si los campos están vacíos', async () => {
    render(<Login />);
    await userEvent.click(screen.getByRole('button', { name: /acceder/i }));

    // nunca debería llamar al backend con datos inválidos
    expect(mockLogin).not.toHaveBeenCalled();
    // sí debería notificar el error
    expect(mockNotificar).toHaveBeenCalledWith(
      expect.stringContaining('campos marcados'),
      'error',
    );
  });

  test('llama login con email y password correctos', async () => {
    // mockResolvedValue — cuando se llame login(), va a devolver esto
    mockLogin.mockResolvedValue({
      codigo_error: 'USUARIO_NO_REGISTRADO',
      datos: null,
    });

    render(<Login />);
    await llenarForm();
    await userEvent.click(screen.getByRole('button', { name: /acceder/i }));

    // verifica que login fue llamado con los datos exactos del form
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'jose@mail.com',
      password: '123456',
    });
  });

  test('navega a /lista cuando login e inicializarMetas son exitosos', async () => {
    // simulás el backend devolviendo éxito
    mockLogin.mockResolvedValue({
      codigo_error: SIN_ERROR,
      datos: { token: { valor: 'token-123', expira: Date.now() + 100000 } },
    });
    mockInicializarMetas.mockResolvedValue({
      codigo_error: SIN_ERROR,
      datos: [],
    });

    render(<Login />);
    await llenarForm();
    await userEvent.click(screen.getByRole('button', { name: /acceder/i }));

    // verificás que navegó al lugar correcto
    expect(mockNavegar).toHaveBeenCalledWith('/lista', { replace: true });
  });

  test('muestra error y no navega cuando las credenciales son incorrectas', async () => {
    mockLogin.mockResolvedValue({
      codigo_error: 'USUARIO_NO_REGISTRADO',
      datos: null,
    });

    render(<Login />);
    await llenarForm();
    await userEvent.click(screen.getByRole('button', { name: /acceder/i }));

    expect(mockNotificar).toHaveBeenCalledWith(expect.anything(), 'error');
    expect(mockNavegar).not.toHaveBeenCalled();
  });
});
