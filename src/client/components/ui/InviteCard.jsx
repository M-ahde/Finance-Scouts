import { useRef } from "react";
import { FiCalendar, FiMapPin, FiClock, FiDownload, FiPrinter } from "react-icons/fi";

/**
 * Invite / ticket card shown after successful event registration.
 * Props: event, registration { name, email }, onClose
 */
export default function InviteCard({ event, registration, onClose }) {
  const cardRef = useRef(null);
  const eventDate = new Date(event.date);

  const handlePrint = () => {
    const content = cardRef.current?.innerHTML;
    const win = window.open("", "_blank");
    win.document.write(`
      <!DOCTYPE html><html><head>
        <meta charset="utf-8"/>
        <title>Invite — ${event.title}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet"/>
        <style>
          * { margin:0; padding:0; box-sizing:border-box; }
          body { background:#fff; display:flex; align-items:center; justify-content:center; min-height:100vh; font-family:'Inter',sans-serif; }
          @media print { body { background:#fff; } }
        </style>
      </head><body>${content}</body></html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 400);
  };

  const regId = `FS-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <>
      {/* Backdrop */}
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }} />

      <div style={{ position: "fixed", inset: 0, zIndex: 10001, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, gap: 16 }}>

        {/* ── Ticket card ── */}
        <div ref={cardRef} style={{
          width: "100%", maxWidth: 560,
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          borderRadius: 20, overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
          fontFamily: "'Inter', sans-serif",
          animation: "ticketIn 0.35s cubic-bezier(0.175,0.885,0.32,1.275)",
        }}>

          {/* Top accent strip */}
          <div style={{ height: 6, background: "linear-gradient(90deg, hsl(160 84% 39%), #38bdf8, hsl(213 56% 45%))" }} />

          {/* Header */}
          <div style={{ padding: "24px 28px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src="/logos/1-1.webp" alt="Finance Scouts" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid hsl(160 84% 39% / 0.6)" }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "#f8fafc" }}>Finance Scouts</div>
                <div style={{ fontSize: 11, color: "#64748b" }}>Official Invitation</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>Ref. No.</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontWeight: 700, color: "hsl(160 84% 39%)", fontSize: 13, letterSpacing: "0.05em" }}>{regId}</div>
            </div>
          </div>

          {/* Main body */}
          <div style={{ padding: "28px 28px 0" }}>
            {/* Confirmed badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "hsl(160 84% 39% / 0.12)", border: "1px solid hsl(160 84% 39% / 0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 12, color: "hsl(160 84% 39%)", fontWeight: 600, marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "hsl(160 84% 39%)", display: "inline-block" }} />
              Registration Confirmed
            </div>

            <h2 style={{ fontSize: "clamp(18px,4vw,26px)", fontWeight: 900, color: "#f8fafc", lineHeight: 1.2, margin: "0 0 20px" }}>
              {event.title}
            </h2>

            {/* Details grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Detail icon={<FiCalendar />} label="Date" value={eventDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} />
              <Detail icon={<FiClock />} label="Time" value={eventDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} />
              {event.location && <Detail icon={<FiMapPin />} label="Venue" value={event.location} span />}
            </div>

            {/* Divider — perforated */}
            <div style={{ margin: "0 -28px", position: "relative", height: 1, display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, borderTop: "1px dashed rgba(255,255,255,0.12)" }} />
              {/* Left hole */}
              <div style={{ position: "absolute", left: -12, width: 24, height: 24, borderRadius: "50%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.06)" }} />
              {/* Right hole */}
              <div style={{ position: "absolute", right: -12, width: 24, height: 24, borderRadius: "50%", background: "#0f172a", border: "1px solid rgba(255,255,255,0.06)" }} />
            </div>

            {/* Attendee section */}
            <div style={{ padding: "20px 0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Attendee</div>
                <div style={{ fontWeight: 700, fontSize: 20, color: "#f8fafc", marginBottom: 4 }}>{registration.name}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>{registration.email}</div>
                {registration.phone && <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{registration.phone}</div>}
                {registration.universityId && (
                  <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.2)", borderRadius: 8, padding: "3px 10px", fontSize: 12, color: "#38bdf8" }}>
                    ID: {registration.universityId}
                  </div>
                )}
              </div>

              {/* QR placeholder */}
              <div style={{ width: 80, height: 80, background: "#f8fafc", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0, gap: 4 }}>
                <QRPlaceholder />
                <div style={{ fontSize: 8, color: "#64748b", fontFamily: "monospace" }}>{regId}</div>
              </div>
            </div>
          </div>

          {/* Bottom strip */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "12px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: "#475569" }}>
              This invite is non-transferable and for personal use only.
            </span>
            <span style={{ fontSize: 11, color: "hsl(160 84% 39%)", fontWeight: 600 }}>
              Finance Scouts © {new Date().getFullYear()}
            </span>
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handlePrint}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: "#f8fafc", fontSize: 13, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(4px)" }}
          >
            <FiPrinter size={14} /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 20px", borderRadius: 10, border: "none", background: "hsl(160 84% 39%)", color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            Done
          </button>
        </div>
      </div>

      <style>{`
        @keyframes ticketIn {
          from { opacity:0; transform: scale(0.85) translateY(30px); }
          to   { opacity:1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </>
  );
}

function Detail({ icon, label, value, span }) {
  return (
    <div style={{ gridColumn: span ? "1 / -1" : "auto" }}>
      <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4, display: "flex", alignItems: "center", gap: 4 }}>
        <span style={{ color: "#38bdf8" }}>{icon}</span> {label}
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, color: "#e2e8f0", lineHeight: 1.4 }}>{value}</div>
    </div>
  );
}

// Minimal QR-looking grid placeholder
function QRPlaceholder() {
  const bits = Array.from({ length: 49 }, (_, i) => (Math.sin(i * 7.3 + 1.1) > 0.1 ? 1 : 0));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 1, width: 56, height: 56 }}>
      {bits.map((b, i) => (
        <div key={i} style={{ background: b ? "#0f172a" : "transparent", borderRadius: 1 }} />
      ))}
    </div>
  );
}
