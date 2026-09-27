import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Registro } from '../pages/public/Registro';

// Reutilizable para no repetir en cada test
async function llenarForm(
  nombre = 'jose',
  dni = 67676767,
  email = 'jose@mail.com',
  password = '123456',
  password2 = password,
) {
  await userEvent.type(screen.getByLabelText(/nombre/i), nombre);
  await userEvent.type(screen.getByLabelText(/dni/i), dni);
  await userEvent.type(screen.getByLabelText(/correo/i), email);
  await userEvent.type(screen.getByLabelText(/clave/i), password);
  await userEvent.type(screen.getByLabelText(/repita.*clave/i), password2);
}

describe('Registro', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
});
