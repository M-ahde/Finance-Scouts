import { useEffect, useRef } from "react";
import { FiAlertTriangle, FiX, FiTrash2 } from "react-icons/fi";

/**
 * Styled delete confirmation modal.
 * Props:
 *   open       boolean
 *   onClose    () => void
 *   onConfirm  () => void
 *   title      string   – name of the item being deleted
 *   loading    boolean  – show spinner on confirm button
 */
export default function DeleteConfirmModal({ open, onClose, onConfirm, title, loading }) {
  const confirmRef = useRef(null);

  // Trap focus + close on Escape
  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, zIndex: 9998,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)",
          animation: "fadeIn 0.15s ease",
        }}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        style={{
          position: "fixed", inset: 0, zIndex: 9999,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: 16,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 20,
            padding: "32px 28px 24px",
            width: "100%",
            maxWidth: 420,
            boxShadow: "0 24px 80px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.08)",
            pointerEvents: "all",
            animation: "popIn 0.2s cubic-bezier(0.175,0.885,0.32,1.275)",
          }}
        >
          {/* Close X */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 14, right: 14,
              width: 30, height: 30, borderRadius: "50%",
              border: "none", background: "#f1f5f9",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#64748b", transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e2e8f0"}
            onMouseLeave={e => e.currentTarget.style.background = "#f1f5f9"}
          >
            <FiX size={15} />
          </button>

          {/* Icon */}
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "#fef2f2", display: "flex",
            alignItems: "center", justifyContent: "center", marginBottom: 20,
          }}>
            <FiAlertTriangle size={26} color="#ef4444" />
          </div>

          {/* Text */}
          <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 8px" }}>
            Delete this item?
          </h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6, margin: "0 0 24px" }}>
            You are about to permanently delete{" "}
            <strong style={{ color: "#0f172a" }}>"{title}"</strong>.
            This action <strong style={{ color: "#ef4444" }}>cannot be undone</strong>.
          </p>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <button
              onClick={onClose}
              disabled={loading}
              style={{
                padding: "9px 20px", borderRadius: 10, border: "1.5px solid #e2e8f0",
                background: "#fff", color: "#374151", fontSize: 14, fontWeight: 500,
                cursor: "pointer", transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8fafc"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              Cancel
            </button>

            <button
              ref={confirmRef}
              onClick={onConfirm}
              disabled={loading}
              style={{
                padding: "9px 20px", borderRadius: 10, border: "none",
                background: loading ? "#fca5a5" : "#ef4444",
                color: "#fff", fontSize: 14, fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", gap: 8,
                transition: "background 0.15s, transform 0.1s",
                transform: "none",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.background = "#dc2626"; }}
              onMouseLeave={e => { if (!loading) e.currentTarget.style.background = "#ef4444"; }}
            >
              {loading ? (
                <>
                  <span style={{
                    width: 14, height: 14, border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    animation: "spin 0.7s linear infinite", display: "inline-block",
                  }} />
                  Deleting...
                </>
              ) : (
                <>
                  <FiTrash2 size={14} />
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn  {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}
