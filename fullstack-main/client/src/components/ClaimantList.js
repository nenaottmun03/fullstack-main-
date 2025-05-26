import React, { useState, useEffect } from "react";
import axios from "axios";
import DisplayCardClaimer from "./DisplayCardClaimer";
import Navbar from "./Navbar";
import config from "./config";
import Spinner from "./Spinner";

const Base_URL = config.baseURL;

const ClaimantList = () => {
  const [claimants, setClaimants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState(null);

  useEffect(() => {
    fetchClaimants();
  }, []);

  const fetchClaimants = async () => {
    try {
      const res = await axios.get(`${Base_URL}/claimant`);
      setClaimants(res.data.gotClaimant);
    } catch (error) {
      console.error("Error fetching claimants:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyClaim = async (claimantId) => {
    try {
      setVerifyingId(claimantId);
      await axios.patch(`${Base_URL}/claimant/${claimantId}`, {
        verified: true
      });
      
      setClaimants(prev => prev.map(claimant => 
        claimant._id === claimantId ? { ...claimant, verified: true } : claimant
      ));
      
      alert("Claim successfully verified!");
    } catch (error) {
      console.error("Verification failed:", error);
      alert("Error verifying claim");
    } finally {
      setVerifyingId(null);
    }
  };

  // Container styles
  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  };

  // Header styles
  const headerStyle = {
    textAlign: "center",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    color: "#616161",
    fontSize: "1.1rem",
    maxWidth: "600px",
    margin: "0 auto",
  };

  // Grid layout
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "1.5rem",
    padding: "1rem 0",
  };

  // Empty state styles
  const emptyStateStyle = {
    textAlign: "center",
    padding: "2rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "12px",
    marginTop: "2rem",
  };

  const emptyTextStyle = {
    color: "#6c757d",
    fontSize: "1.1rem",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Claimant Records</h1>
          <p style={subtitleStyle}>
            Manage and verify item claim requests
          </p>
        </div>

        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            <Spinner />
          </div>
        ) : claimants.length === 0 ? (
          <div style={emptyStateStyle}>
            <p style={emptyTextStyle}>No claim requests found</p>
          </div>
        ) : (
          <div style={gridStyle}>
            {claimants.map((claimant, index) => (
              <DisplayCardClaimer
                key={claimant._id}
                claimant={claimant}
                number={index + 1}
                onVerify={handleVerifyClaim}
                isVerifying={verifyingId === claimant._id}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ClaimantList;