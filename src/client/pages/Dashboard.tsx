import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Award, Calendar, GitBranch, Users, UserPlus } from "lucide-react";
import PageLayout from "@/client/components/layout/PageLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/client/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/client/components/ui/table";
import { Badge } from "@/client/components/ui/badge";
import { getDashboardOverview } from "@/client/services/dashboard";
import { useLanguage } from "@/client/hooks/useLanguage";

const icons = {
  teamMembers: Users,
  departments: Activity,
  workshops: Calendar,
  roadmaps: GitBranch,
  achievements: Award,
  joinRequests: UserPlus,
};

const adminKey = import.meta.env.VITE_ADMIN_API_KEY;

export default function Dashboard() {
  const { currentLanguage } = useLanguage();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: () => getDashboardOverview(adminKey),
    retry: 1,
  });

  const metricCards = useMemo(() => {
    if (!data?.metrics) {
      return [];
    }

    return Object.entries(data.metrics).map(([key, value]) => ({
      key,
      value,
      Icon: icons[key as keyof typeof icons],
    }));
  }, [data]);

  return (
    <PageLayout>
      <section className="container mx-auto space-y-6 px-4 py-8 md:px-6 md:py-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {currentLanguage === "ar" ? "لوحة التحكم" : "Admin Dashboard"}
          </h1>
          <p className="text-muted-foreground">
            {currentLanguage === "ar"
              ? "نظرة موحّدة على مؤشرات الفريق والطلبات والفعاليات"
              : "Unified operational view for team metrics, requests, and activities."}
          </p>
        </div>

        {isLoading && <p className="text-sm text-muted-foreground">Loading dashboard data...</p>}
        {isError && (
          <Card>
            <CardContent className="p-6 text-sm text-destructive">
              Failed to load dashboard data. Ensure the admin API key is configured.
            </CardContent>
          </Card>
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {metricCards.map((item) => (
                <Card key={item.key}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium capitalize">{item.key}</CardTitle>
                    {item.Icon && <item.Icon className="h-4 w-4 text-muted-foreground" />}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Join Requests Trend</CardTitle>
                  <CardDescription>Last 6 months</CardDescription>
                </CardHeader>
                <CardContent className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.joinRequestsTrend}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="hsl(var(--accent))" radius={6} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Workshops</CardTitle>
                  <CardDescription>Next planned sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {data.upcomingWorkshops.length === 0 && (
                      <p className="text-sm text-muted-foreground">No upcoming workshops found.</p>
                    )}
                    {data.upcomingWorkshops.map((workshop) => (
                      <div key={workshop.id} className="rounded-lg border p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{workshop.title}</p>
                          <Badge variant="secondary">
                            {new Date(workshop.date).toLocaleDateString(currentLanguage === "ar" ? "ar-EG" : "en-US")}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{workshop.location || "TBA"}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Join Requests</CardTitle>
                <CardDescription>Latest applications submitted to the team</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Major</TableHead>
                      <TableHead>Year</TableHead>
                      <TableHead>Submitted At</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.recentJoinRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.fullName}</TableCell>
                        <TableCell>{request.major}</TableCell>
                        <TableCell>{request.year}</TableCell>
                        <TableCell>
                          {new Date(request.createdAt).toLocaleString(
                            currentLanguage === "ar" ? "ar-EG" : "en-US"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}
      </section>
    </PageLayout>
  );
}
