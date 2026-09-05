import { useState } from 'react';

import { FormContainer } from '../../components/form/FormContainer.jsx';
import { Input } from '../../components/form/Input.jsx';
import { Button } from '../../components/ui/Button.jsx';

import { validarCredenciales } from '../../servicios/meta/metaReglas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';

export const Registro = () => {
  const [form, setForm] = useState({
    usuario: '',
    password: '',
    password2: '',
  });
  const [erroresCampos, setErroresCampos] = useState({});
  const { usuario, password, password2 } = form;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(() => nuevoForm);
  };
  //Validación en caliente al salir (onBlur) usando tu validador central
  const handleBlur = () => {
    const { errores } = validarCredenciales(form);
    setErroresCampos(errores);
  };

  const handleSubmit = () => {
    const { esValido, errores } = validarCredenciales(form);
    if (!esValido) {
      // Si hay un error colgado, notificamos el primero y frenamos
      setErroresCampos(errores);
      notificar(
        '⚠️ Por favor, revisá los campos marcados en rojo antes de continuar.',
        'error',
      );
      return;
    }
    ///onSubmit(form); // Si todo está impecable, viaja al padre limpio
  };

  return (
    <FormContainer
      onSubmit={handleSubmit}
      header={<h2 className="m-2">REGISTRO</h2>}
      body={
        <>
          <Input
            column
            label="Correo electrónico o Nombre de usuario"
            name="usuario"
            value={usuario}
            onChange={handleChange}
            onBlur={handleBlur}
            error={erroresCampos.usuario}
            required
          />
          <Input
            column
            label="Clave o Contraseña"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={erroresCampos.password}
            required
          />
          <Input
            column
            label="Repita la Clave o Contraseña"
            name="password2"
            type="password"
            value={password2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={erroresCampos.password2}
            required
          />
        </>
      }
      footer={
        <Button className="dark" type="submit">
          Registrar
        </Button>
      }
    />
  );
};
