import { useState } from "react";
import axios from "axios";
import { FiX, FiUser, FiMail, FiPhone, FiHash, FiAlertCircle } from "react-icons/fi";
import InviteCard from "./InviteCard.jsx";

export default function EventRegisterModal({ open, onClose, event }) {
  const INIT = { name: "", email: "", phone: "", universityId: "", notes: "" };
  const [form, setForm]       = useState(INIT);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [serverErr, setServerErr] = useState("");
  const [registered, setRegistered] = useState(null); // holds form data on success

  const set = (k) => (e) => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors(p => ({ ...p, [k]: "" }));
    if (serverErr) setServerErr("");
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Full name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.universityId.trim()) e.universityId = "University ID is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setServerErr("");
    if (!validate()) return;
    setLoading(true);
    try {
      await axios.post(`/api/v1/events/${event._id}/register`, form);
      setRegistered({ ...form }); // save copy for invite card
    } catch (err) {
      setServerErr(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm(INIT);
    setErrors({});
    setRegistered(null);
    setServerErr("");
    onClose();
  };

  if (!open) return null;

  // ── Show invite card after success ─────────────────────────────
  if (registered) {
    return (
      <InviteCard
        event={event}
        registration={registered}
        onClose={handleClose}
      />
    );
  }

  // ── Form ────────────────────────────────────────────────────────
  const inp = (hasErr) => ({
    width: "100%", padding: "10px 12px 10px 38px",
    border: `1.5px solid ${hasErr ? "#ef4444" : "#334155"}`,
    borderRadius: 10, fontSize: 14, outline: "none",
    background: "#1e293b", color: "#f1f5f9",
    boxSizing: "border-box", transition: "border-color 0.2s",
  });
  const icon = {
    position: "absolute", left: 11, top: "50%",
    transform: "translateY(-50%)", color: "#475569",
    pointerEvents: "none", fontSize: 15,
  };

  return (
    <>
      <div onClick={handleClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", animation: "fadeIn 0.15s ease" }} />

      <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, pointerEvents: "none" }}>
        <div style={{ background: "#0f172a", border: "1px solid #1e293b", borderRadius: 20, width: "100%", maxWidth: 460, pointerEvents: "all", overflow: "hidden", animation: "popIn 0.22s cubic-bezier(0.175,0.885,0.32,1.275)", boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>

          {/* Header */}
          <div style={{ padding: "22px 24px 18px", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc", margin: "0 0 4px" }}>Register for Event</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{event.title}</p>
            </div>
            <button onClick={handleClose} style={{ width: 30, height: 30, borderRadius: "50%", border: "none", background: "#1e293b", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#64748b", flexShrink: 0, marginLeft: 12, marginTop: 2 }}>
              <FiX size={15} />
            </button>
          </div>

          <div style={{ padding: "20px 24px 24px", maxHeight: "72vh", overflowY: "auto" }}>
            {serverErr && (
              <div style={{ display: "flex", alignItems: "center", gap: 8, background: "hsl(0 84% 60% / 0.1)", border: "1px solid hsl(0 84% 60% / 0.3)", borderRadius: 10, padding: "10px 14px", marginBottom: 16, color: "#f87171", fontSize: 13 }}>
                <FiAlertCircle size={15} />{serverErr}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                {/* Full Name */}
                <Field label="Full Name" required error={errors.name}>
                  <div style={{ position: "relative" }}>
                    <FiUser style={icon} />
                    <input style={inp(!!errors.name)} value={form.name} onChange={set("name")} placeholder="Your full name" autoComplete="name" />
                  </div>
                </Field>

                {/* Email */}
                <Field label="Email Address" required error={errors.email}>
                  <div style={{ position: "relative" }}>
                    <FiMail style={icon} />
                    <input style={inp(!!errors.email)} value={form.email} onChange={set("email")} placeholder="you@example.com" type="email" autoComplete="email" />
                  </div>
                </Field>

                {/* Phone + University ID — side by side */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Phone" required error={errors.phone}>
                    <div style={{ position: "relative" }}>
                      <FiPhone style={icon} />
                      <input style={inp(!!errors.phone)} value={form.phone} onChange={set("phone")} placeholder="05xxxxxxxx" />
                    </div>
                  </Field>
                  <Field label="University ID" required error={errors.universityId}>
                    <div style={{ position: "relative" }}>
                      <FiHash style={icon} />
                      <input style={inp(!!errors.universityId)} value={form.universityId} onChange={set("universityId")} placeholder="2xxxxxxxxx" />
                    </div>
                  </Field>
                </div>

                {/* Notes */}
                <Field label="Notes (optional)">
                  <textarea
                    value={form.notes} onChange={set("notes")}
                    placeholder="Any questions or special requirements?"
                    rows={2}
                    style={{ ...inp(false), padding: "10px 12px", resize: "vertical", minHeight: 60 }}
                  />
                </Field>
              </div>

              <button
                type="submit" disabled={loading}
                style={{ width: "100%", marginTop: 20, padding: "12px", borderRadius: 10, border: "none", background: loading ? "hsl(160 84% 30%)" : "hsl(160 84% 39%)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 0.2s" }}
              >
                {loading ? (
                  <><Spinner /> Registering...</>
                ) : "Confirm Registration →"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes popIn  { from{opacity:0;transform:scale(0.9) translateY(16px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes spin   { to{transform:rotate(360deg)} }
      `}</style>
    </>
  );
}

function Spinner() {
  return <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.7s linear infinite", display: "inline-block" }} />;
}

function Field({ label, required, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <label style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}{required && <span style={{ color: "#f87171", marginLeft: 2 }}>*</span>}
      </label>
      {children}
      {error && (
        <p style={{ fontSize: 12, color: "#f87171", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
          <FiAlertCircle size={11} />{error}
        </p>
      )}
    </div>
  );
}
