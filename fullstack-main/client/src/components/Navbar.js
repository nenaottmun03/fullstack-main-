import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout, selectUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/home");
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.matchMedia("(max-width: 768px)").matches);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Styling variables
  const colors = {
    primary: "#1D4ED8",
    secondary: "#3B82F6",
    accent: "#F59E0B",
    hover: "#BFDBFE",
  };

  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
    color: "white",
    padding: "1rem 2rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    position: "relative",
    fontFamily: "'Poppins', sans-serif",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    letterSpacing: "-0.5px",
    textDecoration: "none",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  };

  const linkContainerStyle = {
    display: "flex",
    gap: "2rem",
    alignItems: "center",
    transition: "all 0.3s ease",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    transition: "all 0.2s ease",
    position: "relative",
    "&:hover": {
      background: colors.hover,
      color: colors.primary,
    },
  };

  const mobileMenuStyle = {
    position: "fixed",
    top: "64px",
    left: "0",
    right: "0",
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    transform: menuOpen ? "translateY(0)" : "translateY(-150%)",
    opacity: menuOpen ? "1" : "0",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: "50",
  };

  const mobileLinkStyle = {
    ...linkStyle,
    color: colors.primary,
    "&:hover": {
      background: colors.hover,
    },
  };

  return (
      <nav style={navbarStyle}>
        <Link to="/home" style={logoStyle}>
          <span>Lost&Found</span>
        </Link>
  
        {/* Desktop Navigation */}
        {!isSmallScreen && (
          <div style={linkContainerStyle}>
            {user ? (
              <>
                <Link to="/my-items" style={linkStyle}>My Items</Link>
                <Link to="/all-items" style={linkStyle}>Browse</Link>
                <Link to="/helpers" style={linkStyle}>Helpers</Link>
                <Link to="/raise-a-concern" style={linkStyle}>Help</Link>
                <Link to="/claimants" style={linkStyle}>Claims</Link>
                <button 
                  onClick={handleLogout}
                  style={{
                    ...linkStyle,
                    background: "#EF4444",
                    "&:hover": { background: "#DC2626" }
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-up" style={linkStyle}>Sign Up</Link>
                <Link to="/sign-in" style={linkStyle}>Login</Link>
              </>
            )}
          </div>
        )}
  
        {/* Mobile Menu */}
        {isSmallScreen && (
          <div style={mobileMenuStyle}>
            {user ? (
              <>
                <Link to="/my-items" style={mobileLinkStyle}>My Items</Link>
                <Link to="/all-items" style={mobileLinkStyle}>Browse Items</Link>
                <Link to="/helpers" style={mobileLinkStyle}>Helpers</Link>
                <Link to="/all-items/lost" style={mobileLinkStyle}>Lost Items</Link>
                <Link to="/all-items/found" style={mobileLinkStyle}>Found Items</Link>
                <Link to="/raise-a-concern" style={mobileLinkStyle}>Help Center</Link>
                <Link to="/claimants" style={mobileLinkStyle}>Claims</Link>
                <button
                  onClick={handleLogout}
                  style={{
                    ...mobileLinkStyle,
                    background: "#EF4444",
                    color: "white",
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/sign-up" style={mobileLinkStyle}>Create Account</Link>
                <Link to="/sign-in" style={mobileLinkStyle}>Sign In</Link>
              </>
            )}
          </div>
        )}
      </nav>
    );
  };
  export default Navbar;