<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Word>
 */
class WordFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'category_id' => 1,
            'word' => $this->faker->word(),
            'choices' => [
                0 => 'choice 1',
                1 => 'choice 2',
                2 => 'choice 3',
                3 => 'choice 4',
            ],
            'correct_answer' => 'choice 2'
        ];
    }
}
