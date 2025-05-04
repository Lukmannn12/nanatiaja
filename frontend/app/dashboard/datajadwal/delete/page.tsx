import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react"; // optional icon
import axios from "axios";

export default function DeleteJadwalPage({ jadwalData }: { jadwalData: any }) {
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/jadwal/${id}`);
      alert("Produk berhasil dihapus!");
      window.location.reload();
    } catch (error) {
      console.error("Gagal menghapus produk:", error);
      alert("Terjadi kesalahan saat menghapus produk.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer">
        <Trash2 className="w-1 h-1" />
        </Button>   
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Produk</DialogTitle>
        </DialogHeader>
        <p>Apakah kamu yakin ingin menghapus jadwal ini?</p>
        <DialogFooter>
          <Button variant="ghost">Batal</Button>
          <Button variant="destructive" onClick={() => handleDelete(jadwalData.id)}>
            Ya, Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
