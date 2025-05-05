<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pemesanan extends Model
{
    use HasFactory;
    protected $fillable = ['nama','email','pertandingan_id','status'];

    public function pertandingan(): BelongsTo
    {
        return $this->belongsTo(Pertandingan::class);
    }
}
