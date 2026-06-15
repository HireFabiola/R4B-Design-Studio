import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import apiClient from "../api/apiClient";
import { useAuth } from "../hooks/useAuth";
import "../App.css";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await apiClient.post(
        "/auth/login",
        {
          email,
          password,
        }
      );

      login(
        response.data.user,
        response.data.token
      );

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed:", error);

      setError(
        "Invalid email or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <p>ADMIN PORTAL</p>

          <h1>Welcome Back</h1>

          <span>
            Sign in to manage inquiries,
            projects, and tasks.
          </span>
        </div>

        <form onSubmit={handleSubmit}>
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
              ? "SIGNING IN..."
              : "SIGN IN →"}
          </button>

          <p className="register-link-text">
            New user? Please{" "}
            <Link to="/auth/register" className="register-link">
              register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
};

export default AdminLoginPage;
