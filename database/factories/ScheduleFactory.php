<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use App\Models\Schedule;
use App\Models\User;
use App\Models\Task;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Schedule>
 */
class ScheduleFactory extends Factory
{
    protected $model = Schedule::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('ja_JP');

        // start_dateを今月の任意の日時で生成
        $start_date = $this->faker->dateTimeBetween('first day of this month', 'last day of this month');
        // 1または2時間後の時間をランダムに選択
        $hoursToAdd = rand(1, 2);
        // DateTimeとDateIntervalをグローバル名前空間から明示的に使用
        $end_date = (clone $start_date)->add(new \DateInterval('PT' . $hoursToAdd . 'H'));
        
        return [
            'user_id' => USER::all()->random()->id,
            'task_id' => Task::all()->random()->id,
            'start_date' => $start_date->format('Y-m-d H:i:s'), // フォーマットして文字列として格納
            'end_date' => $end_date->format('Y-m-d H:i:s'), // フォーマットして文字列として格納
            'memo' => $faker->realText(200),
        ];
    }
}
