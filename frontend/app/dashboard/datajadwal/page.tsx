"use client"

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import CreateJadwalPage from "./create/page";

type Jadwal = {
    id: number;
    waktu: string;
    nama_pertandingan: string;
    pertandingan_id: number;
    pertandingan: {
        id: number;
        name: string;
        hari: string;
        tanggal: string;
        harga: number;
        created_at: string;
        updated_at: string;
    };
    created_at: string;
    updated_at: string;
};

export default function DataJadwalPage() {

    const [jadwal, setJadwal] = useState<Jadwal[]>([]);
    const [error, setError] = useState<string | null>(null);


    // Get data
    useEffect(() => {
        fetch("http://localhost:8000/api/jadwal", {
            method: "Get",
            headers: {
                "Content-type": "Application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch pertandingan");
                }
                return response.json();
            })
            .then((data) => {
                setJadwal(data.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);



    return (
        <div className="px-2 xl:px-10 py-5">
            <CreateJadwalPage />
            <Table className="shadow-lg">
                <TableCaption>List of your recent matches.</TableCaption>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-center">Pertandingan</TableHead>
                        <TableHead className="text-center">Waktu</TableHead>
                        <TableHead className="text-center">Hari</TableHead>
                        <TableHead className="text-center">Harga</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {jadwal.length > 0 ? (
                        jadwal.map((item, index) => (
                            <TableRow key={item.id} className="text-center">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{item.nama_pertandingan}</TableCell>
                                <TableCell>{item.waktu}</TableCell>
                                <TableCell>{item.pertandingan.hari}</TableCell>
                                <TableCell>Rp {item.pertandingan.harga.toLocaleString()}</TableCell>
                                {/* aksi tombol */}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                {error ? `Error: ${error}` : "Tidak ada data ditemukan"}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    );
}