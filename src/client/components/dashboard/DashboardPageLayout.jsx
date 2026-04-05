import { useState, useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import AppSidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // جلب بيانات المستخدم عند الدخول للوحة التحكم
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/v1/auth/me", {
          withCredentials: true,
        });

        setUser(data);
      } catch (err) {
        console.log(err)
        // إذا لم يكن مسجل دخول → إعادة توجيه للصفحة الرئيسية أو تسجيل الدخول
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // أغلق الـ mobile sidebar عند تغيير الصفحة
  useEffect(() => {
    setToggled(false);
  }, [location.pathname]);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setToggled(!toggled);

  // إذا لم يتم تحميل بيانات المستخدم بعد
  if (loading) return <div>Loading...</div>;

  // مثال: فحص صلاحية للوصول للـ Dashboard بالكامل
  if (!user.permissions.includes("view_dashboard") && !user.isSuperAdmin) {
    return <div className="text-center p-10">🚫 You do not have permission to access this page</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <AppSidebar
        collapsed={collapsed}
        toggled={toggled}
        setToggled={setToggled}
        user={user} // يمكنك تمرير بيانات المستخدم للـ Sidebar
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
        <Navbar toggleSidebar={toggleSidebar} toggleMobile={toggleMobile} user={user} />

        <main
          style={{
            flex: 1,
            padding: "20px",
            background: "#f1f5f9",
            overflowY: "auto",
          }}
        >
          <Outlet context={{ user }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;