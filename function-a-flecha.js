//pnpm dlx jscodeshift -t function-a-flecha.js src/ --extensions=js,jsx --parser=babel

// Convierte componentes "function X() {}" → "const X = () => {}"
module.exports = function (fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);
  let changed = false;

  // Solo componentes (nombre empieza con mayúscula).
  // Si quieres convertir TODAS las funciones, cambia la línea por: return true;
  const esComponente = (name) => /^[A-Z]/.test(name);

  root.find(j.FunctionDeclaration).forEach((path) => {
    const node = path.node;
    if (!node.id || !esComponente(node.id.name)) return;

    const arrow = j.arrowFunctionExpression(node.params, node.body, false);
    arrow.async = node.async;

    const varDecl = j.variableDeclaration('const', [
      j.variableDeclarator(j.identifier(node.id.name), arrow),
    ]);

    // Si era "export function X() {}", lo deja como "export const X = ..."
    if (path.parent.node.type === 'ExportNamedDeclaration') {
      j(path.parent).replaceWith(j.exportNamedDeclaration(varDecl, []));
    } else {
      j(path).replaceWith(varDecl);
    }
    changed = true;
  });

  return changed ? root.toSource({ quote: 'single' }) : null;
};
