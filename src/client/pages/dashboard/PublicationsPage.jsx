import { useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus, Eye, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent } from "@/client/components/ui/card";

const PublicationsPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["publications"],
    queryFn: async () => {
      const res = await axios.get("/api/v1/publications");
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`/api/v1/publications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["publications"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin h-8 w-8" />
      </div>
    );
  }

  return (
    <main>
      <div className="p-6 max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Publications</h2>
          <Button onClick={() => navigate("/dashboard/publications/new")}>
            <Plus className="me-2 h-4 w-4" />
            New Publication
          </Button>
        </div>

        {/* List */}
        <div className="grid gap-4">
          {data?.length === 0 && (
            <p className="text-gray-500">No publications found.</p>
          )}

          {data?.map((item) => (
            <Card key={item._id} className="shadow-md rounded-2xl">
              <CardContent className="p-6 flex justify-between items-center">
                
                <div>
                  <h3 className="font-semibold text-lg">
                    {item.title?.en}
                  </h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description?.en}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/dashboard/publications/view/${item._id}`)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate(`/dashboard/publications/edit/${item._id}`)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>

                  <Button
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default PublicationsPage;