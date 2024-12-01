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
        'applicants'
    ];

    protected $casts = [
        'media_paths' => 'array',
        'applicants' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
