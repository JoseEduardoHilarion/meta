// src/test/metaReglas.test.js
import { describe, test, expect } from 'vitest';
import { metaReglas } from '../servicios/meta/metaReglas';

describe('metaReglas', () => {
  describe('campo detalles', () => {
    test('rechaza descripción vacía', () => {
      const { esValido, errores } = metaReglas({
        detalles: '',
        eventos: '3',
        periodo: 'semana',
        meta: '10',
        completado: '0',
      });
      expect(esValido).toBe(false);
      expect(errores.detalles).toBeTruthy();
    });

    test('rechaza descripción solo con espacios', () => {
      const { errores } = metaReglas({
        detalles: '   ',
        eventos: '3',
        periodo: 'semana',
        meta: '10',
        completado: '0',
      });
      expect(errores.detalles).toBeTruthy();
    });

    test('acepta descripción válida', () => {
      const { errores } = metaReglas({
        detalles: 'Correr 5km',
        eventos: '3',
        periodo: 'semana',
        meta: '10',
        completado: '0',
      });
      expect(errores.detalles).toBeFalsy();
    });
  });

  describe('relación completado/meta', () => {
    test('rechaza completado mayor a meta', () => {
      const { esValido, errores } = metaReglas({
        detalles: 'Correr',
        eventos: '3',
        periodo: 'semana',
        meta: '5',
        completado: '10',
      });
      expect(esValido).toBe(false);
      expect(errores.completado).toBeTruthy();
    });

    test('acepta completado igual a meta', () => {
      const { errores } = metaReglas({
        detalles: 'Correr',
        eventos: '3',
        periodo: 'semana',
        meta: '10',
        completado: '10',
      });
      expect(errores.completado).toBeFalsy();
    });
  });

  describe('validación por campo', () => {
    test('solo valida el campo indicado', () => {
      const { errores } = metaReglas(
        { detalles: '', eventos: '', meta: '', completado: '' },
        'detalles',
      );
      expect(errores.detalles).toBeTruthy();
      expect(errores.eventos).toBeUndefined();
    });
  });
});
