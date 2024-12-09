import React from "react";
import "./style.scss"; // Optional: Add styling for your modal in a CSS file

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          { <h2>{"title"}</h2>}
          <button onClick={onClose} className="modal-close-btn">
            ×
          </button>
        </div>
        <div className="modal-body"> dd</div>
      </div>
    </div>
  );
};

export default Modal;
