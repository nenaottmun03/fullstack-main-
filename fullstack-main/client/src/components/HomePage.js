import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import config from "./config";
import { useSelector } from "react-redux";
import { selectUser } from "../utils/userSlice";

const Base_URL = config.baseURL;

const HomePage = () => {
  const user = useSelector(selectUser);
  const [userDetails, setUserDetails] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        if (!authToken) {
          console.error("No authentication token found");
          return;
        }

        const decodedToken = decodeJwtToken(authToken);
        const userId = decodedToken.sub;

        const response = await axios.get(`${Base_URL}/fetchuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
            withCredentials: true,
          },
        });

        setUserDetails(response);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const decodeJwtToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding JWT token:", error);
      return null;
    }
  };

  const containerStyle = {
    textAlign: "center",
    marginTop: "15rem",
  };

  const headingStyle = {
    fontSize: "24px",
    fontWeight: "bold",
  };

  const paragraphStyle = {
    fontSize: "16px",
  };

  const buttonStyle = {
    backgroundColor: isHovered ? "#0056b3" : "#0074D9",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <h1 style={headingStyle}>
          Welcome to the Lost and Found Tracking System
        </h1>
        {!user || !userDetails ? (
          <>
            <p style={paragraphStyle}>Please sign in to continue</p>
            <Link to="/sign-in">
              <button 
                className="sign-in-button" 
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Sign In
              </button>
            </Link>
          </>
        ) : (
          <>
            <p style={paragraphStyle}>
              Welcome{" "}
              <b>
                {userDetails.data.gotUser.username}-(
                {userDetails.data.gotUser.rollno})
              </b>
              , proceed to raising a concern
            </p>
            <Link to="/raise-a-concern">
              <button 
                className="sign-in-button" 
                style={buttonStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Raise
              </button>
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;