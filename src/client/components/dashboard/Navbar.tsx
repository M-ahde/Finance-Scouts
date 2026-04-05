import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import axios from "axios";

interface NavbarProps {
  toggleSidebar: () => void;
  toggleMobile: () => void;
  user?: { name?: string; email?: string } | null;
}

const Navbar = ({ toggleSidebar, toggleMobile, user }: NavbarProps) => {
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axios.post("/api/v1/auth/logout", {}, { withCredentials: true });
    } finally {
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        height: "60px",
        background: "#1e293b",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        color: "white",
      }}
    >
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <FaBars
          className="block md:hidden"
          style={{ cursor: "pointer" }}
          onClick={toggleMobile}
        />
        <FaBars
          className="hidden md:block"
          style={{ cursor: "pointer" }}
          onClick={toggleSidebar}
        />
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 600 }}>Dashboard</h3>

      <button
        onClick={handleLogout}
        disabled={loggingOut}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          background: "transparent",
          border: "1px solid #334155",
          color: "#94a3b8",
          borderRadius: 8,
          padding: "6px 12px",
          fontSize: 13,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#fff";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#64748b";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "#334155";
        }}
      >
        <FaSignOutAlt />
        {loggingOut ? "..." : "Logout"}
      </button>
    </div>
  );
};

export default Navbar;
