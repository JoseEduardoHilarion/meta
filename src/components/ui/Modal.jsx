import { Button } from "./Button";
import "./Modal.css";

export const Modal = ({ children, alCerrar }) => {
  return (
    <div className="modal-overlay" onClick={alCerrar}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <Button className="modal-cerrar-btn" onClick={alCerrar}>
          ×
        </Button>
        {/* Acá se inyecta dinámicamente el contenido (tu Form, un texto, etc.) */}
        {children}
      </div>
    </div>
  );
};
