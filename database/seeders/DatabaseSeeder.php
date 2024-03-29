<?php

namespace Database\Seeders;

use Database\Factories\UserFactory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
            DocumentFileSeeder::class,
            ResearchDocumentCategorySeeder::class,
            ResearchTypeSeeder::class,
            ResearchSeeder::class,
            ResearchContributorSeeder::class,
            ResearchDocumentSeeder::class,
        ]);
    }
}
