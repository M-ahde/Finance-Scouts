/**
 * Full-screen page transition loader.
 * Used as Suspense fallback + navigation overlay.
 */
export default function PageLoader({ message = "Loading..." }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#0f172a",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 24,
    }}>
      {/* Logo */}
      <div style={{ position: "relative" }}>
        <img
          src="/logos/1-1.webp"
          alt="Finance Scouts"
          style={{
            width: 72, height: 72, borderRadius: "50%",
            objectFit: "cover",
            animation: "pulse-logo 2s ease-in-out infinite",
          }}
        />
        {/* Spinning ring */}
        <div style={{
          position: "absolute", inset: -6,
          borderRadius: "50%",
          border: "3px solid transparent",
          borderTopColor: "hsl(160 84% 39%)",
          borderRightColor: "hsl(160 84% 39% / 0.3)",
          animation: "spin 1s linear infinite",
        }} />
      </div>

      {/* Brand name */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#f8fafc", letterSpacing: "-0.2px" }}>
          Finance Scouts
        </div>
        <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
          {message}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        height: 3, background: "#1e293b", overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, hsl(160 84% 39%), hsl(213 56% 45%))",
          animation: "loading-bar 1.4s ease-in-out infinite",
        }} />
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 0  0   hsl(160 84% 39% / 0.4); }
          50%       { transform: scale(1.04); box-shadow: 0 0 0 12px hsl(160 84% 39% / 0);   }
        }
        @keyframes loading-bar {
          0%   { width: 0%;   margin-left: 0;    }
          50%  { width: 60%;  margin-left: 20%;  }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
