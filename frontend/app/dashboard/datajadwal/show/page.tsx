"use client"

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
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";

export default function ShowJadwalPage({ jadwalData }: any) {

    const [open, setOpen] = useState(false);

    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer" variant="outline">
            <FaEye className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detail Jadwal Pertandingan</DialogTitle>
            <DialogDescription>
              Berikut detail lengkap dari jadwal pertandingan.
            </DialogDescription>
          </DialogHeader>
  
          <div className="grid gap-4 py-4 text-sm">
            <div className="grid grid-cols-4 gap-4">
              <Label>Nama Pertandingan</Label>
              <div className="col-span-3">{jadwalData.nama_pertandingan}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label>Waktu</Label>
              <div className="col-span-3">{jadwalData.waktu}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label>Hari</Label>
              <div className="col-span-3">{jadwalData.pertandingan.hari}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label>Tanggal</Label>
              <div className="col-span-3">{jadwalData.pertandingan.tanggal}</div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Label>Harga</Label>
              <div className="col-span-3">
                Rp {jadwalData.pertandingan.harga.toLocaleString()}
              </div>
            </div>
          </div>
  
          <DialogFooter>
            <Button onClick={() => setOpen(false)}>Tutup</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
