import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';

import { Input } from '../components/form/Input';

describe('Input', () => {
  const baseProps = {
    label: 'Describe tu meta',
    name: 'detalles',
    value: '',
    onChange: () => {},
  };
  ///////////////////////
  test('muestra el label', () => {
    // Arrange + Act
    render(<Input {...baseProps} />);
    // Assert busca el texto "Describe tu meta" en el DOM
    expect(screen.getByText('Describe tu meta')).toBeInTheDocument();
  });
  ///////////////////////
  test('el input tiene el value correcto', () => {
    // Arrange + Act
    render(<Input {...baseProps} value="Correr 5km" />);
    //Act
    const input = screen.getByRole('textbox', { name: 'Describe tu meta' });
    // Assert
    expect(input).toHaveValue('Correr 5km');
  });
  ///////////////////////
  test('el input controlado muestra lo que escribe el usuario', async () => {
    // Arrange: un "padre" real con estado, como en la app
    function Harness() {
      const [valor, setValor] = useState('');
      return (
        <Input
          {...baseProps}
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      );
    }

    // Act: el usuario tipea
    render(<Harness />);
    const input = screen.getByRole('textbox', { name: 'Describe tu meta' });
    await userEvent.type(input, 'Correr');

    // Assert: lo que ve el usuario
    expect(input).toHaveValue('Correr');
  });

  ///////////////////////
  test('muestra el mensaje de error cuando existe', () => {
    // Arrange + Act
    render(
      <Input {...baseProps} error="La descripción no puede estar vacía." />,
    );
    // Assert
    expect(screen.getByRole('alert')).toHaveTextContent(
      'La descripción no puede estar vacía.',
    );
  });
  ///////////////////////
  test('NO muestra mensaje de error cuando NO existe', () => {
    render(<Input {...baseProps} />);
    expect(screen.queryByRole('alert')).toBeNull();
  });
  ///////////////////////
  test('textarea también tiene rol textbox', () => {
    render(<Input {...baseProps} type="textarea" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
