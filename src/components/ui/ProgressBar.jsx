import './ProgressBar.css';

export const ProgressBar = ({ completadas, total }) => {
  const porcentaje = total > 0 ? (completadas / total) * 100 : 0;

  return (
    <div className='progressBar'>
      {/* Texto informativo */}
      <span className='txt-xs fw-bold'>
        {completadas} de {total} ({Math.round(porcentaje)}%)
      </span>
      {/* Carril de la barra (Hundido) */}
      <div className='progressBar--carril neumo-inset'>
        {/* Progreso real (Elevado) */}
        <div className='progressBar--barra' style={{ width: `${porcentaje}%` }}></div>
      </div>
    </div>
  );
};
