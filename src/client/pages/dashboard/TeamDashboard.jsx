import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent } from "@/client/components/ui/card";
import TeamFormModal from "./TeamFormModal";
import { toast } from "sonner";
import { useLanguage } from "@/client/hooks/useLanguage";

export default function TeamDashboard() {
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentLanguage } = useLanguage();

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/v1/team");
      setMembers(res.data);
    } catch (err) {
      toast.error("Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this member?")) return;
    try {
      await axios.delete(`/api/v1/team/${id}`);
      toast.success("Member deleted");
      fetchMembers();
    } catch {
      toast.error("Failed to delete member");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Add Member
        </Button>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground">Loading...</p>
      ) : members.length === 0 ? (
        <p className="text-center text-muted-foreground">No team members found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => {
            const name = member.name?.[currentLanguage] || member.name?.en || "—";
            const role = member.role?.[currentLanguage] || member.role?.en || "—";
            const department = member.department?.[currentLanguage] || member.department?.en || "";

            return (
              <Card key={member._id} className="p-4 space-y-3 hover:shadow-lg transition">
                <img
                  src={member.avatar || "/placeholder-avatar.png"}
                  alt={name}
                  className="w-24 h-24 rounded-full object-cover mx-auto"
                  onError={(e) => {
                    e.target.src = "/placeholder-avatar.png";
                  }}
                />

                <div className="text-center">
                  <h3 className="font-semibold">{name}</h3>
                  <p className="text-sm text-muted-foreground">{role}</p>
                  {department && (
                    <p className="text-xs text-muted-foreground">{department}</p>
                  )}
                </div>

                <div className="flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(member);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(member._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <TeamFormModal
        open={open}
        setOpen={setOpen}
        editing={editing}
        refresh={fetchMembers}
      />
    </div>
  );
}