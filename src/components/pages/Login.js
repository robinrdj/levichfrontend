import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import { backendApi } from "../../config";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const handleLogin = async () => {
    setError("");
    setLoading(true); // Start loading
    try {
      const res = await axios.post(
        `${backendApi}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const { accessToken } = res.data;
      const decoded = jwtDecode(accessToken);

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(decoded));

      setUser(decoded);
      navigate("/comments");
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <div className="login-form">
        <input
          className="login-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="login-button"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="login-error">{error}</p>}
      </div>
      <p style={{ color: "white" }}>
        Don't have an account? <Link to="/signup">Signup here</Link>
      </p>
      <p style={{ color: "white" }}>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </div>
  );
};

export default Login;
