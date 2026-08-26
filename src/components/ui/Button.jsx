import { cn } from "./../../utils";
import "./Button.css";

export const Button = ({
  type = "button",
  children,
  onClick,
  red,
  gradiente,
  className,
  ...rest
}) => {
  return (
    <button
      className={cn(
        "button",
        "clickable",
        "neumo-flat",
        red && "buttonRed",
        gradiente && "buttonGradient",
        className,
      )}
      onClick={onClick} // <-- Se lo pasamos directo, sin frenar a nadie
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
};
