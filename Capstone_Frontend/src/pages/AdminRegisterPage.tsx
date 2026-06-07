import { useState } from "react";
import { Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import "../App.css";

const AdminRegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    try {
      await apiClient.post(
        "/auth/register",
        {
          name,
          email,
          password,
        }
      );

      setIsRegistered(true);
    } catch (error) {
      console.error("Registration failed:", error);

      setError(
        "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsRegistered(false);
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <p>ADMIN PORTAL</p>

          <h1>Create Account</h1>

          <span>
            Register to manage inquiries,
            projects, and tasks.
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Full Name
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
            />
          </label>

          <label htmlFor="email">
            Email Address
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </label>

          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
            />
          </label>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
          >
            {isLoading
              ? "REGISTERING..."
              : "REGISTER →"}
          </button>

          <p className="register-link-text">
            Already have an account?{" "}
            <Link to="/auth/login" className="register-link">
              Sign in
            </Link>
          </p>
        </form>
      </div>

      {isRegistered && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Account Created</h2>
            <p>
              Thank you for registering. Your account was created successfully.
              Please sign in to access the admin dashboard.
            </p>

            <div className="modal-actions">
              <Link to="/auth/login">
                <button className="success-button">Sign In Now →</button>
              </Link>

              <button
                className="success-button secondary"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminRegisterPage;
