import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/client/components/ui/button";
import { Card, CardContent } from "@/client/components/ui/card";

const PublicationView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["publication", id],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/publications/${id}`);
      return res.data;
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
      <div className="p-6 max-w-4xl mx-auto space-y-6">

        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="me-2 h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">
              {data?.title?.en}
            </h2>

            <p className="text-gray-600">
              {data?.description?.en}
            </p>

            <div>
              <span className="font-semibold">Type:</span> {data?.type?.en}
            </div>

            {data?.fileUrl && (
              <div>
                <a
                  href={data.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  View PDF
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default PublicationView;