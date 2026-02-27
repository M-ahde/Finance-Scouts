import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/client/components/ui/dialog";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { toast } from "sonner";

export default function TeamFormModal({ open, setOpen, editing, refresh }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    department: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) setForm(editing);
    else setForm({ name: "", role: "", department: "", avatar: "" });
  }, [editing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (editing) {
        await axios.put(`/api/v1/team/${editing._id}`, form);
        toast.success("Member updated successfully!");
      } else {
        await axios.post("/api/v1/team", form);
        toast.success("Member created successfully!");
      }
      refresh();
      setOpen(false);
    } catch (err) {
      toast.error("Operation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editing ? "Edit Team Member" : "Add New Team Member"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="mb-1 block text-sm font-medium text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Role */}
          <div>
            <Label htmlFor="role" className="mb-1 block text-sm font-medium text-muted-foreground">
              Role <span className="text-red-500">*</span>
            </Label>
            <Input
              id="role"
              placeholder="Enter role (e.g., President)"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </div>

          {/* Department */}
          <div>
            <Label htmlFor="department" className="mb-1 block text-sm font-medium text-muted-foreground">
              Department
            </Label>
            <Input
              id="department"
              placeholder="Enter department"
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
            />
          </div>

          {/* Avatar */}
          <div>
            <Label htmlFor="avatar" className="mb-1 block text-sm font-medium text-muted-foreground">
              Avatar URL
            </Label>
            <Input
              id="avatar"
              placeholder="Enter avatar image URL"
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            />

            {/* Preview */}
            {form.avatar && (
              <div className="mt-3 flex justify-center">
                <img
                  src={form.avatar}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover border border-slate-200 shadow-sm"
                />
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={loading}
          >
            {loading ? (editing ? "Updating..." : "Creating...") : editing ? "Update Member" : "Add Member"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}