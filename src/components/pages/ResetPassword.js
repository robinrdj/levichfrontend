import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { backendApi } from "../../config";
import "./ResetPassword.css";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${backendApi}/auth/reset/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    setMsg(data.message);
  };

  return (
    <div className="reset-container">
      <h2 className="reset-title">Reset Password</h2>
      <form className="reset-form" onSubmit={handleSubmit}>
        <label style={{ color: "white" }}>
          Below is the token received from backend and to be sent for reseting password(non-editable)
        </label>
        <input className="reset-input" type="text" value={token} readOnly />
        <input
          className="reset-input"
          type="password"
          placeholder="New Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="reset-button" type="submit">
          Reset
        </button>
        {msg && <p className="reset-message">{msg}</p>}
        <p className="reset-link">
          <Link to="/login">Want to login?</Link>
        </p>
      </form>
    </div>
  );
}
