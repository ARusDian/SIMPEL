<?php

use App\Actions\Fortify\UserProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ResearchController;
use App\Http\Controllers\ResearchDocumentController;
use App\Http\Controllers\ResearchDocumentCategoryController;
use App\Http\Controllers\ResearchTypeController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return redirect()->route('login');
});


Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/user/profile', [UserProfileController::class, 'show'])->name('profile.show');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::middleware(['role:admin|super-admin|dosen|mahasiswa'])->group(function(){
        Route::resource('/research', ResearchController::class);
    });
    Route::middleware(['role:admin|super-admin'])->group(function () {
        Route::resource('/research-type', ResearchTypeController::class);
        Route::resource('/research-document-category', ResearchDocumentCategoryController::class);
        Route::middleware(['role:super-admin'])->group(function () {
            Route::resource('/user', UserController::class);
        });
    });
    Route::get('/research', [ResearchController::class, 'index'])->name('research.index');
    Route::get('/research/show/{id}', [ResearchController::class, 'show'])->name('research.show');    
    Route::get('/research-document', [ResearchDocumentController::class, 'index'])->name('research-document.index');
});
