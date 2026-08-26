import './Modal.css';

export const Modal = ({ children, alCerrar }) => {
  return (
    <div className="modal-overlay" onClick={alCerrar}>
      <div
        className="modal-content neumo-flat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* El botón de la cruz "X" clásico para cerrar por si el usuario no hace clic afuera */}
        <button className="modal-cerrar-btn neumo-inset" onClick={alCerrar}>
          ×
        </button>

        {/* Acá se inyecta dinámicamente el contenido (tu Form, un texto, etc.) */}
        {children}
      </div>
    </div>
  );
};
