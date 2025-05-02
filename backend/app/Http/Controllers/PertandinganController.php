<?php

namespace App\Http\Controllers;

use App\Models\Pertandingan;
use Illuminate\Http\Request;

class PertandinganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pertandingan = Pertandingan::all();
        return response()->json([
            'message' => 'Data pertandingan berhasil diambil',
            'data' => $pertandingan
        ]);
    }

    public function countPertandingan() {

        $total = Pertandingan::count();

        return response() -> json([
            'meesage' => "total pertandingan",
            "total" => $total
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hari' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'harga' => 'required|integer',
        ]);

        $pertandingan = Pertandingan::create($validated);

        return response()->json([
            'message' => "Data berhasil di buat",
            'data' => $pertandingan,
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pertandingan $pertandingan)
    {
        return response()->json([
            'message' => 'Data pertandingan berhasil diambil',
            'data' => $pertandingan,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pertandingan $pertandingan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pertandingan $pertandingan)
    {
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hari' => 'required|string|max:255',
            'tanggal' => 'required|date',
            'harga' => 'required|integer',
        ]);

        $pertandingan->update($validated);

        return response()->json($pertandingan, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pertandingan $pertandingan)
    {
        $pertandingan->delete();

        return response()->json([
            'message' => "produk berhasil di hapus",
        ], 200);
    }
}
