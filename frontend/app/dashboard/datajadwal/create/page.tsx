"use client";

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
import { useEffect, useState } from "react";

export default function CreateJadwalPage() {
  const [open, setOpen] = useState(false);
  const [nama_pertandingan, setNamaPertandingan] = useState("");
  const [waktu, setWaktu] = useState("");
  const [pertandinganId, setPertandinganId] = useState("");
  const [pertandingans, setPertandingans] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/pertandingan")
      .then(res => setPertandingans(res.data.data))
      .catch(err => console.error("Gagal fetch pertandingan", err));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const jadwalData = {
      nama_pertandingan,
      waktu,
      pertandingan_id: parseInt(pertandinganId),
    };

    console.log("Data yang dikirim:", jadwalData);

    try {
      const response = await axios.post("http://localhost:8000/api/jadwal", jadwalData, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      if (response.status === 201) {
        alert("Jadwal berhasil dibuat!");
        setOpen(false);
        window.location.reload();
      } else {
        throw new Error("Gagal membuat jadwal");
      }
    } catch (error) {
      console.error("Error saat submit:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Jadwal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Jadwal</DialogTitle>
          <DialogDescription>
            Lengkapi data untuk membuat jadwal baru.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="pertandingan">Nama Pertandingan</Label>
              <Input
                id="pertandingan"
                className="col-span-3"
                value={nama_pertandingan}
                onChange={(e) => setNamaPertandingan(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label htmlFor="waktu" className="text-right">Waktu</Label>
              <Input
                id="waktu"
                className="col-span-3"
                value={waktu}
                onChange={(e) => setWaktu(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm" >
              <Label htmlFor="pertandingan_id">Pilih Pertandingan</Label>
              <select
                id="pertandingan_id"
                className="col-span-3 border rounded px-2 py-1"
                value={pertandinganId}
                onChange={(e) => setPertandinganId(e.target.value)}
                required
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
            <Button type="submit">Simpan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
