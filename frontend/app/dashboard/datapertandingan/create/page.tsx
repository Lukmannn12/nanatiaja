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
import { useState } from "react";

export default function CreatePertandingan() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [hari, setHari] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [harga, setHarga] = useState<number | string>("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const pertandinganData = {
            name, tanggal, harga, hari,
        };

        console.log("data yang di kirim :", pertandinganData);

        try {
            const response = await axios.post("http://localhost:8000/api/pertandingan", pertandinganData, {
                headers: {
                    "Content-Type": "application/json"
                },
            }
            );
            if (response.status === 201) {
                setOpen(false);
                alert("pertandingan created successfully!");
                window.location.reload();
            } else {
                throw new Error("failed to create pertandingan");
            }
        } catch (error) {
            console.error("error", error);
        }
    }



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="cursor-pointer">Create Produk</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                        Fill in the details to create a new product.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="hari" className="text-right">Hari</Label>
                            <Input
                                id="hari"
                                className="col-span-3"
                                value={hari}
                                onChange={(e) => setHari(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="tanggal" className="text-right">Tanggal</Label>
                            <div className="col-span-3 grid grid-cols-[1fr_auto] items-center gap-2 border rounded-md px-3 py-2">
                                <input
                                    id="tanggal"
                                    type="date"
                                    className="w-full bg-transparent outline-none text-sm"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                />
                            </div>

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="harga" className="text-right">Harga</Label>
                            <Input
                                id="harga"
                                className="col-span-3"
                                type="number"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
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