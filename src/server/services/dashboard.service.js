import Achievement from "../models/Achievement.js";
import Department from "../models/Department.js";
import JoinRequest from "../models/JoinRequest.js";
import Roadmap from "../models/Roadmap.js";
import TeamMember from "../models/TeamMember.js";
import Workshop from "../models/Workshop.js";

const getRecentJoinRequests = async (limit = 5) => {
  const requests = await JoinRequest.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("fullName major year createdAt")
    .lean();

  return requests.map((request) => ({
    ...request,
    id: request._id,
  }));
};

const getJoinRequestsTrend = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const monthlyCounts = await JoinRequest.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const monthLabel = new Intl.DateTimeFormat("en", { month: "short" });
  const map = new Map(
    monthlyCounts.map((entry) => [`${entry._id.year}-${entry._id.month}`, entry.count])
  );

  return Array.from({ length: 6 }).map((_, index) => {
    const current = new Date();
    current.setMonth(current.getMonth() - (5 - index));
    const year = current.getFullYear();
    const month = current.getMonth() + 1;

    return {
      month: monthLabel.format(current),
      count: map.get(`${year}-${month}`) || 0,
    };
  });
};

export const getOverview = async () => {
  const [
    teamMembers,
    departments,
    workshops,
    roadmaps,
    achievements,
    joinRequests,
    recentJoinRequests,
    joinRequestsTrend,
    upcomingWorkshops,
  ] = await Promise.all([
    TeamMember.countDocuments(),
    Department.countDocuments(),
    Workshop.countDocuments(),
    Roadmap.countDocuments(),
    Achievement.countDocuments(),
    JoinRequest.countDocuments(),
    getRecentJoinRequests(),
    getJoinRequestsTrend(),
    Workshop.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .limit(5)
      .select("title date location")
      .lean(),
  ]);

  return {
    metrics: {
      teamMembers,
      departments,
      workshops,
      roadmaps,
      achievements,
      joinRequests,
    },
    joinRequestsTrend,
    recentJoinRequests,
    upcomingWorkshops: upcomingWorkshops.map((workshop) => ({
      ...workshop,
      id: workshop._id,
    })),
  };
};
