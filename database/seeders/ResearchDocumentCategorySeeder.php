<?php

namespace Database\Seeders;

use App\Models\Research\ResearchDocumentCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResearchDocumentCategorySeeder extends Seeder
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
                'name' => 'Proposal',
                'type' => 'lainnya',
            ],
            [
                'name' => 'Laporan',
                'type' => 'luaran',
            ],
            [
                'name' => 'Prototipe',
                'type' => 'luaran',
            ],
            [
                'name' => 'Paten',
                'type' => 'luaran',
            ],
            [
                'name' => 'Pengabdian',
                'type' => 'luaran',
            ],
            [
                'name' => 'Publikasi',
                'type' => 'luaran',
            ],
            [
                'name' => 'Lainnya',
                'type' => 'luaran',
            ],
        ];
        foreach ($data as $item) {
            ResearchDocumentCategory::updateOrCreate($item);
        }
    }
}
