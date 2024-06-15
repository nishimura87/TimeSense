<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkTime;

class WorkTimeController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'time' => 'required|integer'
        ]);

        $workTime = new WorkTime;
        $workTime->task_id = $validatedData['task_id'];
        $workTime->time = $validatedData['time'];
        $workTime->save();

        return response()->json(['message' => 'Time saved successfully'], 201);
    }
}
