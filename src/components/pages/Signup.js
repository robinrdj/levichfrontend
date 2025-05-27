import React, { useState } from "react";
import axios from "axios";
import { backendApi } from "../../config";
import "./Signup.css";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await axios.post(`${backendApi}/auth/signup`, { name, email, password });
      window.location.href = "/login";
    } catch (err) {
      alert("Signup failed. Please try again.");
      console.error(err);
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
      <button className="signup-button" onClick={handleSignup}>
        Signup
      </button>
      <p style={{ color: "white" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
}
