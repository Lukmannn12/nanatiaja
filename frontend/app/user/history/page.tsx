"use client"

import { NavbarUserPage } from "@/components/navbar";
import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"



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
export default function HistoryPage() {

    const [datapelanggan, setDataPelanggan] = useState<DataPelanggan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [showAlert, setShowAlert] = useState(false);

    // Get data
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8000/api/history", {
            method: "Get",
            headers: {
                "Content-type": "Application/json",
                Authorization: `Bearer ${token}`, 
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
        <div>
            <NavbarUserPage />
            <div className="py-20">
                <div className="container mx-auto">
                    <Table className="shadow-lg">
                        <TableCaption>List of your recent matches.</TableCaption>
                        <TableHeader>
                            <TableRow className="text-center">
                                <TableHead className="text-center">No</TableHead>
                                <TableHead className="text-center">Nama</TableHead>
                                <TableHead className="text-center">Email</TableHead>
                                <TableHead className="text-center">Hari</TableHead>
                                <TableHead className="text-center">Status</TableHead>
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
                                        <TableCell>
                                            {datapelanggan.status === "paid" ? (
                                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-5 py-2 rounded-full">
                                                    Paid
                                                </span>
                                            ) : (
                                                <span className="bg-red-100 text-red-800 text-xs font-semibold px-3 py-1 rounded-full">
                                                    Unpaid
                                                </span>
                                            )}
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

            </div>
        </div>
    )
}