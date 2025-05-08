<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\PemesananController;
use App\Http\Controllers\PertandinganController;
use App\Http\Controllers\TanggalController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('pertandingan', PertandinganController::class);
Route::resource('jadwal', JadwalController::class);
Route::middleware('auth:api')->resource('pemesanan', PemesananController::class);
Route::middleware('auth:api')->get('history', [PemesananController::class, 'history']);
Route::middleware('auth:api')->get('/countpemesanan', [PemesananController::class,'countPemesanan']);
route::get('/countpertandingan', [PertandinganController::class, 'countPertandingan']);
route::get('/countjadwal', [JadwalController::class, 'countJadwal']);
Route::get('/jadwals-by-hari', [JadwalController::class, 'getByHari']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('datauser', [AuthController::class, 'getAllUsers']);
Route::middleware('auth:api')->post('logout', [AuthController::class, 'logout']);