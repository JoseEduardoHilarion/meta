import { useState } from "react";
import { Input } from "../form/Input";
import { InputSelect } from "../form/InputSelect";
import "./Form.css";

import { listaPeriodo, iconos } from "../../data/mocks.js";
import { validarMeta } from "../../servicios/metaReglas.js";
import { notificar } from "../../servicios/sistemaNotificaciones.js";
import { FormContainer } from "./FormContainer.jsx";

export const MetaForm = ({
  initialValues,
  mostrarCompletado,
  onSubmit,
  header,
  footer,
}) => {
  const [form, setForm] = useState(initialValues);
  const [erroresCampos, setErroresCampos] = useState({});
  const { detalles, eventos, periodo, icono, meta, plazo, completado } = form;

  const handleChange = (e) => {
    const { name, value, nodeName } = e.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(nuevoForm);
    if (nodeName === "SELECT") {
      const { errores } = validarMeta(nuevoForm);
      setErroresCampos(errores);
    }
  };
  //Validación en caliente al salir (onBlur) usando tu validador central
  const handleBlur = () => {
    const { errores } = validarMeta(form);
    setErroresCampos(errores);
  };

  const handleSubmit = () => {
    const { esValido, errores } = validarMeta(form);
    if (!esValido) {
      // Si hay un error colgado, notificamos el primero y frenamos
      setErroresCampos(errores);
      notificar(
        "⚠️ Por favor, revisá los campos marcados en rojo antes de continuar.",
        "error",
      );
      return;
    }
    onSubmit(form); // Si todo está impecable, viaja al padre limpio
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      header={header}
      footer={footer}
      body={
        <>
          <Input
            label="Describe tu meta"
            name="detalles"
            value={detalles}
            onChange={handleChange}
            onBlur={handleBlur}
            error={erroresCampos.detalles}
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
              onBlur={handleBlur}
              error={erroresCampos.eventos}
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
            onBlur={handleBlur}
            error={erroresCampos.meta}
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
              label="¿Cuántas veces has completado ya esta meta?"
              type="number"
              min="0"
              required
              name="completado"
              value={completado}
              onChange={handleChange}
              onBlur={handleBlur}
              error={erroresCampos.completado}
            />
          )}
        </>
      }
    />
  );
};
