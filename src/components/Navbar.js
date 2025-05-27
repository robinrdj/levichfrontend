import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { backendApi } from "../config";

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  const handleLogout = () => {
    navigate("/login");
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      setUser(null);
    } catch (error) {
      alert("Logout failed: " + error.message);
    }
  };

  const becomeAdmin = async () => {
    setLoadingAdmin(true);
    try {
      const res = await fetch(`${backendApi}/auth/permissions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          permissions: ["read", "write", "delete", "deleteAny"],
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update permissions.");
      }

      const updatedUser = {
        ...user,
        permissions: ["read", "write", "delete", "deleteAny"],
      };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      alert("Error making admin request: " + error.message);
    } finally {
      setLoadingAdmin(false);
    }
  };

  return (
    <nav>
      <Link to="/">Comments</Link>

      {!user && (
        <>
          <button onClick={() => navigate("/signup")}>Login/SignUp</button>
        </>
      )}

      {user && (
        <>
          <span style={{ color: "white", fontSize: "14px" }}>
            Logged in as{" "}
            <strong>{user.name || user.email || `regular ${user.role}`}</strong>
          </span>
          <button onClick={handleLogout}>Logout</button>
          {user.permissions.includes("write") &&
            !user.permissions.includes("deleteAny") && (
              <button onClick={becomeAdmin} disabled={loadingAdmin}>
                {loadingAdmin ? "Becoming admin..." : "Become Admin"}
              </button>
            )}
        </>
      )}
    </nav>
  );
}
