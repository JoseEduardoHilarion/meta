import './Icono.css';
import { cn } from './../../utils';

export const Icono = ({ variant, children, clickable, className }) => {
  return (
    <div
      className={cn(
        'icono',
        `neumo-${variant}`,
        clickable && 'clickable',
        className,
      )}
    >
      {children}
    </div>
  );
};
