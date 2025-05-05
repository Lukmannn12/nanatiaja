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
import EditDatapelangganPage from "./update/page";
import CreatePelangganPage from "./create/page";
import ShowPelangganPage from "./show/page";



type DataPelanggan = {
    id: number;
    nama: string;
    email: string;
    status: string;
    total: number;
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

export default function DatPelangganPage() {

    const [datapelanggan, setDataPelanggan] = useState<DataPelanggan[]>([]);
    const [error, setError] = useState<string | null>(null);


    // Get data
    useEffect(() => {
        fetch("http://localhost:8000/api/pemesanan", {
            method: "Get",
            headers: {
                "Content-type": "Application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch datapemesanan");
                }
                return response.json();
            })
            .then((data) => {
                setDataPelanggan(data.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);




    return (
        <div className="px-2 xl:px-10 py-5">
            <CreatePelangganPage/>
            <Table className="shadow-lg">
                <TableCaption>List of your recent matches.</TableCaption>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-center">Nama</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-center">Aksi</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {datapelanggan.length > 0 ? (
                        datapelanggan.map((datapelanggan, index) => (
                            <TableRow key={datapelanggan.id} className="text-center">
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{datapelanggan.nama}</TableCell>
                                <TableCell>{datapelanggan.email}</TableCell>
                                <TableCell>{datapelanggan.pertandingan.hari}</TableCell>
                                <TableCell>{datapelanggan.status}</TableCell>
                                <TableCell>
                                    <ShowPelangganPage pelangganData={datapelanggan}/>
                                    <EditDatapelangganPage pelangganData={datapelanggan}/>
                                    </TableCell>
                                
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                {error ? `Error: ${error}` : "Tidak ada data ditemukan"}
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

        </div>
    );
}