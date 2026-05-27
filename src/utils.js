// Esta función filtra los valores falsos (null, undefined, false)
// y une todo con un espacio.
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
