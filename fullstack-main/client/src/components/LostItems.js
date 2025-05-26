import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "./config";

const Base_URL = config.baseURL;

const LostItems = (props) => {
  const { item } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    userMobile: "",
    userHostel: "",
    proofOfClaim: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add scroll lock when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  // Card container styles
  const boxStyle = {
    border: "1px solid #e0e0e0",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
    margin: "16px 0",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#ffffff",
    transform: "translateZ(0)",
    willChange: "transform, box-shadow",
    position: "relative",
    ":hover": {
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      transform: "scale(1.02) translateZ(0)",
      zIndex: 1
    }
  };

  // Button styles
  const btnStyle = {
    backgroundColor: "#0074D9",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    position: "relative",
    overflow: "hidden",
    ":disabled": {
      backgroundColor: "#95a5a6",
      cursor: "not-allowed"
    },
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(255,255,255,0.1)",
      opacity: 0,
      transition: "opacity 0.3s ease"
    },
    ":hover:not(:disabled)::after": {
      opacity: 1
    }
  };

  // Modal styles
  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(2px)"
  };

  const modalContentStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "500px",
    position: "relative",
    transform: "translateZ(0)",
    willChange: "transform"
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
      outline: "none",
      boxShadow: "0 0 0 2px rgba(0, 116, 217, 0.2)"
    }
  };

  // Image grid styles
  const imageGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    margin: "16px 0",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "8px",
    transition: "transform 0.3s ease",
    cursor: "zoom-in",
    transformOrigin: "center",
    ":hover": {
      transform: "scale(1.02)",
      zIndex: 2
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const phoneRegex = /^\d{10}$/;
    if (!formData.userName.trim()) return "Name is required";
    if (!phoneRegex.test(formData.userMobile)) return "Invalid phone number";
    if (!formData.userHostel.trim()) return "Hostel name is required";
    return null;
  };

  const handleSubmitHelp = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        helpername: formData.userName,
        mobilenumber: formData.userMobile,
        hostelname: formData.userHostel,
        itemdetails: `${item.itemname} - ${item.itemdescription}`,
      };

      await axios.post(`${Base_URL}/helper`, data);
      await axios.delete(`${Base_URL}/helper/${item._id}`);
      
      alert("Thank you for your help! The item has been temporarily removed.");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (item.concerntype !== "lost") return null;

  return (
    <div 
      style={boxStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>
        <h2 style={{ marginBottom: "8px", color: "#2c3e50" }}>{item.itemname}</h2>
        <p style={{ color: "#34495e", lineHeight: "1.5" }}>{item.itemdescription}</p>
        <div style={{ 
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "20px",
          backgroundColor: "#ffebee",
          color: "#c62828",
          fontWeight: "500",
          margin: "8px 0",
          fontSize: "0.8rem"
        }}>
          LOST ITEM
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
        style={btnStyle}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Offer Help"}
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
                color: "#666",
                padding: "4px",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ":hover": {
                  backgroundColor: "#f5f5f5"
                }
              }}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <h2 style={{ marginBottom: "1.5rem", color: "#2c3e50" }}>
              Help Reunite This Item
            </h2>
            
            <form onSubmit={handleSubmitHelp}>
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
                  disabled={isSubmitting}
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
                  pattern="\d{10}"
                  disabled={isSubmitting}
                />
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
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
                  disabled={isSubmitting}
                />
              </div>

              <button 
                type="submit"
                style={{
                  ...btnStyle,
                  backgroundColor: isSubmitting ? "#95a5a6" : "#0074D9",
                  width: "100%"
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Help Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LostItems;