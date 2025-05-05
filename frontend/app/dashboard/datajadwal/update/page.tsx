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
import React, { useEffect, useState } from "react";

export default function EditJadwalPage({ jadwalData }: any) {
    const [jadwal, setJadwal] = useState({
        id: jadwalData.id,
        nama_pertandingan: jadwalData.nama_pertandingan,
        waktu: jadwalData.waktu,
        pertandingan_id: jadwalData.pertandingan_id, // ini harus sama dengan field yang di-backend
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
        setJadwal((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://127.0.0.1:8000/api/jadwal/${jadwal.id}`,
                jadwal,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
    
            console.log("Data yang berhasil diupdate dari backend:", res.data.data);
            alert("Jadwal berhasil diupdate!");
            setOpen(false);
            window.location.reload();
        } catch (error) {
            console.error("Gagal update:", error);
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
                        {/* Nama Pertandingan */}
                        <div className="grid grid-cols-4 gap-4">
                            <Label htmlFor="nama_pertandingan">Nama Pertandingan</Label>
                            <Input
                                id="nama_pertandingan"
                                className="col-span-3"
                                value={jadwal.nama_pertandingan}
                                onChange={handleChange}
                                required
                                name="nama_pertandingan"
                            />
                        </div>

                        {/* Waktu Pertandingan */}
                        <div className="grid grid-cols-4 gap-4">
                            <Label htmlFor="waktu" className="text-right">Waktu</Label>
                            <Input
                                id="waktu"
                                className="col-span-3"
                                value={jadwal.waktu}
                                onChange={handleChange}
                                required
                                name="waktu"
                            />
                        </div>

                        {/* Dropdown Pilih Pertandingan */}
                        <div className="grid grid-cols-4 gap-4 text-sm">
                            <Label htmlFor="pertandingan_id">Pilih Pertandingan</Label>
                            <select
                                id="pertandingan_id"
                                className="col-span-3 border rounded px-2 py-1"
                                value={jadwal.pertandingan_id}
                                onChange={handleChange}
                                required
                                name="pertandingan_id"
                            >
                                <option value="">-- Pilih Pertandingan --</option>
                                {pertandingans.map((p: any) => (
                                    <option key={p.id} value={p.id}>
                                        {p.name} - {p.hari} ({p.tanggal})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
