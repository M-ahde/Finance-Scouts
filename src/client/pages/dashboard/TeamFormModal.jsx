import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent } from "@/client/components/ui/dialog";
import { Button } from "@/client/components/ui/button";
import { Input } from "@/client/components/ui/input";
import { Label } from "@/client/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/client/hooks/useLanguage";

export default function TeamFormModal({ open, setOpen, editing, refresh }) {
  const { currentLanguage, isRTL, changeLanguage } = useLanguage();
  const [form, setForm] = useState({
    name: { en: "", ar: "" },
    role: { en: "", ar: "" },
    department: { en: "", ar: "" },
    avatar: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name || { en: "", ar: "" },
        role: editing.role || { en: "", ar: "" },
        department: editing.department || { en: "", ar: "" },
        avatar: editing.avatar || "",
      });
    } else {
      setForm({
        name: { en: "", ar: "" },
        role: { en: "", ar: "" },
        department: { en: "", ar: "" },
        avatar: "",
      });
    }
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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {editing ? "Edit Team Member" : "Add New Team Member"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex gap-2 mb-4">
            <Button
              type="button"
              variant={currentLanguage === "en" ? "default" : "outline"}
              size="sm"
              onClick={() => changeLanguage("en")}
              className="flex-1"
            >
              English
            </Button>
            <Button
              type="button"
              variant={currentLanguage === "ar" ? "default" : "outline"}
              size="sm"
              onClick={() => changeLanguage("ar")}
              className="flex-1"
            >
              العربية
            </Button>
          </div>

          <div>
            <Label htmlFor="name" className="mb-1 block text-sm font-medium text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder={currentLanguage === "en" ? "Enter name" : "أدخل الاسم"}
              value={form.name[currentLanguage]}
              onChange={(e) => setForm({ ...form, name: { ...form.name, [currentLanguage]: e.target.value } })}
              required
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          <div>
            <Label htmlFor="role" className="mb-1 block text-sm font-medium text-muted-foreground">
              Role <span className="text-red-500">*</span>
            </Label>
            <Input
              id="role"
              placeholder={currentLanguage === "en" ? "e.g., President, Manager" : "مثال: رئيس، مدير"}
              value={form.role[currentLanguage]}
              onChange={(e) => setForm({ ...form, role: { ...form.role, [currentLanguage]: e.target.value } })}
              required
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          <div>
            <Label htmlFor="department" className="mb-1 block text-sm font-medium text-muted-foreground">
              Department
            </Label>
            <Input
              id="department"
              placeholder={currentLanguage === "en" ? "e.g., Marketing, IT" : "مثال: التسويق، تقنية المعلومات"}
              value={form.department[currentLanguage]}
              onChange={(e) => setForm({ ...form, department: { ...form.department, [currentLanguage]: e.target.value } })}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

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

            {form.avatar && (
              <div className="mt-3 flex justify-center">
                <img
                  src={form.avatar}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover border border-slate-200 shadow-sm"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
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