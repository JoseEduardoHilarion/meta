// src/components/form/MetaForm.jsx
import { useState } from 'react';
import Input from '../form/Input';
import InputSelect from '../form/InputSelect';
import './MetaForm.css';

import { listaPeriodo, iconos } from '../../data/mocks.js';
import { validarMeta } from '../../servicios/metaReglas.js'; // <-- Importamos tu validador central
import { notificar } from '../../servicios/sistemaNotificaciones.js';

export default function MetaForm({
  initialValues,
  mostrarCompletado,
  onSubmit,
  children,
}) {
  const [form, setForm] = useState(initialValues);
  const [erroresCampos, setErroresCampos] = useState({});
  const { detalles, eventos, periodo, icono, meta, plazo, completado } = form;

  const handleChange = (e) => {
    const { name, value, nodeName } = e.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(() => nuevoForm);
    if (nodeName === 'SELECT') {
      const { errores } = validarMeta(nuevoForm);
      setErroresCampos(errores);
    }
  };
  // NUEVO: Validación en caliente al salir (onBlur) usando tu validador central
  const handleBlur = () => {
    const { errores } = validarMeta(form);
    setErroresCampos(errores);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // CAPA DE SEGURIDAD FINAL
    const { esValido, errores } = validarMeta(form);
    if (!esValido) {
      // Si hay un error colgado, notificamos el primero y frenamos
      setErroresCampos(errores);
      notificar(
        '⚠️ Por favor, revisá los campos marcados en rojo antes de continuar.',
        'error',
      );
      return;
    }
    onSubmit(form); // Si todo está impecable, viaja al padre limpio
  };

  return (
    <form className="formulario neumo-flat" onSubmit={handleSubmit} noValidate>
      <Input
        label="Describe tu meta"
        name="detalles"
        value={detalles}
        onChange={handleChange}
        onBlur={handleBlur} // <-- Agregamos el validador al salir
        error={erroresCampos.detalles} // <-- Le pasamos el string del error si existe
        required
      />

      <fieldset className="neumo-flat">
        <Input
          label="¿Con qué frecuencia deseas cumplir tu meta?"
          type="number"
          min="0"
          required
          name="eventos"
          value={eventos}
          onChange={handleChange}
          onBlur={handleBlur} // <-- Agregamos el validador al salir
          error={erroresCampos.eventos} // <-- Le pasamos el string del error si existe
        />
        <InputSelect
          name="periodo"
          value={periodo}
          onChange={handleChange}
          options={listaPeriodo}
          required
        />
      </fieldset>
      <Input
        label="¿Cuántas veces deseas completar esta meta?"
        type="number"
        min="0"
        required
        name="meta"
        value={meta}
        onChange={handleChange}
        onBlur={handleBlur} // <-- Monitoreamos este campo clave
        error={erroresCampos.meta} // <-- Mandamos el error si se rompe la relación
      />

      <Input
        label="¿Tienes una fecha límite?"
        type="date"
        name="plazo"
        value={plazo}
        onChange={handleChange}
        onBlur={handleBlur} // <-- Agregamos el validador al salir
        error={erroresCampos.plazo} // <-- Le pasamos el string del error si existe
      />

      <InputSelect
        label="Escoge el icono para la meta"
        name="icono"
        value={icono}
        onChange={handleChange}
        options={iconos}
      />

      {mostrarCompletado && (
        <Input
          label="¿Cuántas veces has completado ya esta meta?"
          type="number"
          min="0"
          required
          name="completado"
          value={completado}
          onChange={handleChange}
          onBlur={handleBlur} // <-- Monitoreamos el otro extremo de la relación
          error={erroresCampos.completado} // <-- Muestra el error en caliente
        />
      )}
      <footer className="flex-between neumo-gradient">{children}</footer>
    </form>
  );
}
