import { Toaster } from "@/client/components/ui/toaster";
import { Toaster as Sonner } from "@/client/components/ui/sonner";
import { TooltipProvider } from "@/client/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";
import { LanguageProvider } from '@/client/context/LanguageContext';

import PageLoader from "@/client/components/ui/PageLoader.jsx";
import useRecordVisit from "@/client/hooks/useRecordVisit.ts";

// ── Lazy Pages ─────────────────────────────
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
const Login         = lazy(() => import("./pages/Login"));
const Register      = lazy(() => import("./pages/Register"));
const EventPage     = lazy(() => import("./pages/EventPage"));

// ── Dashboard ─────────────────────────────
const DashboardLayout      = lazy(() => import("./components/dashboard/DashboardPageLayout"));
const DashboardHome        = lazy(() => import("./pages/dashboard/Home"));
const WorkshopsDashboard   = lazy(() => import("./pages/dashboard/workshops"));
const PublicationEditor    = lazy(() => import("./pages/dashboard/Publication"));
const PublicationsPage     = lazy(() => import("./pages/dashboard/PublicationsPage"));
const PublicationView      = lazy(() => import("./pages/dashboard/PublicationView"));
const AchievementsDashboard= lazy(() => import("./pages/dashboard/Achievements"));
const TeamDashboard        = lazy(() => import("./pages/dashboard/TeamDashboard"));
const JoinRequests         = lazy(() => import("./pages/dashboard/JoinRequests"));
const UserPermissions      = lazy(() => import("./pages/dashboard/UserPermissions"));
const EventsDashboard      = lazy(() => import("./pages/dashboard/EventsDashboard"));
const EventEditor          = lazy(() => import("./pages/dashboard/EventEditor"));

// ── Protected Route ───────────────────────
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = document.cookie.includes("scc-code"); // عدلها حسب نظامك
  return isLoggedIn ? children : <Login />;
};

// ── Nav Progress ─────────────────────────
function NavProgress() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setVisible(true);
    setWidth(30);

    const interval = setInterval(() => {
      setWidth((prev) => (prev < 90 ? prev + 10 : prev));
    }, 120);

    const done = setTimeout(() => {
      setWidth(100);
      setTimeout(() => setVisible(false), 200);
    }, 700);

    return () => {
      clearInterval(interval);
      clearTimeout(done);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 99999,
      height: 3,
      width: `${width}%`,
      background: "linear-gradient(90deg, hsl(160 84% 39%), hsl(213 56% 45%))",
      transition: "width 0.25s ease",
    }} />
  );
}

// ── App ──────────────────────────────────
const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  useRecordVisit();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />

          <BrowserRouter>
            <NavProgress />

            <Routes>
              {/* Public */}
              <Route path="/" element={<Suspense fallback={<PageLoader />}><Home /></Suspense>} />
              <Route path="/about" element={<Suspense fallback={<PageLoader />}><About /></Suspense>} />
              <Route path="/goals" element={<Suspense fallback={<PageLoader />}><Goals /></Suspense>} />
              <Route path="/vision" element={<Suspense fallback={<PageLoader />}><Vision /></Suspense>} />
              <Route path="/team" element={<Suspense fallback={<PageLoader />}><Team /></Suspense>} />
              <Route path="/achievements" element={<Suspense fallback={<PageLoader />}><Achievements /></Suspense>} />
              <Route path="/publications" element={<Suspense fallback={<PageLoader />}><Publications /></Suspense>} />
              <Route path="/workshops" element={<Suspense fallback={<PageLoader />}><Workshops /></Suspense>} />
              <Route path="/join" element={<Suspense fallback={<PageLoader />}><Join /></Suspense>} />
              <Route path="/events/:slug" element={<Suspense fallback={<PageLoader />}><EventPage /></Suspense>} />
              <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
              <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<PageLoader />}>
                      <DashboardLayout />
                    </Suspense>
                  </ProtectedRoute>
                }
              >
                <Route index element={<DashboardHome />} />
                <Route path="workshop" element={<WorkshopsDashboard />} />
                <Route path="achievements" element={<AchievementsDashboard />} />
                <Route path="team" element={<TeamDashboard />} />
                <Route path="join-requests" element={<JoinRequests />} />
                <Route path="user-permissions" element={<UserPermissions />} />
                <Route path="events" element={<EventsDashboard />} />
                <Route path="events/new" element={<EventEditor />} />
                <Route path="events/edit/:id" element={<EventEditor />} />

                <Route path="publications">
                  <Route index element={<PublicationsPage />} />
                  <Route path="new" element={<PublicationEditor />} />
                  <Route path="edit/:id" element={<PublicationEditor />} />
                  <Route path="view/:id" element={<PublicationView />} />
                </Route>
              </Route>

              <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;