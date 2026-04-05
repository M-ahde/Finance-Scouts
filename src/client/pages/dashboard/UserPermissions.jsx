import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const ALL_PERMISSIONS = [
  { key: "view_dashboard", label: "View Dashboard", group: "General" },
  { key: "manage_join_requests", label: "Manage Join Requests", group: "General" },
  { key: "manage_events", label: "Manage Events", group: "General" },
  { key: "manage_users", label: "Manage Users & Permissions", group: "Users" },
  { key: "create_user", label: "Create User", group: "Users" },
  { key: "edit_user", label: "Edit User", group: "Users" },
  { key: "delete_user", label: "Delete User", group: "Users" },
  { key: "view_logs", label: "View Logs", group: "Users" },
];

const GROUPS = ["General", "Users"];

const fetchUsers = () =>
  axios.get("/api/v1/users", { withCredentials: true }).then((r) => r.data);

const savePermissions = ({ id, permissions }) =>
  axios
    .patch(`/api/v1/users/${id}/permissions`, { permissions }, { withCredentials: true })
    .then((r) => r.data);

export default function UserPermissions() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState([]);
  const [search, setSearch] = useState("");

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ["all-users"],
    queryFn: fetchUsers,
  });

  const mutation = useMutation({
    mutationFn: savePermissions,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-users"] });
      setEditingId(null);
    },
  });

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q);
  });

  const startEdit = (user) => {
    setEditingId(user._id);
    setDraft([...(user.permissions || [])]);
  };

  const togglePerm = (key) => {
    setDraft((prev) =>
      prev.includes(key) ? prev.filter((p) => p !== key) : [...prev, key]
    );
  };

  if (isLoading)
    return <div style={{ padding: 40, textAlign: "center", color: "#64748b" }}>Loading users...</div>;

  if (isError)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#ef4444" }}>
        Failed to load. Make sure you have <code>manage_users</code> permission.
      </div>
    );

  return (
    <div style={{ padding: "0 4px" }}>
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4, color: "#0f172a" }}>
        User Permissions
      </h1>
      <p style={{ color: "#64748b", marginBottom: 24, fontSize: 14 }}>
        Assign specific dashboard permissions to each user.
      </p>

      <input
        type="text"
        placeholder="Search by name or email..."
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

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((user) => {
          const isEditing = editingId === user._id;
          const isSaving = mutation.isPending && mutation.variables?.id === user._id;

          return (
            <div
              key={user._id}
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 20,
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                border: isEditing ? "2px solid #3b82f6" : "1px solid #e2e8f0",
                transition: "border 0.2s",
              }}
            >
              {/* User Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: isEditing ? 20 : 0,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "#eff6ff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#3b82f6",
                      }}
                    >
                      {(user.name || user.email || "?")[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: "#0f172a" }}>
                        {user.name || "(no name)"}
                        {user.isSuperAdmin && (
                          <span
                            style={{
                              marginLeft: 8,
                              background: "#fef3c7",
                              color: "#92400e",
                              borderRadius: 10,
                              padding: "1px 8px",
                              fontSize: 11,
                              fontWeight: 600,
                            }}
                          >
                            Super Admin
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 12, color: "#64748b" }}>{user.email}</div>
                    </div>
                  </div>

                  {/* Current permissions summary */}
                  {!isEditing && (
                    <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {user.isSuperAdmin ? (
                        <span
                          style={{
                            background: "#fef3c7",
                            color: "#92400e",
                            borderRadius: 10,
                            padding: "2px 10px",
                            fontSize: 11,
                          }}
                        >
                          All permissions (Super Admin)
                        </span>
                      ) : user.permissions?.length > 0 ? (
                        user.permissions.map((p) => (
                          <span
                            key={p}
                            style={{
                              background: "#eff6ff",
                              color: "#1d4ed8",
                              borderRadius: 10,
                              padding: "2px 10px",
                              fontSize: 11,
                            }}
                          >
                            {ALL_PERMISSIONS.find((x) => x.key === p)?.label || p}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>No permissions</span>
                      )}
                    </div>
                  )}
                </div>

                {!user.isSuperAdmin && (
                  <div style={{ display: "flex", gap: 8 }}>
                    {isEditing ? (
                      <>
                        <button
                          disabled={isSaving}
                          onClick={() => mutation.mutate({ id: user._id, permissions: draft })}
                          style={{
                            padding: "7px 18px",
                            borderRadius: 8,
                            border: "none",
                            background: "#3b82f6",
                            color: "#fff",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            opacity: isSaving ? 0.6 : 1,
                          }}
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          style={{
                            padding: "7px 14px",
                            borderRadius: 8,
                            border: "1px solid #e2e8f0",
                            background: "#fff",
                            color: "#64748b",
                            fontSize: 13,
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => startEdit(user)}
                        style={{
                          padding: "7px 16px",
                          borderRadius: 8,
                          border: "1px solid #e2e8f0",
                          background: "#f8fafc",
                          color: "#0f172a",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Edit Permissions
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Permissions Editor */}
              {isEditing && (
                <div>
                  {GROUPS.map((group) => (
                    <div key={group} style={{ marginBottom: 16 }}>
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#94a3b8",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          marginBottom: 8,
                        }}
                      >
                        {group}
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {ALL_PERMISSIONS.filter((p) => p.group === group).map((perm) => {
                          const active = draft.includes(perm.key);
                          return (
                            <button
                              key={perm.key}
                              onClick={() => togglePerm(perm.key)}
                              style={{
                                padding: "6px 14px",
                                borderRadius: 20,
                                border: "none",
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: active ? 600 : 400,
                                background: active ? "#3b82f6" : "#f1f5f9",
                                color: active ? "#fff" : "#64748b",
                                transition: "all 0.15s",
                              }}
                            >
                              {perm.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            padding: 40,
            textAlign: "center",
            color: "#94a3b8",
          }}
        >
          No users found.
        </div>
      )}
    </div>
  );
}
