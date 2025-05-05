<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use Illuminate\Http\Request;

class PemesananController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pemesanan = Pemesanan::with('pertandingan')->get();
        return response()->json([
            'message' => 'data berhasil di ambil',
            'data' => $pemesanan
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
            'nama' => 'required|string|max:255',
            'email' => 'required|email',
            'status' => 'required|in:paid,unpaid',
        ]);

        $pemesanan = Pemesanan::create($validated);

        return response()->json([
            'message' => 'data berhasil di buat',
            'data' => $pemesanan
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pemesanan $pemesanan)
    {
        $validated = $request->validate([
            'status' => 'required|in:paid,unpaid',
        ]);
    
        $pemesanan->update([
            'status' => $validated['status'],
        ]);
    
        return response()->json([
            'message' => 'Status berhasil diperbarui',
            'data' => $pemesanan
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
