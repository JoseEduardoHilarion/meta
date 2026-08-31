import "./Icono.css";
import { cn } from "./../../utils";

export const Icono = ({ variant, children, clickable, className, ...rest }) => {
  return (
    <div
      className={cn(
        className,
        "icono",
        `neumo-${variant}`,
        clickable && "clickable",
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
