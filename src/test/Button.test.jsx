// src/test/Button.test.jsx
import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../components/ui/Button';

describe('Button', () => {
  test('muestra el texto del botón', () => {
    render(<Button>Guardar</Button>);
    expect(screen.getByText('Guardar')).toBeInTheDocument();
  });

  test('llama onClick cuando el usuario hace clic', async () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Guardar</Button>);
    await userEvent.click(screen.getByText('Guardar'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  /*test('no llama onClick cuando está deshabilitado', async () => {
    const handleClick = vi.fn();

    render(
      <Button onClick={handleClick} disabled>
        Guardar
      </Button>,
    );
    await userEvent.click(screen.getByText('Guardar'));

    expect(handleClick).not.toHaveBeenCalled();
  });*/

  test('aplica la clase CSS que recibe', () => {
    render(<Button className="mi-clase">Guardar</Button>);
    const boton = screen.getByRole('button');
    expect(boton).toHaveClass('mi-clase');
  });

  test('type button por defecto', () => {
    render(<Button>Guardar</Button>);
    const boton = screen.getByRole('button');
    expect(boton).toHaveAttribute('type', 'button');
  });
  // ✅ y agregás este para verificar que acepta type submit
  test('acepta type submit cuando se lo pasás', () => {
    render(<Button type="submit">Guardar</Button>);
    const boton = screen.getByRole('button');
    expect(boton).toHaveAttribute('type', 'submit');
  });
});
