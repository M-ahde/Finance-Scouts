import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/client/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/client/components/ui/tabs";
import { Input } from "@/client/components/ui/input";
import { Textarea } from "@/client/components/ui/textarea";
import { Button } from "@/client/components/ui/button";
import { Loader2 } from "lucide-react";

export default function WorkshopFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: any) {
  const emptyForm = {
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    location: { en: "", ar: "" },
    date: "", // string YYYY-MM-DD
    time: "", // string "12:00 - 2:00"
  };

  const [form, setForm] = useState(emptyForm);

  // عند فتح الفورم مع بيانات موجودة
  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        // تحويل التاريخ إلى صيغة input type="date"
        date: initialData.date
          ? new Date(initialData.date).toISOString().split("T")[0]
          : "",
        time: initialData.time || "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData, open]);

  const handleChange = (field: string, lang: string, value: string) => {
    setForm((prev: any) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleSubmit = () => {
    if (!form.date || !form.time || !form.title.en || !form.title.ar) {
      return alert("Please fill all required fields");
    }

    // دمج التاريخ كنص Date صالح للحفظ في MongoDB
    const submitData = {
      ...form,
      date: new Date(form.date), // ✅ التاريخ كـ Date
      time: form.time,           // ✅ الوقت كنطاق نصي
    };

    onSubmit(submitData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Workshop" : "Add Workshop"}
          </DialogTitle>
        </DialogHeader>

        {/* Date & Time */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Input
            placeholder="Time (e.g. 12:00 - 2:00)"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>

        {/* Language Tabs */}
        <Tabs defaultValue="en" className="mt-4">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="en">English</TabsTrigger>
            <TabsTrigger value="ar">العربية</TabsTrigger>
          </TabsList>

          {["en", "ar"].map((lang) => (
            <TabsContent key={lang} value={lang} className="space-y-3">
              <Input
                placeholder={`Title (${lang.toUpperCase()})`}
                value={form.title[lang]}
                onChange={(e) => handleChange("title", lang, e.target.value)}
              />

              <Input
                placeholder={`Location (${lang.toUpperCase()})`}
                value={form.location[lang]}
                onChange={(e) =>
                  handleChange("location", lang, e.target.value)
                }
              />

              <Textarea
                placeholder={`Description (${lang.toUpperCase()})`}
                value={form.description[lang]}
                onChange={(e) =>
                  handleChange("description", lang, e.target.value)
                }
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
            {initialData ? "Update" : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}