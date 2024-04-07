<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Task;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $faker = \Faker\Factory::create('ja_JP');

        return [
            'user_id' => User::all()->random()->id,
            'title' => $faker->realText(20),
            'progress' => $faker->numberBetween(0, 2),
            'due_date' => $faker->dateTimeBetween('+0 days', '+1 month')->format('Y-m-d'),
        ];
    }
}
