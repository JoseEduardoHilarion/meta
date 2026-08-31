import "./Drawer.css";

export const Drawer = ({ isOpen, onClose, children }) => {
  return (
    <>
      {/* Overlay oscuro de fondo */}
      {isOpen && (
        <div
          className="drawer-overlay"
          onClick={onClose}
          aria-label="Cerrar menú"
        />
      )}

      {/* Menú deslizante */}
      <div className={`drawer ${isOpen ? "drawer-open" : ""} neumo-flat`}>
        {children}
      </div>
    </>
  );
};
