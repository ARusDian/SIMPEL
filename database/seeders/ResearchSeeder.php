<?php

namespace Database\Seeders;

use App\Models\Research\Research;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResearchSeeder extends Seeder
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
                'name' => 'Research 1',
                'description' => 'Research 1 Description',
                'research_type_id' => 1,
            ],
            [
                'name' => 'Research 2',
                'description' => 'Research 2 Description',
                'research_type_id' => 2,
            ],
            [
                'name' => 'Research 3',
                'description' => 'Research 3 Description',
                'research_type_id' => 3,
            ],
            [
                'name' => 'Research 4',
                'description' => 'Research 4 Description',
                'research_type_id' => 4,
            ],
            [
                'name' => 'Research 5',
                'description' => 'Research 5 Description',
                'research_type_id' => 5,
            ],
        ];
        foreach ($data as $item) {
            Research::updateOrCreate($item);
        }
    }
}
