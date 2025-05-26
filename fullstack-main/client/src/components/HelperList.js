import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCardHelper from "./DisplayCardHelper";
import Navbar from "./Navbar";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const HelperList = () => {
  const [helpers, setHelpers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHelpers();
  }, []);

  const fetchHelpers = async () => {
    try {
      const res = await axios.get(`${Base_URL}/helper`);
      setHelpers(res.data.gotHelper);
    } catch (error) {
      console.error("Error fetching helpers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "24px 16px",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "40px",
    padding: "16px 0",
    position: "sticky",
    top: 0,
    backgroundColor: "white",
    zIndex: 100,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: 700,
    color: "#1a237e",
    margin: 0,
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "32px",
    padding: "16px 0",
  };

  const emptyStateStyle = {
    textAlign: "center",
    padding: "40px",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginTop: "24px"
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            Helpers List
          </h1>
        </div>

        {isLoading ? (
          <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            padding: "40px",
            minHeight: "300px" 
          }}>
            <Spinner />
          </div>
        ) : helpers.length === 0 ? (
          <div style={emptyStateStyle}>
            <p style={{ 
              color: "#6c757d", 
              fontSize: "1.1rem",
              fontWeight: 500
            }}>
              *No helpers found*
            </p>
          </div>
        ) : (
          <div style={gridStyle}>
            {helpers.map((helper, index) => (
              <DisplayCardHelper
                key={helper._id}
                helper={helper}
                number={index + 1}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(HelperList);