import React from "react";

function ModalDashboard({ show, children }) {
  return (
    <section className={`custom-modal ${show ? "custom-modal--show" : ""}`}>
      <div className="custom-modal__container">
        {children}
        
      </div>
    </section>
  );
}

export default ModalDashboard;
