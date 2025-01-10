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
        'application_status',
        'approved_status'
    ];

    protected $casts = [
        'media_paths' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function applicants()
    {
        return $this->belongsToMany(User::class, 'job_applicants', 'job_id', 'applicant_id');
    }
}
