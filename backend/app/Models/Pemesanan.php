<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pemesanan extends Model
{
    use HasFactory;
    protected $fillable = ['nama', 'email', 'pertandingan_id', 'status', 'no_hp', 'jumlah_tiket', 'total', 'user_id',];

    public function pertandingan(): BelongsTo
    {
        return $this->belongsTo(Pertandingan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
