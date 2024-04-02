<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Pagination\Paginator;
use App\Http\Requests\TaskRequest;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): Response  
    {
        // 'created_at'で最新順に並び替えてからページネーションを適用
        $tasks = \Auth::user()->tasks()->orderBy('created_at', 'desc')->paginate(10); 

        return Inertia::render('Tasks/Index', ['tasks' => $tasks]);
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
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date'
        ]);

        $validated['due_date'] = $validated['due_date'] ?? null;

        $request->user()->tasks()->create($validated);

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
    public function update(Request $request, Task $task): RedirectResponse
    {
        $this->authorize('update', $task);
        $task->update($request->all());

        $page = $request->input('page', 1);

        return redirect(route('task.index', ['page' => $page]));
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
