import React, { useState } from "react";
import axios from "axios";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const DisplayPersonalItems = (props) => {
  const { item } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Card container styles
  const containerStyle = {
    border: "1px solid #e0e0e0",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: isHovered ? 
      "0 8px 16px rgba(0, 0, 0, 0.1)" : 
      "0 2px 8px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "#ffffff",
    transform: isHovered ? "translateY(-4px)" : "none",
    cursor: "pointer",
    maxWidth: "400px",
    margin: "16px",
    flex: "1 1 300px",
  };

  // Content styles
  const contentStyle = {
    marginBottom: "16px",
  };

  const titleStyle = {
    fontSize: "1.25rem",
    fontWeight: "600",
    marginBottom: "12px",
    color: "#2c3e50",
    lineHeight: "1.3",
  };

  const textStyle = {
    fontSize: "0.9rem",
    margin: "8px 0",
    color: "#4a5568",
    lineHeight: "1.5",
  };

  // Image grid styles
  const imageContainerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "12px",
    margin: "16px 0",
  };

  const imageStyle = {
    width: "100%",
    height: "160px",
    borderRadius: "8px",
    objectFit: "cover",
    transition: "transform 0.3s ease",
    cursor: "zoom-in",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
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
    letterSpacing: "0.5px",
  };

  // Button styles
  const buttonStyle = {
    backgroundColor: "#0074D9",
    color: "white",
    padding: "12px 24px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "500",
    fontSize: "0.9rem",
    width: "100%",
    marginTop: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    ":hover": {
      backgroundColor: "#0056b3",
      transform: "scale(1.02)",
    },
  };

  const handleResolve = async (_id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${Base_URL}/item/${_id}`, { withCredentials: true });
      alert("Item marked as resolved successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={contentStyle}>
        <h2 style={titleStyle}>{item.itemname}</h2>
        <p style={textStyle}>{item.itemdescription}</p>
        <div style={statusStyle}>
          {item.concerntype}
        </div>
      </div>

      {item.images?.length > 0 && (
        <div style={imageContainerStyle}>
          {item.images.map((image, index) => (
            <img 
              key={index} 
              src={image} 
              alt={`Item ${index + 1}`} 
              style={imageStyle}
              onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
            />
          ))}
        </div>
      )}

      {isLoading ? (
        <Spinner />
      ) : (
        <button 
          onClick={() => handleResolve(item._id)}
          style={{
            ...buttonStyle,
            backgroundColor: isHovered ? "#0056b3" : "#0074D9",
          }}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Mark as Resolved"}
        </button>
      )}
    </div>
  );
};

export default DisplayPersonalItems;