import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

test('permite al usuario iniciar sesión correctamente', async () => {
  render(<LoginForm />); // 1. Selección por Rol Accesible
  const userInput = screen.getByRole('textbox', { name: /usuario/i });
  const submitBtn = screen.getByRole('button', { name: /ingresar/i }); // 2. Simulación de Interacción Real
  await userEvent.type(userInput, 'maria_dev');
  await userEvent.click(submitBtn); // 3. Manejo de Asincronía y Aserción Accesible
  const welcomeMsg = await screen.findByRole('heading', {
    name: /bienvenida maria_dev/i,
  });
  expect(welcomeMsg).toBeInTheDocument();
});
