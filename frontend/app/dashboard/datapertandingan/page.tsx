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
import { FaRegTrashAlt } from "react-icons/fa";
import axios from "axios";
import CreatePertandingan from "./create/page";
import EditPertandinganPage from "./update/page";
import ShowPertandinganPage from "./show/page";
import DeletePertandinganPage from "./delete/page";

type Pertandingan = {
  id: number
  name: string
  hari: string
  tanggal: string
  harga: number
}

export default function DataPertandinganPage() {

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
    <div className="px-2 xl:px-10 py-5">  
        <CreatePertandingan/>
      <Table className="shadow-lg" >
        <TableCaption>List of your recent matches.</TableCaption>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead className="text-center">No</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Hari</TableHead>
            <TableHead className="text-center">Tanggal</TableHead>
            <TableHead className="text-center">Harga</TableHead>
            <TableHead className="text-center">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pertandingan.length > 0 ? (
            pertandingan.map((pertandingan, index) => (
              <TableRow key={pertandingan.id} className="text-center">
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{pertandingan.name}</TableCell>
                <TableCell>{pertandingan.hari}</TableCell>
                <TableCell >{pertandingan.tanggal}</TableCell>
                <TableCell >
                  Rp {pertandingan.harga.toLocaleString()}
                </TableCell>
                <TableCell className="text-center space-x-3">
                  <ShowPertandinganPage pertandinganData={pertandingan}/>
                  <EditPertandinganPage pertandinganData={pertandingan}/>
                  <DeletePertandinganPage pertandinganData={pertandingan} />
                </TableCell>
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