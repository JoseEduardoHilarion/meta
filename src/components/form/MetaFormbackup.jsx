import { useState } from 'react';
import Input from '../form/Input';
import './MetaForm.css';
import InputSelect from '../form/InputSelect';

import { listaPeriodo, iconos } from '../../data/mocks.js';

export default function MetaForm({
  initialValues,
  mostrarCompletado,
  onSubmit,
  children,
}) {
  const [form, setForm] = useState(initialValues);
  const { detalles, eventos, periodo, icono, meta, plazo, completado } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form); // Le pasa los datos limpios al padre
  };

  return (
    <form className="formulario neumo-flat" onSubmit={handleSubmit}>
      <Input
        label="Describe tu meta"
        name="detalles"
        value={detalles}
        onChange={handleChange}
        required
      />
      <fieldset className="neumo-flat">
        <Input
          label="¿Con que frecuencia deseas cumplir tu meta?
          (ej. 1 vez a la semana)"
          type="number"
          min="0"
          required
          name="eventos"
          value={eventos}
          onChange={handleChange}
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
        label="¿Cuantas veces deseas completar esta meta?"
        type="number"
        min="0"
        required
        name="meta"
        value={meta}
        onChange={handleChange}
      />
      <Input
        label="¿Tienes una fecha límite?"
        type="date"
        name="plazo"
        value={plazo}
        onChange={handleChange}
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
          label="¿Cuantas veces haz completado ya esta meta"
          type="number"
          min="0"
          required
          name="completado"
          value={completado}
          onChange={handleChange}
        />
      )}
      <footer className="flex-between neumo-gradient">{children}</footer>
    </form>
  );
}
