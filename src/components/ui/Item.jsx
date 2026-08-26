import "./Item.css";
import { cn } from "./../../utils";

export const Item = ({ children, variant, clickable, className, onClick }) => {
  const neumo = variant ? `neumo-${variant}` : null;
  const handleClickInterno = (e) => {
    e.stopPropagation(); // Frenamos la propagación
    onClick?.(e); // el ?. significa "ejecutá solo si existe"
  };

  return (
    <div
      className={cn("item", neumo, clickable && "clickable", className)}
      onClick={handleClickInterno}
    >
      {children}
    </div>
  );
};
