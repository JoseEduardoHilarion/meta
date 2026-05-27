import { cn } from './../../utils';

import './Button.css';

export default function Button({
  type = 'button',
  children,
  onClick,
  red,
  gradiente,
  className,
  ...rest
}) {
  const handleClickInterno = (e) => {
    e.stopPropagation(); // Frenamos la propagación
    onClick?.(e); // Ejecutamos si existe
  };

  return (
    <button
      className={cn(
        'button',
        'interactive',
        'neumo-flat',
        red && 'buttonRed',
        gradiente && 'buttonGradient',
        className,
      )}
      onClick={handleClickInterno}
      type = {type}
      {...rest}
    >
      {children}
    </button>
  );
}
