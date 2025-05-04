"use client"

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ShowDetailPage from "./showdetail/page";

type Pertandingan = {
    id: number
    name: string
    hari: string
    tanggal: string
    harga: number
}


export default function HomePage() {
    const [pertandingan, setPertandingan] = useState<Pertandingan[]>([]);
    const [error, setError] = useState<string | null>(null);

    // Get data
    useEffect(() => {
        fetch("http://localhost:8000/api/pertandingan", {
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
                setPertandingan(data.data);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);



    return (
        <div>
            <div className="pt-20">
                <div className="max-w-screen-xl mx-auto justify-center items-center">
                    <div className="flex justify-center items-center">
                        <div className="flex flex-col items-center justify-center">
                            <h2 className="font-semibold text-[17px] text-[#013C67]">DUKUNG TIM FAVORITE MU, MENANGKAN MOMENT FUTSAL</h2>
                            <h1 className="font-bold text-[26px] py-4">Semua di Gamagudabo Championship!</h1>
                            <p className="font-extralight text-sm text-justify leading-6 pb-5">Gamagudabo adalah destinasi utama yang menyediakan segala kebutuhan para penggemar futsal, pemain, dan tim yang ingin merasakan pengalaman futsal yang seru, mendebarkan, dan tak terlupakan. Kami hadir dengan solusi lengkap untuk semua hal yang berhubungan dengan dunia futsal, mulai dari informasi jadwal pertandingan, pembelian tiket nonton futsal, hingga pendaftaran tim untuk berbagai turnamen futsal yang kami selenggarakan. Gamagudabo memudahkan Anda untuk tetap terhubung dengan dunia futsal di manapun dan kapanpun. Kami memberikan akses langsung ke berbagai informasi penting, seperti jadwal pertandingan yang selalu diperbarui dan pembelian tiket yang cepat dan aman.
                            </p>
                            <a href="/tiket">
                                <button className="bg-white border border-[#013C67] w-[282px] h-[46px] rounded-xl hover:bg-slate-100">
                                    <span className="text-[#013C67] font-medium text[15px]">Pesan Tiket</span>
                                </button>
                            </a>
                            <div className="flex flex-row py-5 space-x-5">
                                <div className="bg-[#013C67] rounded-lg px-2 py-1 cursor-pointer">
                                    <i className="fa-brands fa-instagram text-white fa-lg"></i>
                                </div>
                                <div className="bg-[#013C67] rounded-lg px-2 py-1 cursor-pointer">
                                    <i className="fa-brands fa-youtube fa-instagram text-white fa-lg"></i>
                                </div>
                                <div className="bg-[#013C67] rounded-lg px-2 py-1 cursor-pointer">
                                    <i className="fa-brands fa-tiktok text-white fa-lg"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto container py-20">
                <div className="py-10">
                    <div className="max-w-6xl mx-auto flex justify-center items-center bg-white rounded-xl">
                        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 px-4 space-x-14 py-6 lg:space-y-0 md:space-y-8 sm:space-y-14 ">
                            <div className="space-y-3 w-[361px] h-[63px]">
                                <h1 className="font-medium text-2xl">Great Deals For You</h1>
                                <p className="font-extralight text-sm">Tunggu Apa Lagi? Temukan Tiket Futsal dengan Harga Spesial dan Jadwal Pertandingan Terbaru. Pesan Sekarang dan Nikmati Permainan!</p>
                            </div>
                            <div className="relative flex flex-col w-[277px] h-[187px]">
                                <div className="absolute inset-0 bg-[#013C67] opacity-10 z-0"></div>
                                <div className="relative px-4 py-4 flex-col space-y-2">
                                    <div className="flex items-center justify-center w-[60px] h-[60px] text-white text-3xl bg-[#013C67] rounded-full">
                                        <i className="fa-solid fa-ticket fa-sm"></i>
                                    </div>
                                    <p className="text-black font-light text-xs text-justify pt-2">Beli tiket pertandingan futsal favorit Anda secara online kapan saja. Pilih pertandingan, tentukan tempat duduk, dan bayar dengan aman. </p>
                                </div>
                            </div>
                            <div className="relative flex flex-col w-[277px] h-[187px]">
                                <div className="absolute inset-0 bg-[#013C67] opacity-10 z-0"></div>
                                <div className="relative px-4 py-4 flex-col space-y-2">
                                    <div className="flex items-center justify-center w-[60px] h-[60px] text-white text-3xl bg-[#FF543E] rounded-full">
                                        <i className="fa-solid fa-calendar-days fa-sm"></i>
                                    </div>
                                    <p className="text-black font-light text-xs text-justify pt-2">Dapatkan informasi lengkap tentang waktu, lokasi, dan tim yang bertanding. Jangan lewatkan pertandingan seru dan selalu tahu jadwalnya dengan kami! </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto justify-center items-center">
                <div className="text-center space-y-2">
                    <h1 className="text-[#013C67] font-semibold text-2xl">Jadwal Pertandingan</h1>
                    <p className="text-[#013C67] font-light text-sm lg:px-72 sm:px-5">Lihat Jadwal Lengkap Pertandingan Futsal, Temukan Pertandingan Favoritmu, dan Siapkan Dirimu untuk Menonton Aksi Seru di Lapangan!</p>
                </div>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-6 py-20">
                    {pertandingan.map((pertandingan, index) => (
                        <div key={index} className="bg-white flex flex-col items-center justify-center p-6 rounded-lg shadow-lg">
                            <i className="fa-solid fa-calendar-days fa-2xl text-[#013C67] py-5"></i>
                            <h1 className="text-md font-bold text-gray-800 py-2">{pertandingan.hari}</h1>
                            <h1 className="text-sm font-bold text-[#013C67]">{pertandingan.name}</h1>
                            <p className="font-extralight text-sm py-2 text-black">{pertandingan.tanggal}</p>
                            <p className="text-[#FF543E] font-bold text-sm py-3">Harga : Rp {pertandingan.harga}</p>
                            <ShowDetailPage hari={pertandingan.hari} />
                        </div>
                    ))}
                </div>
            </div>
        </div>


    )
}