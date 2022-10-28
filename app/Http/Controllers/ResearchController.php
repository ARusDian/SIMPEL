<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\DocumentFile;
use App\Models\Research\Research;
use App\Models\Research\ResearchType;
use App\Models\Research\ResearchDocument;
use App\Models\Research\ResearchDocumentCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator as FacadesValidator;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ResearchController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $researches = Research::with([
            'researchType',
            'researchContributors.user',
        ])->get();
        return Inertia::render('Admin/Research/Index', [
            'researches'=>$researches
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        if(Auth::user()->hasAnyRole(['guest'])){
            return redirect()->route('dashboard')->banner('You are not allowed to access this page.');
        }
        $research_types = ResearchType::all();
        $research_document_categories = ResearchDocumentCategory::all();
        $users = User::with('roles')->get();
        return Inertia::render('Admin/Research/Create', [
            'research_types'=>$research_types,
            'users'=>$users,
            'research_document_categories' => $research_document_categories
        ]);
    }

    private function validateData($allData, ?Research $research = null){
        $data = FacadesValidator::validate($allData, [
            'research_documents' => 'array',
            'research_documents.*.id' => [
                'sometimes',
                'numeric',
                'exists:research_documents,id',
            ],
            'research_documents.*.name' => [
                'required',
                'string',
                'max:255',
            ],
            'research_documents.*.document_file.id' => [
                Rule::when($research, fn () => [
                    'sometimes',
                    Rule::exists(ResearchDocument::class, 'document_file_id')
                        ->where('research_id', $research->id),
                ],  'prohibited')
            ],
            'research_documents.*.document_file.file' => [
                Rule::when($research, 'required_without:research_documents.*.document_file.id', 'required'),
            ],
            'research_documents.*.name' => [
                'required',
                'string',
            ],
            'research_documents.*.research_document_category.id' => [
                'required',
                'numeric',
                'exists:research_document_categories,id',
            ],
            'research_contributors' => 'array',
            'research_contributors.*.id' => [
                'sometimes',
                'numeric',
            ],
            'research_contributors.*.user.id' => [
                'required',
                'numeric',
                'exists:users,id',
            ],
            'research_contributors.*.contributor_type' => [
                'required',
                'string',
                Rule::in(['ketua', 'anggota']),
            ],
        ]);
        return $data;
    }
    
    public function store_has_many(Research $research, $data, $isUpdate = false){
        foreach($data['research_contributors'] as $contributor){
            $research->researchContributors()->updateOrCreate([
                'id' => $contributor['id'] ?? null,
            ], [
                'contributor_type' => $contributor['contributor_type'],
                'user_id' => $contributor['user']['id'],
            ]);
        }
        
        foreach($data['research_documents'] as $research_document){
            $document_file = null;
            if(isset($research_document['document_file']['id'])){
                $document_file = DocumentFile::find($research_document['document_file']['id']);
                if(isset($research_document['document_file']['file'])){
                    $document_file->replaceFile($research_document['document_file']['file']);
                }
            }else{
                $document_file = DocumentFile::createFile('public', 'researches/'.$research['id'].'/documents', $research_document['document_file']['file']);
            }
            ResearchDocument::updateOrCreate([
                'id' => $research_document['id'] ?? null,
            ], [
                'name' => $research_document['name'],
                'document_file_id' => $document_file['id'],
                'research_id' => $research['id'],
                'research_document_category_id' => $research_document['research_document_category']['id'],
            ]);
        }
    }
    

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(Auth::user()->hasAnyRole(['guest'])){
            return redirect()->route('dashboard')->banner('You are not allowed to access this page.');
        }
        return DB::transaction(function () use ($request) {
            $research = $request->validate([
                'name'=>'required',
                'description'=>'required',
                'research_type.id'=>'required',
            ]);
            $research_documents = $this->validateData($request->all());
            $research = Research::create([
                'name' => $research['name'],
                'description' => $research['description'],
                'research_type_id' => $research['research_type']['id'],
            ]);
            $this->store_has_many($research, $research_documents);
            return redirect()->route('research.show', $research->id)->banner('Research created successfully.');
        });
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
        $research = Research::withAll()->find($id);
        return Inertia::render('Admin/Research/Show', [
            'research'=>$research
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $research = Research::withAll()->find($id);
        if ($research->userContributors[0]->id == Auth::user()->id || Auth::user()->isAdmin()){
            $research_types = ResearchType::all();
            $research_document_categories = ResearchDocumentCategory::all();
            $users = User::with('roles')->get();
            return Inertia::render('Admin/Research/Edit', [
                'research'=>$research,
                'research_types'=>$research_types,
                'research_document_categories' => $research_document_categories,
                'users'=>$users
            ]);
        }
        else{
            return redirect()->route('research.index')->banner('You are not allowed to edit this research.');
        }
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
        $research = Research::findOrFail($id);
        if ($research->userContributors[0]->id == Auth::user()->id || Auth::user()->isAdmin()){
            return DB::transaction(function () use ($request, $research) {
                $research->update($request->validate([
                    'name'=>'required',
                    'description'=>'required',
                    'research_type.id'=>'required',
                ]));
                $research_documents = $this->validateData($request->all(), $research);
                $this->store_has_many($research, $research_documents, true);
                return redirect()->route('research.show', $research->id)->banner('Research updated successfully.');
            });
        }
        else{
            return redirect()->route('research.index')->banner('You are not allowed to edit this research.');
        }
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
        $research = Research::findOrFail($id);
        if ($research->userContributors[0]->id == Auth::user()->id || Auth::user()->isAdmin()){
            return DB::transaction(function () use ($id, $research) {
                foreach ($research->ResearchDocuments as $research_document) {
                    $document_file = $research_document->documentFile->findOrFail($research_document['id']);
                    $document_file->deleteFile();
                    $document_file->deleteResearchDirectory($research['id']);
                }
                $research->ResearchDocuments()->delete();
                $research->ResearchContributors()->delete();
                $research->delete();
                return redirect()->route('research.index')->banner('Research deleted successfully.');
            });
        }else{
            return redirect()->route('research.index')->banner('You are not allowed to delete this research.');
        }
            
    }
}
