import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendApi } from "../../config";
import "./Comments.css";

export default function Comments({ user }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const fetchComments = async () => {
    try {
      const res = await axios.get(`${backendApi}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
      alert("Failed to fetch comments.");
    }
  };

  const handlePost = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Please log in to post a comment.");
      alert("Please log in to post a comment.");
      return;
    }

    if (!text.trim()) return;

    try {
      alert(`${backendApi}/comments`);
      await axios.post(
        `${backendApi}/comments`,
        { text },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setText("");
      setError("");
      fetchComments();
    } catch (err) {
      console.error("Error posting comment:", err);
      setError("Failed to post comment.");
      alert("Failed to post comment.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendApi}/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      fetchComments();
    } catch (err) {
      console.error("Error deleting comment:", err);
      alert("Failed to delete comment.");
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="comments-container">
      <h2 className="comments-title">Comments</h2>

      <div className="comments-form">
        <input
          className="comments-input"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className="comments-post-button" onClick={handlePost}>
          Post
        </button>
      </div>

      {error && <p className="comments-error">{error}</p>}

      <ul className="comments-list">
        {comments.map((c) => (
          <li key={c._id} className="comment-item">
            <span className="comment-text">{c.text}</span>
            <span className="comment-user">
              — {c.userId?.name || "Unknown"}
            </span>
            {user && user.permissions.includes("deleteAny") && (
              <button
                className="comment-delete-button"
                onClick={() => handleDelete(c._id)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
