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

    public function countJadwal()
    {

        $total = Jadwal::count();

        return response()->json([
            'meesage' => "total jadwal",
            "total" => $total
        ], 200);
    }

    public function getByHari(Request $request)
    {
        $hari = $request->query('hari');

        $jadwals = Jadwal::with('pertandingan')
            ->whereHas('pertandingan', function ($query) use ($hari) {
                $query->where('hari', $hari);
            })
            ->get();

        return response()->json([
            'hari' => $hari,
            'jadwals' => $jadwals,
        ]);
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
        $jadwal = Jadwal::with('pertandingan')->get();

        return response()->json([
            'message' => 'data berhasil diambil',
            'data' => $jadwal
        ]);
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
        $validated = $request->validate([
            'pertandingan_id' => 'required|exists:pertandingans,id',
            'waktu' => 'required|string|max:255',
            'nama_pertandingan' => 'required|string|max:255',
        ]);

        $jadwal->update($validated);

        return response()->json([
            'message' => 'data berhasil di update',
            'data' => $jadwal
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jadwal $jadwal)
    {
        $jadwal->delete();

        return response()->json([
            'message' => "produk berhasil di hapus",
        ], 200);
    }
}
