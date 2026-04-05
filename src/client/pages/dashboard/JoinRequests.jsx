import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const STATUS_COLORS = {
  pending: { bg: "#fef3c7", text: "#92400e", label: "Pending" },
  accepted: { bg: "#d1fae5", text: "#065f46", label: "Accepted" },
  denied: { bg: "#fee2e2", text: "#991b1b", label: "Denied" },
};

const COMMITTEE_LABELS = {
  management: "Management",
  content: "Content Writing",
  design: "Design",
  media: "Media",
  pr: "Public Relations",
  documentation: "Documentation",
};

const fetchRequests = () =>
  axios.get("/api/v1/join", { withCredentials: true }).then((r) => r.data);

const updateStatus = ({ id, status }) =>
  axios.patch(`/api/v1/join/${id}/status`, { status }, { withCredentials: true }).then((r) => r.data);

export default function JoinRequests() {
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const { data: requests = [], isLoading, isError } = useQuery({
    queryKey: ["join-requests"],
    queryFn: fetchRequests,
  });

  const mutation = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["join-requests"] }),
  });

  const filtered = requests.filter((r) => {
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      r.arabicName?.toLowerCase().includes(q) ||
      r.englishName?.toLowerCase().includes(q) ||
      r.universityEmail?.toLowerCase().includes(q) ||
      r.universityId?.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    accepted: requests.filter((r) => r.status === "accepted").length,
    denied: requests.filter((r) => r.status === "denied").length,
  };

  if (isLoading)
    return <div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>Loading join requests...</div>;

  if (isError)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#ef4444" }}>
        Failed to load. Make sure you have <code>manage_join_requests</code> permission.
      </div>
    );

  return (
    <div style={{ padding: "0 4px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#0f172a" }}>
        Join Requests
      </h1>
      <p style={{ color: "#64748b", marginBottom: 24, fontSize: 14 }}>
        Review and manage team membership applications.
      </p>

      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {["all", "pending", "accepted", "denied"].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: filterStatus === s ? 600 : 400,
              background: filterStatus === s ? "#0f172a" : "#e2e8f0",
              color: filterStatus === s ? "#fff" : "#475569",
              transition: "all 0.2s",
            }}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s]})
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, or university ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "8px 14px",
          borderRadius: 8,
          border: "1px solid #e2e8f0",
          marginBottom: 20,
          fontSize: 14,
          outline: "none",
        }}
      />

      {/* Table */}
      {filtered.length === 0 ? (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 40,
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          No requests found.
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}
          >
            <thead>
              <tr style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                {["Name (EN)", "Name (AR)", "Email", "Univ. ID", "Level", "Major", "Committee(s)", "Date", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        textAlign: "left",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#64748b",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((req) => {
                const s = STATUS_COLORS[req.status] || STATUS_COLORS.pending;
                const isUpdating = mutation.isPending && mutation.variables?.id === req._id;
                return (
                  <tr
                    key={req._id}
                    style={{ borderBottom: "1px solid #f1f5f9" }}
                  >
                    <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
                      {req.englishName}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 13, direction: "rtl", whiteSpace: "nowrap" }}>
                      {req.arabicName}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569" }}>
                      {req.universityEmail}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569" }}>
                      {req.universityId}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569" }}>
                      {req.level}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569" }}>
                      {req.major}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12 }}>
                      {(req.committee || []).map((c) => (
                        <span
                          key={c}
                          style={{
                            display: "inline-block",
                            background: "#eff6ff",
                            color: "#1d4ed8",
                            borderRadius: 12,
                            padding: "2px 8px",
                            fontSize: 11,
                            margin: "2px 2px",
                          }}
                        >
                          {COMMITTEE_LABELS[c] || c}
                        </span>
                      ))}
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: 12, color: "#475569", whiteSpace: "nowrap" }}>
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <span
                        style={{
                          background: s.bg,
                          color: s.text,
                          borderRadius: 12,
                          padding: "3px 10px",
                          fontSize: 12,
                          fontWeight: 600,
                        }}
                      >
                        {s.label}
                      </span>
                    </td>
                    <td style={{ padding: "12px 14px", whiteSpace: "nowrap" }}>
                      {req.status !== "accepted" && (
                        <button
                          disabled={isUpdating}
                          onClick={() => mutation.mutate({ id: req._id, status: "accepted" })}
                          style={{
                            padding: "5px 12px",
                            borderRadius: 6,
                            border: "none",
                            background: "#10b981",
                            color: "#fff",
                            fontSize: 12,
                            cursor: "pointer",
                            marginRight: 6,
                            opacity: isUpdating ? 0.6 : 1,
                          }}
                        >
                          Accept
                        </button>
                      )}
                      {req.status !== "denied" && (
                        <button
                          disabled={isUpdating}
                          onClick={() => mutation.mutate({ id: req._id, status: "denied" })}
                          style={{
                            padding: "5px 12px",
                            borderRadius: 6,
                            border: "none",
                            background: "#ef4444",
                            color: "#fff",
                            fontSize: 12,
                            cursor: "pointer",
                            opacity: isUpdating ? 0.6 : 1,
                          }}
                        >
                          Deny
                        </button>
                      )}
                      {req.status !== "pending" && (
                        <button
                          disabled={isUpdating}
                          onClick={() => mutation.mutate({ id: req._id, status: "pending" })}
                          style={{
                            padding: "5px 12px",
                            borderRadius: 6,
                            border: "none",
                            background: "#f59e0b",
                            color: "#fff",
                            fontSize: 12,
                            cursor: "pointer",
                            opacity: isUpdating ? 0.6 : 1,
                          }}
                        >
                          Reset
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
