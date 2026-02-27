import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Plus, Trash2, Pencil } from "lucide-react";
import { Card, CardContent } from "@/client/components/ui/card";
import { Button } from "@/client/components/ui/button";
import WorkshopFormModal from "@/client/components/dashboard/WorkshopFormModal";
import { useToast } from "@/client/components/ui/use-toast";
import { CheckCircle, AlertTriangle } from "lucide-react";
import ConfirmDeleteDialog from "@/client/components/dashboard/ConfirmDeleteDialog";

const fetchWorkshops = async () => {
  const res = await axios.get("/api/v1/workshops");
  return res.data;
};

export default function DashboardWorkshops() {
  const queryClient = useQueryClient();
  const { data: workshops = [] } = useQuery({
    queryKey: ["workshops"],
    queryFn: fetchWorkshops,
  });
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

const saveMutation = useMutation({
    mutationFn: async (data: any) => {
      if (selected) {
        return axios.put(`/api/v1/workshops/${selected._id}`, data);
      }
      return axios.post("/api/v1/workshops", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workshops"] });

      toast({
        title: selected
          ? "Workshop Updated"
          : "Workshop Created",
        description: selected
          ? "The workshop has been successfully updated."
          : "The workshop has been successfully added.",
      });

      setOpen(false);
      setSelected(null);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again.",
      });
    },
  });
const onSubmits = (formData: any) => {
  // هنا نرسل البيانات كما هي إلى saveMutation
  saveMutation.mutate(formData);
};
  // ================= DELETE =================
const [deleteTarget, setDeleteTarget] = useState<any>(null);
const [confirmOpen, setConfirmOpen] = useState(false);

const deleteMutation = useMutation({
  mutationFn: async (id: string) =>
    axios.delete(`/api/v1/workshops/${id}`),

  onSuccess: (_, id) => {
    queryClient.invalidateQueries({ queryKey: ["workshops"] });

    toast({
      title: "Workshop Deleted",
      description: `"${deleteTarget.title.en}" removed successfully.`,
      action: (
        <button
          className="text-blue-500 underline"
          onClick={() => {
            axios.post("/api/v1/workshops", deleteTarget);
            queryClient.invalidateQueries({
              queryKey: ["workshops"],
            });
          }}
        >
          Undo
        </button>
      ),
    });

    setConfirmOpen(false);
  },

  onError: () => {
    toast({
      variant: "destructive",
      title: "Delete failed",
      description: "Something went wrong.",
    });
  },
});


  return (
    <main>
      <div className="p-6 flex flex-col gap-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Workshops</h1>
          <Button onClick={() => setOpen(true)}>
            <Plus size={16} className="mr-2" />
            Add Workshop
          </Button>
        </div>

        {/* List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((w: any) => (
            <Card key={w._id} className="hover:shadow-lg transition">
              <CardContent className="p-6 space-y-2">
                <h3 className="font-bold text-lg">{w.title.en}</h3>
                <p className="text-sm text-muted-foreground">
                  {w.date} • {w.time}
                </p>
                <p className="text-sm">{w.location.en}</p>

                <div className="flex gap-2 pt-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      setSelected(w);
                      setOpen(true);
                    }}
                  >
                    <Pencil size={14} />
                  </Button>

            <Button
  size="sm"
  variant="destructive"
  onClick={() => {
    setDeleteTarget(w);
    setConfirmOpen(true);
  }}
>
  Delete
</Button>

                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
      <WorkshopFormModal
  open={open}
  onClose={() => {
    setOpen(false);
    setSelected(null);
  }}
  initialData={selected}
  onSubmit={onSubmits}
/>
      </div>
      <ConfirmDeleteDialog
  open={confirmOpen}
  onClose={() => setConfirmOpen(false)}
  title={deleteTarget?.title?.en}
  isLoading={deleteMutation.isPending}
  onConfirm={() =>
    deleteMutation.mutate(deleteTarget._id)
  }
/>

    </main>
  );
}
