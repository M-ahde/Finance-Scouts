import api from "./api";

export const getDashboardOverview = async (adminKey) => {
  const headers = adminKey
    ? {
        "x-admin-api-key": adminKey,
      }
    : undefined;

  return api.get("/dashboard/overview", { headers });
};
