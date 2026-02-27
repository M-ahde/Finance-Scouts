import { Toaster } from "@/client/components/ui/toaster";
import { Toaster as Sonner } from "@/client/components/ui/sonner";
import { TooltipProvider } from "@/client/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import '@/client/lib/i18n';

import Home from "./pages/Home";
import About from "./pages/About";
import Goals from "./pages/Goals";
import Vision from "./pages/Vision";
import Team from "./pages/Team";
import Achievements from "./pages/Achievements";
import Publications from "./pages/Publications";
import Workshops from "./pages/Workshops";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";


import DashboardHome from "./pages/dashboard/Home"
import WorkshopsDashboard from "./pages/dashboard/workshops"
import PublicationEditor from  "./pages/dashboard/Publication";
import PublicationsPage from  "./pages/dashboard/PublicationsPage";
import PublicationView from  "./pages/dashboard/PublicationView";
import AchievementsDashboard from  "./pages/dashboard/Achievements";
import DashboardLayout from "./components/dashboard/DashboardPageLayout";
import TeamDashboard from "./pages/dashboard/TeamDashboard";

const queryClient = new QueryClient();

import useRecordVisit from "@/client/hooks/useRecordVisit.ts";

const App = () => {
  useRecordVisit(); // 👈 records visit once when app loads

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/vision" element={<Vision />} />
            <Route path="/team" element={<Team />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/workshops" element={<Workshops />} />
            <Route path="/join" element={<Join />} />

            {/* Dashboard routes */}
       <Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<DashboardHome />} />
  <Route path="workshop" element={<WorkshopsDashboard />} />
  <Route path="achievements" element={<AchievementsDashboard />} />


  <Route path="team" element={<TeamDashboard />} />

  <Route path="publications">
    <Route index element={<PublicationsPage />} />
    <Route path="new" element={<PublicationEditor />} />
    <Route path="edit/:id" element={<PublicationEditor />} />
    <Route path="view/:id" element={<PublicationView />} />
  </Route>
</Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
