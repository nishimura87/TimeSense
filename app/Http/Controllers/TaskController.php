<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\WorkTime;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use App\Http\Requests\TaskRequest;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request): Response
    {
        $selectedMonth = $request->input('month');
        $tasksQuery = Auth::user()->tasks();

        if ($selectedMonth) {
            $tasksQuery->whereMonth('created_at', date('m', strtotime($selectedMonth)))
                ->whereYear('created_at', date('Y', strtotime($selectedMonth)));
        }

        $tasks = $tasksQuery->latest()->paginate(10);

        return Inertia::render('Tasks/Index', [
            'tasks' => $tasks,
            'selectedMonth' => $selectedMonth,
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
    public function store(TaskRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $validated['due_date'] = $validated['due_date'] ?? null;

        $task = $request->user()->tasks()->create($validated);

        // WorkTimeのレコードを作成
        WorkTime::create([
            'task_id' => $task->id,
            'time' => 0, // 初期値として0を設定
        ]);

        // リクエストから現在のページ番号を取得、デフォルトは1
        $page = $request->input('page', 1);

        return redirect()->route('task.index', ['page' => $page]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(TaskRequest $request, Task $task)
    {
        $this->authorize('update', $task);

        // バリデートされたデータを一括で割り当てる
        $task->fill($request->validated());
        $task->save();

        return Redirect::route('task.index')->with('message', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Task $task): RedirectResponse
    {
        $this->authorize('delete', $task);
        $task->delete();

        $page = $request->input('page', 1);

        return redirect(route('task.index', ['page' => $page]));
    }
}
