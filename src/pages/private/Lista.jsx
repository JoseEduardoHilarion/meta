import { Outlet, useNavigate } from 'react-router';

import { Meta } from './Meta.jsx';
import { useMetas } from '../../servicios/meta/useMetas.js';

export const Lista = () => {
  const { metas } = useMetas(); // Tu hook de lectura
  const navegar = useNavigate();
  return (
    <>
      {metas.map((meta) => (
        <Meta
          key={meta.id}
          {...meta}
          onClick={() => {
            navegar(`/Lista/${meta.id}`);
          }}
        />
      ))}
      <Outlet />
    </>
  );
};
