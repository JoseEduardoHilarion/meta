import './Icono.css';
import { cn } from './../../utils';

export const Icono = ({
  variant = '',
  children,
  clickable,
  cartel = '',
  source,
  className,
  ...rest
}) => {
  return (
    <div
      className={cn(
        'contenedor-icono',
        variant && `neumo-${variant}`,
        clickable && 'clickable',
        className,
      )}
      {...rest}
    >
      <div className="icono">{source}</div>
      {cartel && <span className="cartel">{cartel}</span>}
      {children}
    </div>
  );
};
