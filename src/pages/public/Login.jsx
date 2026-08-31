import { useState } from "react";

import { FormContainer } from "../../components/form/FormContainer.jsx";
import { Input } from "../../components/form/Input.jsx";
import { Button } from "../../components/ui/Button.jsx";

import { validarCredenciales } from "../../servicios/metaReglas.js";
import { notificar } from "../../servicios/sistemaNotificaciones.js";
import { NavLink } from "react-router";

export const Login = () => {
  const [form, setForm] = useState({ usuario: "", password: "" });
  const [erroresCampos, setErroresCampos] = useState({});
  const { usuario, password } = form;

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

  const handleLogin = () => {
    const { esValido, errores } = validarCredenciales(form);
    if (!esValido) {
      // Si hay un error colgado, notificamos y frenamos
      setErroresCampos(errores);
      notificar(
        "⚠️ Por favor, revisá los campos marcados en rojo antes de continuar.",
        "error",
      );
      return;
    }
    ///onSubmit(form); // Si todo está impecable, viaja al padre limpio
  };

  return (
    <FormContainer
      onSubmit={handleLogin}
      header={<h2>ACCESO</h2>}
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
        </>
      }
      footer={
        <>
          <Button className="dark" type="submit">
            Acceder
          </Button>
          <NavLink to="/registro">Registrarse</NavLink>
        </>
      }
    />
  );
};
