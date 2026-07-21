import React from "react";
import "./LoadingOverlay.css";

const LoadingOverlay = ({ show, message }) => {
  if (!show) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-card">

        <div className="spinner"></div>

        <h3>{message || "Processing Transaction..."}</h3>

        <p>Please confirm the transaction in MetaMask.</p>

      </div>
    </div>
  );
};

export default LoadingOverlay;