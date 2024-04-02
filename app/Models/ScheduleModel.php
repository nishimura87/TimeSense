<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'progress',
        'due_date'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }     
}
