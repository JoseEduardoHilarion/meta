// Esta función filtra los valores falsos (null, undefined, false)
// y une todo con un espacio.
export const cn = (...classes) => classes.filter(Boolean).join(' ');
