import React, { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import config from "./config";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";
import Spinner from "./Spinner";
import { FiMail, FiLock, FiArrowRight } from "react-icons/fi";

const Base_URL = config.baseURL;

function Signin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleNavigateToSignUp = () => {
    navigate("/sign-up");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please fill in all fields");
      return;
    }
    setLoading(true);

    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(`${Base_URL}/login`, data, {
        withCredentials: true,
      });

      const token = res.data.token;
      localStorage.setItem("authToken", token);
      dispatch(login({ email: email, password: password }));
      
      navigate("/home");
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage(
        error.response?.data?.message || "Wrong credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="signin-container">
        <div className="auth-card">
          <div className="card-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue to your account</p>
          </div>

          <form onSubmit={handleSignIn} className="auth-form">
            <div className="input-group">
              <FiMail className="input-icon" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
                required
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
            </div>

            <div className="input-group">
              <FiLock className="input-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
            </div>

            {errorMessage && (
              <div className="error-message">
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              type="submit"
              className="auth-btn primary"
              disabled={loading}
            >
              {loading ? (
                <Spinner size="small" />
              ) : (
                <>
                  Sign In
                  <FiArrowRight className="btn-icon" />
                </>
              )}
            </button>
          </form>

          <div className="auth-footer">
            <span className="divider">OR</span>
            <button
              className="auth-btn secondary"
              onClick={handleNavigateToSignUp}
            >
              Create New Account
            </button>
            <a href="/forgot-password" className="forgot-password">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
