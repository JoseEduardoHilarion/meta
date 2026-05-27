# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
///////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
La estructura de tu proyecto (la real)
mi-proyecto/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/          ← imágenes
│   ├── App.css          ← estilos del componente
│   ├── App.jsx          ← 👈 acá vas a trabajar
│   ├── index.css        ← estilos globales
│   └── main.jsx         ← punto de entrada (no tocar)
├── index.html
├── package.json
└── vite.config.js

¿Borrás todo App.jsx? Sí, pero con criterio
main.jsx no lo toques nunca — es el motor que arranca todo.
App.jsx sí lo vaciás, pero dejá la estructura mínima:
jsxfunction App() {
  return (
    <div>
      <h1>Hola Mundo</h1>
    </div>
  )
}

export default App
Eso es el equivalente exacto de lo que hacía tu profesor en el HTML con CDN. La última línea export default App es obligatoria porque main.jsx la importa.

También podés limpiar App.css e index.css
Tienen estilos del ejemplo de Vite que van a pisar tus estilos. Podés borrar el contenido de App.css y dejar index.css solo con un reset básico, o borrarlos también por ahora.
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
¡Perfecto! Ya tienes el servidor corriendo. He revisado la estructura de archivos que generó Vite para tu proyecto mi-proyecto y aquí tienes el detalle de para qué sirve cada cosa:
📁 Carpetas Principales

    src/: Es la carpeta más importante. Aquí es donde escribirás el código de tu aplicación (componentes, estilos, lógica).

    public/: Contiene archivos estáticos que no cambian, como el icono de la pestaña (favicon.svg). Todo lo que pongas aquí se servirá directamente en la raíz de tu sitio.

📄 Archivos de Configuración y Base

    index.html: Es el punto de entrada de tu web. Verás que tiene un <div id="root"></div>, que es el "hueco" donde React va a inyectar toda tu aplicación.

    package.json: Aquí se listan las dependencias (como React 19 y Vite 8) y los comandos que puedes usar, como npm run dev para desarrollar o npm run build para crear la versión final.

    vite.config.js: Es el archivo donde se configura cómo se comporta Vite; por defecto, ya viene preparado para entender el código de React.

    .gitignore: Le dice a Git qué archivos no debe subir a internet (como la carpeta node_modules, que es muy pesada y se genera automáticamente).

⚛️ Archivos de Código (dentro de src/)

    main.jsx: Es el "pegamento". Se encarga de tomar tu componente principal y renderizarlo dentro del div con id root que mencionamos antes.

    App.jsx: Es el componente principal de tu aplicación. Lo que ves ahora mismo en tu navegador es el resultado de lo que hay escrito en este archivo.

    App.css e index.css: Son los archivos donde se define el diseño y los colores de tu aplicación.