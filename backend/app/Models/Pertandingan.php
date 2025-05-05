<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pertandingan extends Model
{
    use HasFactory;
    protected $fillable = ['tanggal','name','hari','harga'];

    public function pertandingans(): HasMany 
    {
        return $this->hasMany(Jadwal::class);
    }
}

