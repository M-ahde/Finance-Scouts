import { FaBars } from "react-icons/fa";

const Navbar = ({ toggleSidebar, toggleMobile }) => {
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
        {/* Always visible on mobile */}
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
        {/* Collapse only useful on desktop */}
   
      </div>

      <h3>Dashboard</h3>

      <div></div>
    </div>
  );
};

export default Navbar;
