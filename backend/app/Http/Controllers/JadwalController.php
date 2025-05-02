<?php

namespace App\Http\Controllers;

use App\Models\Jadwal;
use Illuminate\Http\Request;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jadwal = Jadwal::with('pertandingan')->get();

        return response()->json([
            'message' => 'data berhasil di ambil',
            'data' => $jadwal
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
            'pertandingan_id' => 'required|exists:pertandingans,id',
            'waktu' => 'required|string|max:255',
            'nama_pertandingan' => 'required|string|max:255',
        ]);
    
        $jadwal = Jadwal::create($validated);

        return response()->json([
            'message' => 'data berhasil di buat',
            'data' => $jadwal
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Jadwal $jadwal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jadwal $jadwal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jadwal $jadwal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jadwal $jadwal)
    {
        //
    }
}
