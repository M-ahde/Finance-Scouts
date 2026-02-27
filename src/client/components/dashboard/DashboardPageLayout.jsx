import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import AppSidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const location = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    setToggled(false);
  }, [location.pathname]);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setToggled(!toggled);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AppSidebar
        collapsed={collapsed}
        toggled={toggled}
        setToggled={setToggled}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "all 0.3s ease",
          overflow: "hidden",
        }}
      >
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleMobile={toggleMobile}
        />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f1f5f9",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;