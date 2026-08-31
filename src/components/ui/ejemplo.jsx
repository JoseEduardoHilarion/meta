import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer } from "./components/ui/Drawer";
import { HamburgerButton } from "./components/ui/HamburgerButton";

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const location = useLocation();

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <div className="app-container">
      {/* Botón hamburguesa */}
      <HamburgerButton
        onClick={() => setMenuAbierto(!menuAbierto)}
        isOpen={menuAbierto}
      />

      {/* Menú Drawer */}
      <Drawer isOpen={menuAbierto} onClose={cerrarMenu}>
        <Link
          to="/lista"
          className={location.pathname === "/Lista" ? "active" : ""}
          onClick={cerrarMenu}
        >
          📋 Mis Metas
        </Link>

        <Link
          to="/Crear"
          className={location.pathname === "/Crear" ? "active" : ""}
          onClick={cerrarMenu}
        >
          ➕ Nueva Meta
        </Link>

        <Link
          to="/Estadisticas"
          className={location.pathname === "/Estadisticas" ? "active" : ""}
          onClick={cerrarMenu}
        >
          📊 Estadísticas
        </Link>
      </Drawer>

      {/* Contenido principal */}
      <main className="main-content">
        {/* Tus rutas aquí */}
        <Routes>
          <Route path="/lista" element={<ListaMetas />} />
          <Route path="/Crear" element={<CrearMeta />} />
          {/* ... */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
