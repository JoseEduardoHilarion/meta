// src/test/authReglas.test.js
import { describe, test, expect } from 'vitest';
import { authReglas } from '../servicios/auth/authReglas';

describe('authReglas', () => {
  describe('campo email', () => {
    test('rechaza email vacío', () => {
      const { esValido, errores } = authReglas({ email: '', password: '' });
      expect(esValido).toBe(false);
      expect(errores.email).toBeTruthy();
    });

    test('rechaza email solo con espacios', () => {
      const { errores } = authReglas({ email: '   ', password: '123' });
      expect(errores.email).toBeTruthy();
    });

    test('acepta email válido', () => {
      const { errores } = authReglas({
        email: 'jose@mail.com',
        password: '123',
      });
      expect(errores.email).toBeFalsy();
    });
  });

  describe('campo password', () => {
    test('rechaza password vacío', () => {
      const { errores } = authReglas({ email: 'jose@mail.com', password: '' });
      expect(errores.password).toBeTruthy();
    });

    test('acepta password con contenido', () => {
      const { errores } = authReglas({
        email: 'jose@mail.com',
        password: '123',
      });
      expect(errores.password).toBeFalsy();
    });
  });

  describe('campo password2 — solo en registro', () => {
    test('no valida password2 si no existe en los datos', () => {
      const { errores } = authReglas({
        email: 'jose@mail.com',
        password: '123',
      });
      expect(errores.password2).toBeUndefined();
    });

    test('rechaza password2 vacío cuando existe', () => {
      const { errores } = authReglas({
        email: 'jose@mail.com',
        password: '123',
        password2: '',
      });
      expect(errores.password2).toBeTruthy();
    });

    test('rechaza contraseñas distintas', () => {
      const { errores } = authReglas({
        email: 'jose@mail.com',
        password: '123',
        password2: '456',
      });
      expect(errores.password2).toBeTruthy();
    });

    test('acepta contraseñas iguales', () => {
      const { errores } = authReglas({
        email: 'jose@mail.com',
        password: '123',
        password2: '123',
      });
      expect(errores.password2).toBeFalsy();
    });
  });

  describe('validación por campo', () => {
    test('solo valida email cuando se indica', () => {
      const { errores } = authReglas(
        { email: '', password: '', password2: '' },
        'email',
      );
      expect(errores.email).toBeTruthy();
      expect(errores.password).toBeUndefined();
    });
  });
});
