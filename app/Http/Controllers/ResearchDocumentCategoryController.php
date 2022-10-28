<?php

namespace App\Http\Controllers;

use App\Models\Research\ResearchDocumentCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResearchDocumentCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $researchDocumentCategories = ResearchDocumentCategory::all();
        return Inertia::render('Admin/ResearchDocumentCategory/Index', [
            'research_document_categories' => $researchDocumentCategories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return Inertia::render('Admin/ResearchDocumentCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $research_document_category = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string|in:luaran,lainnya',
        ]);
        ResearchDocumentCategory::create($research_document_category);
        return redirect()->route('research-document-category.index')->banner('Research Document Category created successfully.');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $research_document_category = ResearchDocumentCategory::findOrFail($id);
        return Inertia::render('Admin/ResearchDocumentCategory/Edit', [
            'research_document_category' => $research_document_category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $research_document_category = $request->validate([
            'name' => 'required|string',
            'type' => 'required|string|in:luaran,lainnya',
        ]);
        ResearchDocumentCategory::findOrFail($id)->update($research_document_category);
        return redirect()->route('research-document-category.index')->banner('Research Document Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
        $research_document_category = ResearchDocumentCategory::findOrFail($id)->delete();
        return redirect()->route('research-document-category.index')->banner('Research Document Category deleted successfully.');
    }
}
