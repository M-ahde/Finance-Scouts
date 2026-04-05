import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import axios from "axios";
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiCalendar, FiExternalLink, FiUsers } from "react-icons/fi";
import DeleteConfirmModal from "@/client/components/ui/DeleteConfirmModal.jsx";

const api = {
  getAll: () => axios.get("/api/v1/events", { withCredentials: true }).then(r => r.data),
  toggle: ({ id, isPublished }) =>
    axios.put(`/api/v1/events/${id}`, { isPublished }, { withCredentials: true }).then(r => r.data),
  remove: (id) =>
    axios.delete(`/api/v1/events/${id}`, { withCredentials: true }),
  regCount: (id) =>
    axios.get(`/api/v1/events/${id}/registrations/count`, { withCredentials: true }).then(r => r.data),
};

const DESIGN_BADGE = {
  elegant: { bg: "#1e293b", color: "#38bdf8",  label: "Elegant" },
  vibrant: { bg: "#2d2b4e", color: "#fbbf24",  label: "Vibrant" },
  minimal: { bg: "#f1f5f9", color: "#0d9488",  label: "Minimal" },
  custom:  { bg: "#1a1a2a", color: "#a855f7",  label: "Custom"  },
};

// Counter badge — per event
function RegCount({ eventId }) {
  const { data: count, isLoading } = useQuery({
    queryKey: ["reg-count", eventId],
    queryFn: () => api.regCount(eventId),
    staleTime: 30_000,
  });
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      background: "#eff6ff", color: "#1d4ed8", borderRadius: 10,
      padding: "2px 9px", fontSize: 11, fontWeight: 600,
    }}>
      <FiUsers size={10} />
      {isLoading ? "…" : count ?? 0} registered
    </span>
  );
}

export default function EventsDashboard() {
  const qc = useQueryClient();
  const [deleteTarget, setDeleteTarget] = useState(null); // { _id, title }

  const { data: events = [], isLoading } = useQuery({ queryKey: ["events-dash"], queryFn: api.getAll });

  const toggleMutation = useMutation({
    mutationFn: api.toggle,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["events-dash"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: api.remove,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events-dash"] });
      setDeleteTarget(null);
    },
  });

  if (isLoading) return <div style={{ padding: 40, color: "#64748b", textAlign: "center" }}>Loading events...</div>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>Events</h1>
          <p style={{ color: "#64748b", fontSize: 14, margin: "4px 0 0" }}>
            {events.length} event{events.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <Link
          to="/dashboard/events/new"
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#0f172a", color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}
        >
          <FiPlus /> New Event
        </Link>
      </div>

      {events.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: 60, textAlign: "center", border: "1px dashed #e2e8f0" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🗓️</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>No events yet</div>
          <div style={{ color: "#94a3b8", marginBottom: 20 }}>Create your first event to get started.</div>
          <Link to="/dashboard/events/new" style={{ background: "#0f172a", color: "#fff", borderRadius: 8, padding: "10px 20px", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
            Create Event
          </Link>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {events.map((ev) => {
            const badge  = DESIGN_BADGE[ev.design] ?? DESIGN_BADGE.elegant;
            const evDate = new Date(ev.date);
            const isPast = evDate < new Date();

            return (
              <div key={ev._id} style={{ background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0", padding: "18px 22px", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                {/* Thumb */}
                <div style={{ width: 56, height: 56, borderRadius: 10, flexShrink: 0, background: ev.coverImage ? `url(${ev.coverImage}) center/cover` : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>
                  {!ev.coverImage && "🗓️"}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 5 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{ev.title}</span>
                    <span style={{ background: ev.isPublished ? "#d1fae5" : "#f1f5f9", color: ev.isPublished ? "#065f46" : "#64748b", borderRadius: 10, padding: "2px 9px", fontSize: 11, fontWeight: 600 }}>
                      {ev.isPublished ? "Published" : "Draft"}
                    </span>
                    <span style={{ background: badge.bg, color: badge.color, borderRadius: 10, padding: "2px 9px", fontSize: 11, fontWeight: 600 }}>
                      {badge.label}
                    </span>
                    {isPast && (
                      <span style={{ background: "#fee2e2", color: "#991b1b", borderRadius: 10, padding: "2px 9px", fontSize: 11, fontWeight: 600 }}>Past</span>
                    )}
                    <RegCount eventId={ev._id} />
                  </div>
                  <div style={{ fontSize: 13, color: "#64748b", display: "flex", alignItems: "center", gap: 6 }}>
                    <FiCalendar size={12} />
                    {evDate.toLocaleDateString("en-US", { weekday: "short", year: "numeric", month: "short", day: "numeric" })}
                    {ev.location && <> · {ev.location}</>}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                  {ev.isPublished && (
                    <a href={`/events/${ev.slug}`} target="_blank" rel="noopener noreferrer" title="View public page" style={iconBtn("#eff6ff", "#1d4ed8")}>
                      <FiExternalLink size={15} />
                    </a>
                  )}
                  <button title={ev.isPublished ? "Unpublish" : "Publish"} onClick={() => toggleMutation.mutate({ id: ev._id, isPublished: !ev.isPublished })} style={iconBtn(ev.isPublished ? "#fef3c7" : "#d1fae5", ev.isPublished ? "#92400e" : "#065f46")}>
                    {ev.isPublished ? <FiEyeOff size={15} /> : <FiEye size={15} />}
                  </button>
                  <Link to={`/dashboard/events/edit/${ev._id}`} title="Edit" style={{ ...iconBtn("#f8fafc", "#0f172a"), display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <FiEdit2 size={15} />
                  </Link>
                  <button title="Delete" onClick={() => setDeleteTarget(ev)} style={iconBtn("#fee2e2", "#991b1b")}>
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Styled delete confirmation ── */}
      <DeleteConfirmModal
        open={!!deleteTarget}
        title={deleteTarget?.title ?? ""}
        loading={deleteMutation.isPending}
        onClose={() => !deleteMutation.isPending && setDeleteTarget(null)}
        onConfirm={() => deleteMutation.mutate(deleteTarget._id)}
      />
    </div>
  );
}

const iconBtn = (bg, color) => ({
  width: 36, height: 36, borderRadius: 8, border: "none",
  background: bg, color, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center",
  textDecoration: "none", transition: "opacity 0.15s",
});
