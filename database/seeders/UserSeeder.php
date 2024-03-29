<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'phone_number' => '081234567890',
            'NIP/NIPH' => '1234567890',
            'NIDN' => '1234567890',
            'email_verified_at' => now(),      
            'remember_token' => '1234567890',
        ])->assignRole('super-admin');
        
        User::factory()->count(5)->create()->each(function ($user) {
            $user->assignRole('dosen');
        });
        User::factory()->count(5)->create()->each(function ($user) {
            $user->assignRole('mahasiswa');
        });
    }
}
