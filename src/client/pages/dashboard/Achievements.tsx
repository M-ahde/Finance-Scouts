import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Loader2, Save, Trash2, Trophy } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent } from "@/client/components/ui/card";

const AchievementDashboard = () => {
  const queryClient = useQueryClient();
  const isSubmitting = useRef(false);

  const [activeLang, setActiveLang] = useState<"en" | "ar">("en");

  const [formData, setFormData] = useState({
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    date: "",
  });

  /* ================= FETCH ================= */
  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["achievements"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/achievements");
      return res.data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: async () => {
      return axios.post("/api/v1/achievements", formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["achievements"]);
      setFormData({
        title: { en: "", ar: "" },
        description: { en: "", ar: "" },
        date: "",
      });
    },
    onSettled: () => {
      isSubmitting.current = false;
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`/api/v1/achievements/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["achievements"]);
    },
  });

  /* ================= SUBMIT ================= */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting.current || createMutation.isLoading) return;

    isSubmitting.current = true;
    createMutation.mutate();
  };

  return (
    <main>
      <div className="p-6 max-w-6xl mx-auto space-y-10">

        {/* ================= HEADER ================= */}
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Trophy /> Achievements Manager
          </h1>
          <p className="text-muted-foreground mt-1">
            Add and manage your achievements
          </p>
        </div>

        {/* ================= CREATE FORM ================= */}
        <Card className="rounded-2xl shadow-xl">
          <CardContent className="p-8 space-y-6">

            {/* Language Switch */}
            <div className="flex gap-4">
              <Button
                type="button"
                variant={activeLang === "en" ? "default" : "outline"}
                onClick={() => setActiveLang("en")}
              >
                English
              </Button>

              <Button
                type="button"
                variant={activeLang === "ar" ? "default" : "outline"}
                onClick={() => setActiveLang("ar")}
              >
                العربية
              </Button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {activeLang === "en" ? "Title" : "العنوان"}
              </label>

              <input
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary"
                value={formData.title[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: {
                      ...formData.title,
                      [activeLang]: e.target.value,
                    },
                  })
                }
                dir={activeLang === "ar" ? "rtl" : "ltr"}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {activeLang === "en" ? "Description" : "الوصف"}
              </label>

              <textarea
                className="w-full p-3 border rounded-xl h-32 focus:ring-2 focus:ring-primary"
                value={formData.description[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: {
                      ...formData.description,
                      [activeLang]: e.target.value,
                    },
                  })
                }
                dir={activeLang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Date
              </label>

              <input
                type="date"
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary"
                value={formData.date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleSubmit}
              className="w-full py-6 rounded-xl"
              disabled={createMutation.isLoading}
            >
              {createMutation.isLoading ? (
                <Loader2 className="animate-spin me-2" />
              ) : (
                <Save className="me-2" />
              )}
              Add Achievement
            </Button>

          </CardContent>
        </Card>

        {/* ================= LIST ================= */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">
            Existing Achievements
          </h2>

          {isLoading ? (
            <div className="flex justify-center p-10">
              <Loader2 className="animate-spin h-8 w-8" />
            </div>
          ) : achievements.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              No achievements yet.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {achievements.map((item: any) => (
                <Card key={item._id} className="rounded-2xl shadow-md">
                  <CardContent className="p-6 space-y-3">

                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {item.title?.en}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {item.date}
                        </p>
                      </div>

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteMutation.mutate(item._id)}
                        disabled={deleteMutation.isLoading}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>

                    <p className="text-muted-foreground">
                      {item.description?.en}
                    </p>

                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
};

export default AchievementDashboard;