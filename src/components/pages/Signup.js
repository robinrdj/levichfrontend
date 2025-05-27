import React, { useState } from "react";
import axios from "axios";
import { backendApi } from "../../config";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  const handleSignup = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${backendApi}/auth/signup`, { name, email, password });
      window.location.href = "/login";
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Create an Account</h2>
      <input
        className="signup-input"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className="signup-input"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="signup-input"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        className="signup-button"
        onClick={handleSignup}
        disabled={loading}
      >
        {loading ? "Signing up..." : "Signup"}
      </button>
      {error && <p className="signup-error">{error}</p>}
      <p style={{ color: "white" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
