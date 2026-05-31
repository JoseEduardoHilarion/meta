import './Input.css';

export default function Input({
    label,
    name,
    type = 'text',
    value,
    onChange,
    className = 'neumo-inset',
    ...props
}) {
    const TipoInput = type === 'textarea' ? 'textarea' : 'input';

    return (
        <label className="field" htmlFor={`id-${name}`}>
            <span className="field__label-text">{label}</span>
            <TipoInput
                className={`field__input ${className}`}
                id={`id-${name}`}
                name={name}
                type={type === 'textarea' ? undefined : type}
                value={value}
                onChange={onChange}
                placeholder=" "
                {...props}
            />
        </label>
    );
}
