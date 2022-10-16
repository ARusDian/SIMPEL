<?php

namespace Database\Seeders;

use App\Models\DocumentFile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DocumentFileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'disk'=>'public',
                'path'=>'/file_document/1',
            ],
        ];

        foreach ($data as $item) {
            DocumentFile::updateOrCreate($item);
        }
    }
}
