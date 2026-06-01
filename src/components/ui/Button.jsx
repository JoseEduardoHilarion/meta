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
      onClick={onClick} // <-- Se lo pasamos directo, sin frenar a nadie
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
