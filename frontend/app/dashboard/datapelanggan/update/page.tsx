import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function EditDatapelangganPage({ pelangganData }: any) {
    const [pelanggan, setPelanggan] = useState({
        id: pelangganData.id,
        status: pelangganData.status, 
    });

    const [pertandingans, setPertandingans] = useState<any[]>([]);
    const [open, setOpen] = useState(false);

    // Fetch Pertandingan data when dialog is opened
    const fetchPertandingans = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/api/pertandingan");
            setPertandingans(res.data.data);
        } catch (err) {
            console.error("Gagal fetch pertandingans", err);
        }
    };

    useEffect(() => {
        if (open) {
            fetchPertandingans();
        }
    }, [open]);

    // Handle change of input fields
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPelanggan((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
    try {
        const token = localStorage.getItem("token");
        const res = await axios.put(
            
            `http://127.0.0.1:8000/api/pemesanan/${pelanggan.id}`,
            pelanggan,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`, 
              },
            }
          );

        console.log("Data yang berhasil diupdate dari backend:", res.data.data);
        setOpen(false);
        window.location.href = "/dashboard/datapelanggan?update=success";
    } catch (error) {
        console.error("Gagal update:");
    }
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                    <Pencil className="w-1 h-1" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Jadwal Pertandingan</DialogTitle>
                        <DialogDescription>
                            Ubah data pertandingan lalu klik "Save changes".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 gap-4">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                name="status"
                                className="col-span-3 border rounded px-3 py-2 text-sm"
                                value={pelanggan.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="unpaid" className="text-sm">Unpaid</option>
                                <option value="paid" className="text-sm">Paid</option>
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}