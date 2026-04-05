import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Field-level errors
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const errs = { email: "", password: "" };
    let valid = true;

    if (!email) {
      errs.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Enter a valid email address";
      valid = false;
    }

    if (!password) {
      errs.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      errs.password = "Password must be at least 6 characters";
      valid = false;
    }

    setFieldErrors(errs);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(
        "/api/v1/auth/login",
        { email, password },
        { withCredentials: true }
      );
      navigate("/dashboard");
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* ── Left brand panel ── */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <img src="/logos/1-1.webp" alt="Finance Scouts" className="auth-logo" />
          <h1 className="auth-brand-title">Finance Scouts</h1>
          <p className="auth-brand-sub">College of Business Administration</p>
          <p className="auth-brand-desc">
            Empowering students with financial knowledge and practical skills for a
            successful future.
          </p>
          <div className="auth-brand-dots">
            <span className="dot dot-active" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="auth-form-side">
        <div className="auth-card">
          {/* Header */}
          <div className="auth-card-header">
            <div className="auth-card-icon">
              <FiLock size={22} />
            </div>
            <h2 className="auth-card-title">Welcome back</h2>
            <p className="auth-card-sub">Sign in to access the dashboard</p>
          </div>

          {/* General error banner */}
          {error && (
            <div className="auth-error-banner">
              <FiAlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Email */}
            <div className="auth-field">
              <label className="auth-label">Email address</label>
              <div className={`auth-input-wrap ${fieldErrors.email ? "input-error" : ""}`}>
                <FiMail className="input-icon" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (fieldErrors.email) setFieldErrors((p) => ({ ...p, email: "" }));
                  }}
                  className="auth-input"
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && (
                <p className="auth-field-error">
                  <FiAlertCircle size={12} /> {fieldErrors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <label className="auth-label">Password</label>
              <div className={`auth-input-wrap ${fieldErrors.password ? "input-error" : ""}`}>
                <FiLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: "" }));
                  }}
                  className="auth-input"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="auth-field-error">
                  <FiAlertCircle size={12} /> {fieldErrors.password}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`auth-submit ${loading ? "auth-submit-loading" : ""}`}
            >
              {loading ? (
                <>
                  <span className="spinner" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
