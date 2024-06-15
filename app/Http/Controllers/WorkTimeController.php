<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorkTime;
use Inertia\Inertia;

class WorkTimeController extends Controller
{
    // 特定の作業時間を取得する
    public function show($taskId)
    {
        $workTime = WorkTime::where('task_id', $taskId)->first();

        if ($workTime) {
            return response()->json($workTime);
        }

        return response()->json(null, 404);
    }

    // 特定の作業時間を更新する
    public function update(Request $request, $id)
    {
        $workTime = WorkTime::findOrFail($id);
        $workTime->update([
            'time' => $request->time,
        ]);

        return response()->json($workTime);
    }
}
