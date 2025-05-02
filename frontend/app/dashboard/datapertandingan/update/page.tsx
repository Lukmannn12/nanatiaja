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


export default function EditPertandinganPage({ pertandinganData }: any) {

    const [pertandingan, setPertandingan] = useState(pertandinganData)
    const [open, setOpen] = useState(false)

    useEffect(() => { console.log(pertandingan) }, [pertandingan])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setPertandingan((prev: any) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        axios.put(`http://127.0.0.1:8000/api/pertandingan/${pertandingan.id}`, pertandingan,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(() => {
                alert("pertandingan berhasil di update!")
                setOpen(false)
                window.location.reload()
            })
            .catch((error) => {
                console.error("gagal update", error)
            })
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                <Pencil className="w-1 h-1" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Edit Produk</DialogTitle>
                        <DialogDescription>
                            Ubah data produk lalu klik "Save changes".
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={pertandingan.name}
                                onChange={handleChange}
                                required
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="hari" className="text-right">Hari</Label>
                            <Input
                                id="hari"
                                className="col-span-3"
                                value={pertandingan.hari}
                                onChange={handleChange}
                                 name="hari"
                                 required

                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tanggal" className="text-right">Tanggal</Label>
                            <div className="col-span-3 grid grid-cols-[1fr_auto] items-center gap-2 border rounded-md px-3 py-2">
                                <input
                                    id="tanggal"
                                    type="date"
                                    className="w-full bg-transparent outline-none text-sm"
                                    value={pertandingan.tanggal}
                                    onChange={handleChange}
                                    name="tanggal"
                                    required

                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="harga" className="text-right">Harga</Label>
                            <Input
                                id="harga"
                                className="col-span-3"
                                type="number"
                                value={pertandingan.harga}
                                onChange={handleChange}
                                name="harga"
                                 required

                            />
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