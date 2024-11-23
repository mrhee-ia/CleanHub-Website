<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'description',
        'user_id',
        'qualifications',
        'city_id',
        'full_address',
        'schedule',
        'payment',
        'media_paths',
    ];

    protected $casts = [
        'media_paths' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
