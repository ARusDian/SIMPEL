<?php

namespace App\Http\Controllers;

use App\Models\Research\Research;
use App\Models\Research\ResearchDocument;
use App\Models\Research\ResearchType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $research_count = Research::all()->count();
        $research_type_count = ResearchType::count();
        $research_document_count = ResearchDocument::count();
        return Inertia::render('Dashboard', [
            'research_count' => $research_count,
            'research_type_count' => $research_type_count,
            'research_document_count' => $research_document_count,
        ]);
    }
}
