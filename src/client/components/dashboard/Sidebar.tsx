import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTrophy,
  FaChalkboardTeacher,
  FaBook,
  FaPlus,
} from "react-icons/fa";

const pages = [
  {
    title: "Home",
    path: "/dashboard",
    icon: FaHome,
  },
  {
    title: "Workshops",
    path: "/dashboard/workshop",
    icon: FaChalkboardTeacher,
  },
  {
    title: "Achievements",
    path: "/dashboard/achievements",
    icon: FaTrophy,
  },
  {
    title: "Publications",
    path: "/dashboard/publications",

    icon: FaBook,
  
  },
];
const AppSidebar = ({ collapsed, toggled, setToggled }) => {
  const location = useLocation();

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      breakPoint="md"
      backgroundColor="#0f172a"
      rootStyles={{
        borderRight: "1px solid #1e293b",
        height: "100vh",
      }}
    >
      {/* 🔹 Top User Section */}
      <div
        style={{
          padding: collapsed ? "20px 10px" : "20px",
          borderBottom: "1px solid #1e293b",
          textAlign: collapsed ? "center" : "left",
        }}
      >
        <img
          src="/logos/1-1.webp"
          alt="Logo"
          style={{
            width: collapsed ? "100%" : "80%",
            borderRadius: "50%",
            objectFit: "initial",
            transition: "all 0.3s ease",
          }}
        />

        {!collapsed && (
          <>
            <h4 style={{ marginTop: "10px", color: "#fff" }}>
              Mahde Atia
            </h4>
            <p style={{ fontSize: "13px", color: "#94a3b8" }}>
              mhdexd6@gmail.com
            </p>
          </>
        )}
      </div>

      {/* 🔹 Menu Section */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Menu
          menuItemStyles={{
            button: ({ active }) => ({
              color: "#e2e8f0",
              backgroundColor: active ? "#1e293b" : "transparent",
              padding: "12px 20px",
              transition: "all 0.2s ease",
              borderRadius: "8px",
              margin: "4px 10px",
              "&:hover": {
                backgroundColor: "#1e293b",
              },
            }),
            icon: {
              color: "#38bdf8",
            },
          }}
        >
          {pages.map((page) => {
            const Icon = page.icon;

            return (
              <MenuItem
                key={page.path}
                icon={<Icon />}
                component={<Link to={page.path} />}
                active={location.pathname === page.path}
              >
                {page.title}
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;