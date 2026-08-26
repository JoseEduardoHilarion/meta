import "./Icono.css";
import { cn } from "./../../utils";

export const Icono = ({ variant, children, clickable, className }) => {
  const neumo = `neumo-${variant}`;
  return (
    <div className={cn("icono", neumo, clickable && "clickable", className)}>
      {children}
    </div>
  );
};
