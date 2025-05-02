<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Jadwal extends Model
{
    use HasFactory;
    protected $fillable = ['nama_pertandingan','waktu','pertandingan_id'];

    public function pertandingan(): BelongsTo
    {
        return $this->belongsTo(pertandingan::class);
    }
}
