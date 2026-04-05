import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

export default function Register() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const validate = () => {
    const errs = { name: "", email: "", password: "", confirm: "" };
    let valid = true;

    if (!name.trim()) {
      errs.name = "Full name is required";
      valid = false;
    } else if (name.trim().length < 3) {
      errs.name = "Name must be at least 3 characters";
      valid = false;
    }

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
    } else if (password.length < 8) {
      errs.password = "Password must be at least 8 characters";
      valid = false;
    }

    if (!confirm) {
      errs.confirm = "Please confirm your password";
      valid = false;
    } else if (confirm !== password) {
      errs.confirm = "Passwords do not match";
      valid = false;
    }

    setFieldErrors(errs);
    return valid;
  };

  // Password strength
  const strength = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#3b82f6", "#10b981"][strength];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post("/api/v1/users/register", {
        name: name.trim(),
        email,
        password,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2500);
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-brand">
          <div className="auth-brand-inner">
            <img src="/logos/1-1.webp" alt="Finance Scouts" className="auth-logo" />
            <h1 className="auth-brand-title">Finance Scouts</h1>
            <p className="auth-brand-sub">College of Business Administration</p>
          </div>
        </div>
        <div className="auth-form-side">
          <div className="auth-card auth-success-card">
            <div className="auth-success-icon">
              <FiCheckCircle size={48} />
            </div>
            <h2 className="auth-card-title">Account Created!</h2>
            <p className="auth-card-sub">
              Your account has been created successfully. Redirecting to login...
            </p>
            <div className="auth-progress-bar">
              <div className="auth-progress-fill" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      {/* ── Left brand panel ── */}
      <div className="auth-brand">
        <div className="auth-brand-inner">
          <img src="/logos/1-1.webp" alt="Finance Scouts" className="auth-logo" />
          <h1 className="auth-brand-title">Finance Scouts</h1>
          <p className="auth-brand-sub">College of Business Administration</p>
          <p className="auth-brand-desc">
            Join our team and empower yourself with financial knowledge and leadership
            skills aligned with Saudi Vision 2030.
          </p>
          <div className="auth-brand-dots">
            <span className="dot" />
            <span className="dot dot-active" />
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
              <FiUser size={22} />
            </div>
            <h2 className="auth-card-title">Create account</h2>
            <p className="auth-card-sub">Fill in the details to get started</p>
          </div>

          {/* General error banner */}
          {error && (
            <div className="auth-error-banner">
              <FiAlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="auth-form">
            {/* Full Name */}
            <div className="auth-field">
              <label className="auth-label">Full name</label>
              <div className={`auth-input-wrap ${fieldErrors.name ? "input-error" : ""}`}>
                <FiUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (fieldErrors.name) setFieldErrors((p) => ({ ...p, name: "" }));
                  }}
                  className="auth-input"
                  autoComplete="name"
                />
              </div>
              {fieldErrors.name && (
                <p className="auth-field-error">
                  <FiAlertCircle size={12} /> {fieldErrors.name}
                </p>
              )}
            </div>

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
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (fieldErrors.password) setFieldErrors((p) => ({ ...p, password: "" }));
                  }}
                  className="auth-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {fieldErrors.password && (
                <p className="auth-field-error">
                  <FiAlertCircle size={12} /> {fieldErrors.password}
                </p>
              )}
              {/* Password strength meter */}
              {password && (
                <div className="strength-meter">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="strength-bar"
                        style={{
                          background: i <= strength ? strengthColor : "#e2e8f0",
                          transition: "background 0.3s",
                        }}
                      />
                    ))}
                  </div>
                  <span className="strength-label" style={{ color: strengthColor }}>
                    {strengthLabel}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="auth-field">
              <label className="auth-label">Confirm password</label>
              <div className={`auth-input-wrap ${fieldErrors.confirm ? "input-error" : ""}`}>
                <FiLock className="input-icon" />
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirm}
                  onChange={(e) => {
                    setConfirm(e.target.value);
                    if (fieldErrors.confirm) setFieldErrors((p) => ({ ...p, confirm: "" }));
                  }}
                  className="auth-input"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirm((v) => !v)}
                  tabIndex={-1}
                >
                  {showConfirm ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
              {fieldErrors.confirm && (
                <p className="auth-field-error">
                  <FiAlertCircle size={12} /> {fieldErrors.confirm}
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
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
