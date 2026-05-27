import './Item.css';
import { cn } from './../../utils';

export default function Item({
  children,
  variant,
  interactive,
  className,
  onClick,
}) {
  const neumo = variant ? `neumo-${variant}` : null;
  const handleClickInterno = (e) => {
    e.stopPropagation(); // Frenamos la propagación
    onClick?.(e); // Ejecutamos si existe
  };

  return (
    <div
      className={cn('item', neumo, interactive && 'interactive', className)}
      onClick={handleClickInterno}
    >
      {children}
    </div>
  );
}
