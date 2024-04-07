<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Schedule;

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
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'title' => 'required|string|max:255',
            // 他の必要なバリデーションルールを追加
            'description' => 'nullable|string',
            'start' => 'required|date',
            'end' => 'required|date',
        ]);

        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description; // もしTasksテーブルにdescriptionカラムがある場合
        $task->start = $request->start; // もしstartカラムがある場合
        $task->end = $request->end; // もしendカラムがある場合
        $task->save();

        return response()->json($task, 201);
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
