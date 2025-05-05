import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import React, {useState } from "react";


export default function ShowDetailPage({ hari }: { hari: string }) {
    const [detailJadwals, setDetailJadwals] = useState<any[]>([]);

    const handleLihatDetail = (hari: string) => {
        fetch(`http://localhost:8000/api/jadwals-by-hari?hari=${hari}`)
            .then((res) => res.json())
            .then((data) => {
                setDetailJadwals(data.jadwals);
            });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button onClick={() => handleLihatDetail(hari)}>
                    Lihat Detail Pertandingan
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Jadwal Pertandingan</DialogTitle>
                    <DialogDescription>
                        Berikut adalah jadwal pertandingan hari {hari}.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {detailJadwals.length > 0 ? (
                        detailJadwals.map((jadwal, idx) => (
                            <div key={idx} className="mb-2">
                                <p className="font-medium">{jadwal.nama_pertandingan}</p>
                                <p className="text-sm text-gray-600">{jadwal.waktu}</p>
                            </div>
                        ))
                    ) : (
                        <p>Tidak ada jadwal.</p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
