import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";

import {
  FaHome,
  FaTrophy,
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaClipboardList,
  FaShieldAlt,
  FaCalendarAlt,
} from "react-icons/fa";

const allPages = [
  {
    title: "Home",
    path: "/dashboard",
    icon: FaHome,
    permission: "view_dashboard",
  },
  {
    title: "Workshops",
    path: "/dashboard/workshop",
    icon: FaChalkboardTeacher,
    permission: "view_dashboard",
  },
  {
    title: "Achievements",
    path: "/dashboard/achievements",
    icon: FaTrophy,
    permission: "view_dashboard",
  },
  {
    title: "Publications",
    path: "/dashboard/publications",
    icon: FaBook,
    permission: "view_dashboard",
  },
  {
    title: "Team",
    path: "/dashboard/team",
    icon: FaUsers,
    permission: "view_dashboard",
  },
  {
    title: "Events",
    path: "/dashboard/events",
    icon: FaCalendarAlt,
    permission: "manage_events",
  },
  {
    title: "Join Requests",
    path: "/dashboard/join-requests",
    icon: FaClipboardList,
    permission: "manage_join_requests",
  },
  {
    title: "User Permissions",
    path: "/dashboard/user-permissions",
    icon: FaShieldAlt,
    permission: "manage_users",
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  toggled: boolean;
  setToggled: (v: boolean) => void;
  user?: { name?: string; email?: string; permissions?: string[]; isSuperAdmin?: boolean } | null;
}

const AppSidebar = ({ collapsed, toggled, setToggled, user }: AppSidebarProps) => {
  const location = useLocation();

  const pages = allPages.filter((page) => {
    if (!user) return false;
    if (user.isSuperAdmin) return true;
    return user.permissions?.includes(page.permission);
  });

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

        {!collapsed && user && (
          <>
            <h4 style={{ marginTop: "10px", color: "#fff", fontSize: 14 }}>
              {user.name || "Dashboard"}
            </h4>
            <p style={{ fontSize: "12px", color: "#94a3b8" }}>
              {user.email}
            </p>
            {user.isSuperAdmin && (
              <span
                style={{
                  display: "inline-block",
                  marginTop: 4,
                  background: "#f59e0b20",
                  color: "#f59e0b",
                  borderRadius: 8,
                  padding: "2px 8px",
                  fontSize: 11,
                }}
              >
                Super Admin
              </span>
            )}
          </>
        )}
      </div>

      {/* 🔹 Menu Section */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        <Menu
          menuItemStyles={{
            button: ({ active }: { active: boolean }) => ({
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
