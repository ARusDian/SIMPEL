<?php

namespace Database\Seeders;

use App\Models\Research\ResearchContributor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResearchContributorSeeder extends Seeder
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
                'research_id' => 1,
                'user_id' => 1,
                'contributor_type' => 'ketua',
            ],
            [
                'research_id' => 1,
                'user_id' => 2,
                'contributor_type' => 'anggota',
            ],
            [
                'research_id' => 1,
                'user_id' => 3,
                'contributor_type' => 'anggota',
            ]
        ];
        foreach ($data as $item) {
            ResearchContributor::updateOrCreate($item);
        }
    }
}
