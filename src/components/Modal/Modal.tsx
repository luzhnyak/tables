import React, { FC, ReactNode } from "react";

interface IProps {
  title: string;
  onClose: (entity: string) => void;
  children: ReactNode;
  entity: string;
  size?: string;
}

const Modal: FC<IProps> = ({ title, children, onClose, entity, size }) => {
  return (
    <div
      className={
        size === "large" ? "modal modal-xl d-block" : "modal modal-lg d-block"
      }
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => onClose(entity)}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
