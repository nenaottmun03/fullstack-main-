import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const LostItems = (props) => {
  const { item } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userMobile: "",
    userHostel: "",
    proofOfClaim: ""
  });

  // Card container styles
  const cardStyle = {
    border: "1px solid #e0e0e0",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "#ffffff",
    maxWidth: "400px",
    margin: "16px",
    flex: "1 1 300px",
    ":hover": {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      transform: "translateY(-4px)"
    }
  };

  // Text styles
  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#2c3e50",
    lineHeight: "1.3"
  };

  const descriptionStyle = {
    fontSize: "0.9rem",
    color: "#4a5568",
    lineHeight: "1.5",
    marginBottom: "16px"
  };

  // Status badge styles
  const statusStyle = {
    display: "inline-block",
    padding: "6px 16px",
    borderRadius: "20px",
    backgroundColor: item.concerntype === "lost" ? "#fff0f0" : "#f0fff4",
    color: item.concerntype === "lost" ? "#c53030" : "#2f855a",
    fontWeight: "500",
    fontSize: "0.8rem",
    margin: "12px 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  };

  // Image grid styles
  const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
    margin: "16px 0"
  };

  const imageStyle = {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    cursor: "zoom-in",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    ":hover": {
      transform: "scale(1.03)"
    }
  };

  // Action button styles
  const actionButtonStyle = {
    backgroundColor: item.concerntype === "lost" ? "#0074D9" : "#2ecc71",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "500",
    width: "100%",
    marginTop: "16px",
    ":hover": {
      backgroundColor: item.concerntype === "lost" ? "#0056b3" : "#27ae60",
      transform: "scale(1.02)"
    }
  };

  // Modal styles
  const modalStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000"
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    position: "relative"
  };

  // Input styles
  const inputStyle = {
    width: "100%",
    padding: "12px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "6px",
    fontSize: "16px",
    transition: "border-color 0.3s ease",
    ":focus": {
      borderColor: "#0074D9",
      outline: "none"
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e, actionType) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = actionType === "help" ? "helper" : "claimant";
      const data = {
        [actionType === "help" ? "helpername" : "claimantname"]: formData.userName,
        mobilenumber: formData.userMobile,
        hostelname: formData.userHostel,
        ...(actionType === "claim" && { proofofclaim: formData.proofOfClaim }),
        itemdetails: `${item.itemname} - ${item.itemdescription}`
      };

      await axios.post(`${Base_URL}/${endpoint}`, data);
      await axios.delete(`${Base_URL}/item/${item._id}`);
      
      alert(actionType === "help" 
        ? "Thank you for your help! The item has been temporarily removed."
        : "Claim submitted successfully! The item has been removed."
      );
      
      setIsModalOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <div>
        <h2 style={titleStyle}>{item.itemname}</h2>
        <p style={descriptionStyle}>{item.itemdescription}</p>
        <div style={statusStyle}>
          {item.concerntype.toUpperCase()}
        </div>

        {item.images?.length > 0 && (
          <div style={imageGridStyle}>
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Item ${index + 1}`}
                style={imageStyle}
              />
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        style={actionButtonStyle}
        disabled={isLoading}
      >
        {item.concerntype === "lost" ? "Offer Help" : "Claim Item"}
      </button>

      {isModalOpen && (
        <div style={modalStyle} onClick={() => setIsModalOpen(false)}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <button
              style={{
                position: "absolute",
                top: "1rem",
                right: "1rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#666"
              }}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h2 style={{ marginBottom: "1.5rem", color: "#2c3e50" }}>
              {item.concerntype === "lost" 
                ? "Help Reunite This Item" 
                : "Claim This Item"}
            </h2>
            
            <form onSubmit={(e) => handleSubmit(e, item.concerntype === "lost" ? "help" : "claim")}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  name="userMobile"
                  value={formData.userMobile}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                  Hostel Name *
                </label>
                <input
                  type="text"
                  name="userHostel"
                  value={formData.userHostel}
                  onChange={handleInputChange}
                  required
                  style={inputStyle}
                />
              </div>

              {item.concerntype === "found" && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                    Proof of Claim *
                  </label>
                  <input
                    type="text"
                    name="proofOfClaim"
                    value={formData.proofOfClaim}
                    onChange={handleInputChange}
                    required
                    style={inputStyle}
                    placeholder="Describe proof of ownership"
                  />
                </div>
              )}

              <button 
                type="submit"
                style={{
                  ...actionButtonStyle,
                  backgroundColor: isLoading 
                    ? "#95a5a6" 
                    : item.concerntype === "lost" 
                    ? "#0074D9" 
                    : "#2ecc71",
                  width: "100%",
                  padding: "14px"
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner size={20} color="#fff" />
                ) : item.concerntype === "lost" ? (
                  "Submit Help Request"
                ) : (
                  "Submit Claim"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItems;