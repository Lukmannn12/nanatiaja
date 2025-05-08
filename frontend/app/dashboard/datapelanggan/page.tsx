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
import ShowPelangganPage from "./show/page";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


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
    const [showAlert, setShowAlert] = useState(false);
    const searchParams = useSearchParams();

    // Get data
    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8000/api/pemesanan", {
            method: "Get",
            headers: {
                "Content-type": "Application/json",
                Authorization: `Bearer ${token}`, 
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Data Tidak Tersedia datapemesanan");
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

    useEffect(() => {
        const successUpdate = searchParams.get("update");
        if (successUpdate === "success") {
            setShowAlert(true);
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [searchParams])




    return (

        <div className="px-2 xl:px-10 py-5">
            {showAlert && (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-4 right-4 z-50 max-w-sm w-full"
                    >
                        <Alert
                            variant="default"
                            className="shadow-lg bg-green-100 border border-green-300 text-green-800"
                        >
                            <AlertCircle className="h-4 w-4 text-green-600" />
                            <AlertTitle>Status Berhasil Diupdate</AlertTitle>
                            <AlertDescription>
                                Status pelanggan telah berhasil diubah.
                            </AlertDescription>
                        </Alert>
                    </motion.div>
                </AnimatePresence>
            )}
            <Table className="shadow-lg">
                <TableCaption>List of your recent matches.</TableCaption>
                <TableHeader>
                    <TableRow className="text-center">
                        <TableHead className="text-center">No</TableHead>
                        <TableHead className="text-center">Nama</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                        <TableHead className="text-center">Hari</TableHead>
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
                                <TableCell className="text-center space-x-3">
                                    <ShowPelangganPage pelangganData={datapelanggan} />
                                    <EditDatapelangganPage pelangganData={datapelanggan} />
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