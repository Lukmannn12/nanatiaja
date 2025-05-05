"use client"

import { NavbarUserPage } from "@/components/navbar";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { CalendarCheck, CreditCard, Ticket } from "lucide-react";
import { useEffect, useState } from "react";


export default function FormPemesananPage() {
    const [pertandinganId, setPertandinganId] = useState("");
    const [pertandingans, setPertandingans] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8000/api/pertandingan")
            .then(res => setPertandingans(res.data.data))
            .catch(err => console.error("Gagal fetch pertandingan", err));
    }, []);

    return (
        <div>
            <NavbarUserPage />
            <section id="tiket" className="pt-32">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <h1 className="font-medium text-[#013C67] text-sm">Pemesanan Tiket</h1>
                    <h1 className="font-bold text-black text-xl py-5">
                        Tiket Futsal Mudah, Praktis, dan Terjamin!
                    </h1>
                    <p className="font-extralight text-[#191E25] text-sm leading-6 mx-auto text-center">
                        Tidak perlu repot lagi! Di Gamagudabo, Anda dapat membeli tiket futsal untuk menyaksikan
                        pertandingan favorit dengan cara yang cepat, aman, dan praktis. Kami menyediakan platform
                        pemesanan tiket berbayar yang memudahkan Anda untuk mendapatkan tiket masuk ke berbagai
                        pertandingan futsal—baik itu event lokal maupun kompetisi besar.
                    </p>

                    <div className="flex flex-col py-10 px-5 space-y-5">
                        <div className="flex flex-row space-x-3">
                            <CalendarCheck className="text-[#8e66ff]" size={24} />
                            <p className="font-medium text-sm text-[#191E25]">Pilih Tanggal Pertandingan</p>
                        </div>
                        <div className="flex flex-row space-x-3">
                            <Ticket className="text-[#ff723b]" size={24} />
                            <p className="font-medium text-sm text-[#191E25]">Total Tiket</p>
                        </div>
                        <div className="flex flex-row space-x-3">
                            <CreditCard className="text-[#f14c5d]" size={24} />
                            <p className="font-medium text-sm text-[#191E25]">Lakukan pembayaran</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="form" className="pt-10">
                <div className="bg-[#095D7E]">
                    <div className="max-w-4xl mx-auto px-4 py-10">
                        <h1 className="font-semibold text-2xl text-white text-center mb-2">Pemesanan Tiket</h1>
                        <p className="font-light text-base text-white text-center mb-8">
                            Pesan tiket futsal dengan mudah! Pilih pertandingan, tentukan tempat duduk, dan bayar dengan aman
                        </p>
                        <form>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="nama" className="block text-white text-sm font-medium mb-1">Nama</label>
                                    <input
                                        type="text"
                                        id="nama"
                                        name="nama"
                                        className="w-full h-10 px-4 border text-sm text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Masukkan Nama"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-white text-sm font-medium mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full h-10 px-4 border text-sm text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Masukkan Email"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="no_hp" className="block text-white text-sm font-medium mb-1">No Handphone</label>
                                    <input
                                        type="text"
                                        id="no_hp"
                                        name="no_hp"
                                        className="w-full h-10 px-4 border text-sm text-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Masukkan Nomor HP"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="jumlah_tiket" className="block text-white text-sm font-medium mb-1">Jumlah Tiket</label>
                                    <input
                                        type="number"
                                        id="jumlah_tiket"
                                        name="jumlah_tiket"
                                        min="1"
                                        className="w-full h-10 px-4 border text-sm text-white border-gray-300 rounded-md shadow-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        placeholder="Masukkan Jumlah Tiket"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="pertandingan_id" className="block text-white text-sm font-medium mb-1">
                                        Pilih Pertandingan
                                    </label>
                                    <select
                                        id="pertandingan_id"
                                        name="pertandingan_id"
                                        value={pertandinganId}
                                        onChange={(e) => setPertandinganId(e.target.value)}
                                        className="w-full h-10 px-4 border text-sm text-white bg-[#095D7E] border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        required
                                    >
                                        <option value="">-- Pilih Pertandingan --</option>
                                        {pertandingans.map((p: any) => (
                                            <option key={p.id} value={p.id}>
                                                {p.name} - {p.hari}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                            </div>
                            <div className="flex justify-center mt-8">
                                <button type="submit" className="bg-[#FF723B] px-12 py-2 rounded-full text-white font-semibold hover:bg-orange-500 transition">
                                    Pesan
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>


        </div>
    )
}