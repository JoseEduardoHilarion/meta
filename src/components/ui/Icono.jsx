import './Icono.css';
import { cn } from './../../utils';


// Usamos 'children' para recibir lo que sea (SVG, imagen, texto, etc.)
export default function Icono({ variant , children, interactive, className }) {
  const neumo = `neumo-${variant}`;
  return (
    <div className={
      cn('icono', 
        neumo, 
        interactive && 'interactive', 
        className)}>
      {children}
    </div>
  );
}
