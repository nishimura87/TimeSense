<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'task_id',
        'start_date',
        'end_date',
        'memo'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }                    
}