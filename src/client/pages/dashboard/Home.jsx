import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaQuestion, FaUsers } from "react-icons/fa";

import { Waypoints } from "lucide-react";
import StatCard from "@/client/components/dashboard/StatCard";
import WeeklyUsersChart from "@/client/components/dashboard/WeeklyUsersChart";
import AdvancedEventsCalendar from "@/client/components/dashboard/EventsCalendar";

// --- API Functions ---
const api = {
  fetchVisits: () => axios.get("/api/v1/visit/count").then(res => res.data),
  fetchWorkCount: () => axios.get("/api/v1/workshops/count").then(res => res.data),
  fetchWork: () => axios.get("/api/v1/workshops/").then(res => res.data),
  fetchWeekly: () => axios.get("/api/v1/visit/weekly").then(res => res.data),
  fetchJoinReq: () => axios.get("/api/v1/join/count").then(res => res.data),
};

const DashboardHome = () => {
  // Queries
  const { data: visits = 0, isLoading: loadingVisits } = useQuery({ queryKey: ["visits"], queryFn: api.fetchVisits });
  const { data: weeklyData = [] } = useQuery({ queryKey: ["weekly-visits"], queryFn: api.fetchWeekly });
  const { data: workcount = 0 } = useQuery({ queryKey: ["work-count"], queryFn: api.fetchWorkCount });
  const { data: workData = [] } = useQuery({ queryKey: ["work-shops"], queryFn: api.fetchWork });
  const { data: joinReq = 0 } = useQuery({ queryKey: ["join-req"], queryFn: api.fetchJoinReq });

  // 1. تحويل بيانات الورش لتناسب التقويم
  const workshopEvents = workData.map((w) => ({
    title: `Workshop: ${w.title.en || w.title.ar}`, // نستخدم الاسم الانجليزي او العربي
    date: w.date, // تأكد ان التنسيق YYYY-MM-DD
    time: w.time,
    category: "workshop",
    color: "#8b5cf6", // لون بنفسجي مميز للورش
  }));

  // 2. دمج الـ Static Events مع البيانات القادمة من الـ API
  const staticEvents = [
    {
      title: "Conference: React Summit",
      date: "2026-02-15",
      time: "9:00 AM - 5:00 PM",
      category: "event",
      color: "#ef4444",
    },
    {
      title: "Team Meeting",
      date: "2026-02-15",
      time: "2:00 PM - 3:00 PM",
      category: "small",
      color: "#10b981",
    },
  ];

  const allEvents = [...staticEvents, ...workshopEvents];

  return (
    <main>
      <div className="p-6 flex flex-col gap-6">
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Visits"
            value={loadingVisits ? "..." : visits}
            icon={<FaUsers size={20} />}
            color="#3b82f6"
          />
          <StatCard
            title="Join Team Requests"
            value={joinReq}
            icon={<FaQuestion size={20} />}
            color="#221C1C"
          />
          <StatCard
            title="Total Workshops"
            value={workcount}
            icon={<Waypoints size={20} />}
            color="#0B814E"
          />
        </div>

        {/* Charts & Calendar Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Weekly Visits</h3>
            <WeeklyUsersChart data={weeklyData} />
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm h-full">
             <h3 className="text-lg font-semibold mb-4">Events Schedule</h3>
            <AdvancedEventsCalendar events={allEvents} />
          </div>
        </div>

      </div>
    </main>
  );
};

export default DashboardHome;