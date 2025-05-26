import React from "react";

const DisplayCardClaimer = ({ claimant, number }) => {
  // Card container styles
  const cardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    position: "relative",
    ":hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
    }
  };

  return (
    <div style={cardStyle}>
      <div style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}>
        <span style={{ 
          backgroundColor: "#1a237e",
          color: "white",
          borderRadius: "50%",
          width: "30px",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "1rem"
        }}>
          {number}
        </span>
        <h3 style={{ margin: 0, color: "#2c3e50" }}>{claimant.claimantname}</h3>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <p style={{ margin: "0.5rem 0", color: "#4a5568" }}>
          <strong>Item:</strong> {claimant.itemdetails}
        </p>
        <p style={{ margin: "0.5rem 0", color: "#4a5568" }}>
          <strong>Contact:</strong> {claimant.mobilenumber}
        </p>
        <p style={{ margin: "0.5rem 0", color: "#4a5568" }}>
          <strong>Hostel:</strong> {claimant.hostelname}
        </p>
        <p style={{ margin: "0.5rem 0", color: "#4a5568" }}>
          <strong>Proof:</strong> {claimant.proofofclaim}
        </p>
      </div>
    </div>
  );
};

export default DisplayCardClaimer;