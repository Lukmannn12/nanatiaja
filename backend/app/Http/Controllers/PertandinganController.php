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
            'message' => 'Daftar semua pertandingan',
            'data' => $pertandingan
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'hari' => 'required|string|max:20',
            'tanggal' => 'required|date',
            'harga' => 'required|integer'
        ]);

        $pertandingan = Pertandingan::create($validated);

        return response()->json([
            'message' => 'data berhasil di buat',
            'data' => $pertandingan
        ],201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pertandingan $pertandingan)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pertandingan $pertandingan)
    {
        //
    }
}
