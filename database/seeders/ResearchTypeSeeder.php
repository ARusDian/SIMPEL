<?php

namespace Database\Seeders;

use App\Models\Research\ResearchType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResearchTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $data = [
            [
                'name' => 'Research Type 1',
                'description' => 'Description Type 1',
            ],
            [
                'name' => 'Research Type 2',
                'description' => 'Description Type 2',
            ],
            [
                'name' => 'Research Type 3',
                'description' => 'Description Type 3',
            ],
            [
                'name' => 'Research Type 4',
                'description' => 'Description Type 4',
            ],
            [
                'name' => 'Research Type 5',
                'description' => 'Description Type 5',
            ],
        ];
        foreach ($data as $item) {
            ResearchType::updateOrCreate($item);
        }
    }
}
