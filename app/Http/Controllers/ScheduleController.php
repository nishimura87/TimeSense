<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\Task;

class ScheduleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userId = auth()->id();
        $schedules = Schedule::with(['task'])
            ->where('user_id', $userId)
            ->get();

        if ($request->wantsJson()) {
            // APIリクエストの場合はJSONを返す
            return response()->json($schedules);
        }

        return Inertia::render('Schedules/Index', [
            'schedules' => $schedules
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // スケジュール情報のバリデーション
        $validatedSchedule = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
            'title' => 'required|string|max:255',
        ]);

        // スケジュールの作成
        $schedule = Schedule::create([
            'start_time' => $validatedSchedule['start'],
            'end_time' => $validatedSchedule['end'],
        ]);

        // タスクの作成
        $task = Task::create(['title' => $validatedSchedule['title']]);

        // 中間テーブルでタスクとスケジュールを紐づけ
        $task->schedules()->attach($schedule->id);

        return response()->json(['message' => 'Schedule and Task created successfully'], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
