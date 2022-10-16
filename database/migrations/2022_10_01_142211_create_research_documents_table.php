<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('research_documents', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('research_id')
                ->constrained('researches')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->foreignId('document_file_id')
                ->constrained('document_files')
                ->cascadeOnDelete()
                ->cascadeOnUpdate()
                ->nullable();
            $table->foreignId('research_document_category_id')
                ->constrained('research_document_categories')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('research_documents');
    }
};
