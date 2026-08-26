//pnpm dlx jscodeshift -t default-to-named.js src/ --extensions=js,jsx --parser=babel

// Convierte export default → export nombrado
// y los imports default locales → imports nombrados
module.exports = function (fileInfo, api) {
	const j = api.jscodeshift;
	const root = j(fileInfo.source);
	let changed = false;

	// ---- 1) EXPORTS ----
	root.find(j.ExportDefaultDeclaration).forEach((path) => {
		const decl = path.node.declaration;

		// export default function Nombre() {}
		if (decl.type === 'FunctionDeclaration' && decl.id) {
			j(path).replaceWith(j.exportNamedDeclaration(decl, []));
			changed = true;
			return;
		}

		// export default Nombre;  (Nombre declarado arriba como const/function)
		if (decl.type === 'Identifier') {
			const name = decl.name;
			let merged = false;

			root.find(j.VariableDeclaration)
				.filter(
					(p) =>
						p.node.declarations.length === 1 &&
						p.node.declarations[0].id.name === name,
				)
				.forEach((varPath) => {
					if (merged) return;
					j(varPath).replaceWith(
						j.exportNamedDeclaration(varPath.node, []),
					);
					merged = true;
				});

			if (!merged) {
				root.find(j.FunctionDeclaration)
					.filter((p) => p.node.id && p.node.id.name === name)
					.forEach((fnPath) => {
						if (merged) return;
						j(fnPath).replaceWith(
							j.exportNamedDeclaration(fnPath.node, []),
						);
						merged = true;
					});
			}

			if (merged) {
				j(path).prune(); // borra el "export default Nombre;"
			} else {
				j(path).replaceWith(
					j.exportNamedDeclaration(null, [
						j.exportSpecifier(
							j.identifier(name),
							j.identifier(name),
						),
					]),
				);
			}
			changed = true;
		}
		// los "export default () => {}" anónimos se dejan para revisar a mano
	});

	// ---- 2) IMPORTS (solo archivos locales, NO librerías) ----
	root.find(j.ImportDeclaration).forEach((path) => {
		const source = path.node.source.value;
		const esLocal =
			source.startsWith('./') ||
			source.startsWith('../') ||
			source.startsWith('@/');
		if (!esLocal) return; // deja intacto import React from 'react', etc.

		const specs = path.node.specifiers;
		const defaultSpec = specs.find(
			(s) => s.type === 'ImportDefaultSpecifier',
		);
		if (!defaultSpec) return;

		const name = defaultSpec.local.name;
		path.node.specifiers = specs.map((s) =>
			s === defaultSpec
				? j.importSpecifier(j.identifier(name), j.identifier(name))
				: s,
		);
		changed = true;
	});

	return changed ? root.toSource({ quote: 'single' }) : null;
};
