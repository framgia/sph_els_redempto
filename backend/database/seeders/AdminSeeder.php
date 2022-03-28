<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        User::create([
            'full_name' => "Administrator",
            'user_name' => "admin",
            'email' => "admin@gmail.com",
            'is_admin' => true,
            'password' => bcrypt("1234"),
            'profile_pic_path' => null,
        ]);
    }
}
