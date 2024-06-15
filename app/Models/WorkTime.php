<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WorkTime extends Model
{
    use HasFactory;

    protected $fillable = ['task_id', 'time'];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
