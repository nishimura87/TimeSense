<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use \App\Http\Controllers\TaskController;
use \App\Http\Controllers\ScheduleController;
use \App\Http\Controllers\WorkTimeController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/', function () {
//     return view('app');
// });

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('task', TaskController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::get('/work-times/{task_id}', [WorkTimeController::class, 'show'])->name('work-times.show');
    Route::put('/work-times/{id}', [WorkTimeController::class, 'update'])->name('work-times.update');

    Route::resource('schedules', ScheduleController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('/api/schedules', [ScheduleController::class, 'index']);
    Route::get('/api/schedules/store', [ScheduleController::class, 'schedules.store']);
});

require __DIR__ . '/auth.php';
