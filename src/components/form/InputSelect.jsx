import './Input.css';

export const InputSelect = (
  {
    label,
    name,
    value,
    onChange,
    className = 'neumo-inset',
    options,
    ...props
  }
) => {
  return (
    /* Cambiamos la clase del label a 'formulario__grupo' */
    <label className="field" htmlFor={`id-${name}`}>
      {label}
      <select
        className={`field__input ${className}`}
        id={`id-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      >
        {!value && (
          <option value="" disabled>
            Selecciona una opción...
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
};
