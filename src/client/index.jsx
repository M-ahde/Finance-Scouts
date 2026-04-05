import { Toaster } from "@/client/components/ui/toaster";
import { Toaster as Sonner } from "@/client/components/ui/sonner";
import { TooltipProvider } from "@/client/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import '@/client/lib/i18n';

import PageLoader from "@/client/components/ui/PageLoader.jsx";

// ── Lazy-loaded public pages ──────────────────────────────────────
const Home          = lazy(() => import("./pages/Home"));
const About         = lazy(() => import("./pages/About"));
const Goals         = lazy(() => import("./pages/Goals"));
const Vision        = lazy(() => import("./pages/Vision"));
const Team          = lazy(() => import("./pages/Team"));
const Achievements  = lazy(() => import("./pages/Achievements"));
const Publications  = lazy(() => import("./pages/Publications"));
const Workshops     = lazy(() => import("./pages/Workshops"));
const Join          = lazy(() => import("./pages/Join"));
const NotFound      = lazy(() => import("./pages/NotFound"));
const Login         = lazy(() => import("./pages/Login.jsx"));
const Register      = lazy(() => import("./pages/Register.jsx"));
const EventPage     = lazy(() => import("./pages/EventPage.jsx"));

// ── Lazy-loaded dashboard pages ───────────────────────────────────
const DashboardLayout      = lazy(() => import("./components/dashboard/DashboardPageLayout"));
const DashboardHome        = lazy(() => import("./pages/dashboard/Home"));
const WorkshopsDashboard   = lazy(() => import("./pages/dashboard/workshops"));
const PublicationEditor    = lazy(() => import("./pages/dashboard/Publication"));
const PublicationsPage     = lazy(() => import("./pages/dashboard/PublicationsPage"));
const PublicationView      = lazy(() => import("./pages/dashboard/PublicationView"));
const AchievementsDashboard= lazy(() => import("./pages/dashboard/Achievements"));
const TeamDashboard        = lazy(() => import("./pages/dashboard/TeamDashboard"));
const JoinRequests         = lazy(() => import("./pages/dashboard/JoinRequests.jsx"));
const UserPermissions      = lazy(() => import("./pages/dashboard/UserPermissions.jsx"));
const EventsDashboard      = lazy(() => import("./pages/dashboard/EventsDashboard.jsx"));
const EventEditor          = lazy(() => import("./pages/dashboard/EventEditor.jsx"));

const queryClient = new QueryClient();

import useRecordVisit from "@/client/hooks/useRecordVisit.ts";

// ── Top progress bar shown during route transitions ───────────────
function NavProgress() {
  const location = useLocation();
  const navType  = useNavigationType();
  const [visible, setVisible] = useState(false);
  const [width, setWidth]     = useState(0);

  useEffect(() => {
    setVisible(true);
    setWidth(0);
    const t1 = setTimeout(() => setWidth(70),  60);
    const t2 = setTimeout(() => setWidth(90),  400);
    const t3 = setTimeout(() => setWidth(100), 650);
    const t4 = setTimeout(() => setVisible(false), 900);
    return () => [t1,t2,t3,t4].forEach(clearTimeout);
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, zIndex: 99999,
      height: 3, width: `${width}%`,
      background: "linear-gradient(90deg, hsl(160 84% 39%), hsl(213 56% 45%))",
      transition: "width 0.35s ease",
      boxShadow: "0 0 8px hsl(160 84% 39% / 0.6)",
    }} />
  );
}

const App = () => {
  useRecordVisit();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <NavProgress />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {/* Public */}
              <Route path="/"            element={<Home />} />
              <Route path="/about"       element={<About />} />
              <Route path="/goals"       element={<Goals />} />
              <Route path="/vision"      element={<Vision />} />
              <Route path="/team"        element={<Team />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/workshops"   element={<Workshops />} />
              <Route path="/join"        element={<Join />} />
              <Route path="/events/:slug" element={<EventPage />} />
              <Route path="/login"       element={<Login />} />
              <Route path="/register"    element={<Register />} />

              {/* Dashboard */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index                    element={<DashboardHome />} />
                <Route path="workshop"          element={<WorkshopsDashboard />} />
                <Route path="achievements"      element={<AchievementsDashboard />} />
                <Route path="team"              element={<TeamDashboard />} />
                <Route path="join-requests"     element={<JoinRequests />} />
                <Route path="user-permissions"  element={<UserPermissions />} />
                <Route path="events"            element={<EventsDashboard />} />
                <Route path="events/new"        element={<EventEditor />} />
                <Route path="events/edit/:id"   element={<EventEditor />} />
                <Route path="publications">
                  <Route index                  element={<PublicationsPage />} />
                  <Route path="new"             element={<PublicationEditor />} />
                  <Route path="edit/:id"        element={<PublicationEditor />} />
                  <Route path="view/:id"        element={<PublicationView />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
