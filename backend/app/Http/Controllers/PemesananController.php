<?php

namespace App\Http\Controllers;

use App\Models\Pemesanan;
use App\Models\Pertandingan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
            'no_hp' => 'required|string|max:20',
            'jumlah_tiket' => 'required|integer|min:1',
        ]);

        $pertandingan = Pertandingan::findOrFail($request->pertandingan_id);
        $total = $pertandingan->harga * $request->jumlah_tiket;

        $pemesanan = Pemesanan::create([
            ...$validated,
            'total' => $total,
            'user_id' => Auth::id(),
        ]);


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

    public function history()
    {
        $pemesanan = Pemesanan::with('pertandingan')
            ->where('user_id', Auth::id())
            ->get();
    
        return response()->json([
            'message' => 'History berhasil diambil',
            'data' => $pemesanan
        ]);
    }
}
