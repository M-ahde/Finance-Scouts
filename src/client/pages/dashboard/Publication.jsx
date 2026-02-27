import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Save, ArrowLeft, Loader2, Upload } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent } from "@/client/components/ui/card";

const PublicationEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = Boolean(id);

  const [activeLang, setActiveLang] = useState("en");
  const [file, setFile] = useState(null);
  const isSubmitting = useRef(false);

  const [formData, setFormData] = useState({
    title: { en: "", ar: "" },
    description: { en: "", ar: "" },
    type: { en: "", ar: "" },
  });

  // جلب البيانات
  const { isLoading } = useQuery({
    queryKey: ["publication", id],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/publications/${id}`);
      setFormData(res.data);
      return res.data;
    },
    enabled: isEditMode,
  });

  const mutation = useMutation({
    mutationFn: async () => {
      const data = new FormData();
      data.append("title", JSON.stringify(formData.title));
      data.append("description", JSON.stringify(formData.description));
      data.append("type", JSON.stringify(formData.type));
      if (file) data.append("file", file);

      return isEditMode
        ? axios.put(`/api/v1/publications/${id}`, data)
        : axios.post(`/api/v1/publications`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["publications"]);
      navigate("/dashboard/publications");
    },
    onSettled: () => {
      isSubmitting.current = false;
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting.current || mutation.isLoading) return;
    isSubmitting.current = true;
    mutation.mutate();
  };

  if (isLoading)
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );

  return (
    <main>
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="me-2 h-4 w-4" /> Back
          </Button>
          <h2 className="text-2xl font-bold">
            {isEditMode ? "Edit Publication" : "New Publication"}
          </h2>
        </div>

        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-8 space-y-6">

            {/* Language Tabs */}
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
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                value={formData.title[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: { ...formData.title, [activeLang]: e.target.value }
                  })
                }
                required
                dir={activeLang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                {activeLang === "en" ? "Description" : "الوصف"}
              </label>
              <textarea
                className="w-full p-3 border rounded-xl h-32 focus:ring-2 focus:ring-blue-500"
                value={formData.description[activeLang]}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: { ...formData.description, [activeLang]: e.target.value }
                  })
                }
                dir={activeLang === "ar" ? "rtl" : "ltr"}
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Type
              </label>
              <input
                className="w-full p-3 border rounded-xl"
                value={formData.type.en}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: { ...formData.type, en: e.target.value }
                  })
                }
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Upload PDF
              </label>

              <div className="border-2 border-dashed p-6 rounded-xl text-center hover:bg-gray-50 transition cursor-pointer">
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  id="fileUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  <Upload className="mx-auto mb-2" />
                  {file ? file.name : "Click to upload PDF"}
                </label>
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              className="w-full py-6 rounded-xl"
              disabled={mutation.isLoading || isSubmitting.current}
            >
              {mutation.isLoading ? (
                <Loader2 className="animate-spin me-2" />
              ) : (
                <Save className="me-2" />
              )}
              {isEditMode ? "Update Publication" : "Publish"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PublicationEditor;