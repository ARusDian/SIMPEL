<?php

namespace Database\Seeders;

use App\Models\Research\ResearchDocument;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResearchDocumentSeeder extends Seeder
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
                'name'=>'Research Document 1',
                'research_id'=>1,
                'document_file_id'=>1,
                'research_document_category_id'=>1,
            ],
        ];
        foreach ($data as $item) {
            ResearchDocument::updateOrCreate($item);
        }
    }
}
