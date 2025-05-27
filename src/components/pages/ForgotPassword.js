import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendApi } from "../../config";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendApi}/auth/forgot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.token) {
      navigate(`/reset-password/${data.token}`);
    } else {
      setMsg(data.message || "No token received");
    }
  };

  return (
    <div className="forgot-container">
      <h2 className="forgot-title">Forgot Password</h2>
      <form className="forgot-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="forgot-input"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="forgot-button" type="submit">
          Send Reset Link
        </button>
        {msg && <p className="forgot-msg">{msg}</p>}
      </form>
    </div>
  );
}
