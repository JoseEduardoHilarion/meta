import { useState } from 'react';

import { FormContainer } from '../../components/form/FormContainer.jsx';
import { Input } from '../../components/form/Input.jsx';
import { Button } from '../../components/ui/Button.jsx';

import { authReglas } from '../../servicios/auth/authReglas.js';
import { notificar } from '../../servicios/sistemaNotificaciones.js';
import { NavLink, useNavigate } from 'react-router';

import {
  ERRORES_APLICACION,
  SIN_ERROR,
} from '../../backend_basedatos/constantes.js';
import { useAuthActions } from '../../servicios/auth/AuthMemoria.jsx';
import { useMetasActions } from '../../servicios/meta/useMetas.js';

export const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [erroresCampos, setErroresCampos] = useState({});
  const { email, password } = form;
  const navegar = useNavigate();

  const { login } = useAuthActions();
  const { inicializarMetas } = useMetasActions();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const nuevoForm = { ...form, [name]: value };
    setForm(() => nuevoForm);
  };
  //Validación al salir
  const handleBlur = (e) => {
    const { name } = e.target;
    const { errores } = authReglas(form, name);
    setErroresCampos((prev) => ({ ...prev, ...errores }));
  };

  const handleLogin = () => {
    const { esValido, errores } = authReglas(form);
    if (esValido)
      login(form).then((resultadoLogin) => {
        if (resultadoLogin.codigo_error === SIN_ERROR) {
          inicializarMetas(resultadoLogin.datos.token.valor).then(
            (resultadoMetas) => {
              if (resultadoMetas.codigo_error === SIN_ERROR)
                navegar('/lista', { replace: true });
              else
                notificar(
                  ERRORES_APLICACION[resultadoMetas.codigo_error],
                  'error',
                );
            },
          );
        } else
          notificar(ERRORES_APLICACION[resultadoLogin.codigo_error], 'error');
      });
    else {
      setErroresCampos(errores);
      notificar(
        '⚠️ Por favor, revisá los campos marcados en rojo antes de continuar.',
        'error',
      );
    }
  };

  return (
    <FormContainer
      onSubmit={handleLogin}
      header={<h2 className="p-2">ACCESO</h2>}
      body={
        <>
          <Input
            column
            label="Ingrese el Correo electrónico"
            name="email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={erroresCampos.email}
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
