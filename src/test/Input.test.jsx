// src/test/Input.test.jsx
import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from '../components/form/Input';

// src/test/Input.test.jsx — agregá este test al describe existente
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Input', () => {
  test('llama onChange cuando el usuario escribe', async () => {
    const handleChange = vi.fn(); // función espía — registra si fue llamada

    render(
      <Input
        label="Describe tu meta"
        name="detalles"
        value=""
        onChange={handleChange}
      />,
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Correr');

    // verificás que onChange fue llamado
    expect(handleChange).toHaveBeenCalled();
  });
  ///////////////////////
  test('muestra el label', () => {
    render(
      <Input
        label="Describe tu meta"
        name="detalles"
        value=""
        onChange={() => {}}
      />,
    );
    // busca el texto "Describe tu meta" en el DOM
    expect(screen.getByText('Describe tu meta')).toBeInTheDocument();
  });

  test('muestra el mensaje de error cuando existe', () => {
    render(
      <Input
        label="Describe tu meta"
        name="detalles"
        value=""
        onChange={() => {}}
        error="La descripción no puede estar vacía."
      />,
    );
    expect(
      screen.getByText('La descripción no puede estar vacía.'),
    ).toBeInTheDocument();
  });

  test('no muestra error cuando no existe', () => {
    render(
      <Input
        label="Describe tu meta"
        name="detalles"
        value=""
        onChange={() => {}}
      />,
    );
    expect(
      screen.queryByText('La descripción no puede estar vacía.'),
    ).not.toBeInTheDocument();
  });

  test('el input tiene el value correcto', () => {
    render(
      <Input
        label="Describe tu meta"
        name="detalles"
        value="Correr 5km"
        onChange={() => {}}
      />,
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Correr 5km');
  });
});
