import "./Input.css";

export const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur, // <-- RECEPTOR: Atajamos el evento de salida
  error, // <-- RECEPTOR: Atajamos el texto del error si existe
  className = "neumo-inset",
  column,
  ...props
}) => {
  const TipoInput = type === "textarea" ? "textarea" : "input";

  return (
    <label
      className={column ? "field field--column" : "field"}
      htmlFor={`id-${name}`}
    >
      <span className="field__label-text">{label}</span>
      <TipoInput
        // Si hay un error, le sumamos una clase CSS para pintarlo de rojo de forma neumórfica
        className={`field__input ${className} ${error ? "field__input--error" : ""}`}
        id={`id-${name}`}
        name={name}
        type={type === "textarea" ? undefined : type}
        value={value}
        onChange={onChange}
        onBlur={onBlur} // <-- ENGANCHE: Se lo pasamos nativamente al input/textarea
        placeholder=" "
        {...props}
      />
      {/* CAPA VISUAL: Si el formulario nos manda un error, lo dibujamos abajo */}
      {error && (
        <span className="field__error-text text-danger d-block mt-1">
          {error}
        </span>
      )}
    </label>
  );
};
