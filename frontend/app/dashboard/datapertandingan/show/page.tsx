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


export default function EditPertandinganPage({ pertandinganData }: any) {

    const [pertandingan, setPertandingan] = useState(pertandinganData)

    useEffect(() => { console.log(pertandingan) }, [pertandingan])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPertandingan((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">
                    <FaEye className="w-1 h-1"/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Detail Produk</DialogTitle>
                    <DialogDescription>
                        Informasi lengkap tentang produk yang dipilih.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Name</Label>
                        <div className="col-span-3 text-sm">{pertandingan.name}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Hari</Label>
                        <div className="col-span-3 text-sm">{pertandingan.hari}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Tanggal</Label>
                        <div className="col-span-3 text-sm">{pertandingan.tanggal}</div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Harga</Label>
                        <div className="col-span-3 text-sm">Rp {pertandingan.harga}</div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>

    )
}