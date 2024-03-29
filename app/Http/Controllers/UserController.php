<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if(!Auth::user()->isAdmin()){
            return redirect()->route('home');
        }
        $user = User::with('roles')->get();
        return Inertia::render('Admin/User/Index', [
            'users' => $user
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
        $roles = Role::all();
        return Inertia::render('Admin/User/Create', [
            'roles' => $roles
        ]);
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
        return DB::transaction( function () use ($request) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
                'roles.*.id' => 'required|exists:roles',
                'phone_number' => 'required|string',
                'NIM' => 'nullable|string',
                'NIDN' => 'nullable|string',
                'NIP_NIPH' => 'nullable|string',
            ]);
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'phone_number' => $validated['phone_number'],
            ]);
            foreach ($validated['roles'] as $role) {
                $user->assignRole($role['id']);
            }
            if($user->hasRole('mahasiswa')){
                $user->userProfile()->create([
                    'NIM' => $validated['NIM'],
                ]);
            }else if($user->hasRole('dosen')){
                $user->userProfile()->create([
                    'NIDN' => $input['NIDN'],
                    'NIP_NIPH' => $input['NIP_NIPH'],
                ]);
            }
            return redirect()->route('user.index')->banner('New User Created Successfully');
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
        $user = User::with(['roles','userProfile'])->find($id);
        $researches_contributions = $user->researchContributor()->with('research')->get();
        return Inertia::render('Admin/User/Show', [
            'user' => $user,
            'researches_contributions' => $researches_contributions
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
        //
        $user = User::with(['roles','userProfile'])->find($id);
        $roles = Role::all();
        return Inertia::render('Admin/User/Edit', [
            'user' => $user,
            'roles' => $roles
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
        return DB::transaction( function () use ($request, $id) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|',
                'password' => 'nullable|string|min:8',
                'roles.*.id' => 'required|exists:roles',
                'phone_number' => 'required|string',
                'NIM' => 'nullable|string',
                'NIDN' => 'nullable|string',
                'NIP_NIPH' => 'nullable|string',
            ]);
            
            $user = User::findOrFail($id);
            $user->update([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'phone_number' => $validated['phone_number'],
            ]);
            if(isset($validated['password'])){
                $user->update([
                    'password' => Hash::make($validated['password']),
                ]);
            }
            $user->syncRoles($validated['roles']??[]);
            if($user->hasRole('mahasiswa')){
                $user->userProfile()->updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'NIM' => $validated['NIM'],
                    ]
                );
            }else if($user->hasRole('dosen')){
                $user->userProfile()->updateOrCreate(
                    ['user_id' => $user->id],
                    [
                        'NIDN' => $validated['NIDN'],
                        'NIP_NIPH' => $validated['NIP_NIPH'],
                    ]
                );
            }
            $user->save();
            return redirect()->route('user.show',$id)->banner('User Updated Successfully');
        });
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
        $user = User::findOrFail($id);
        $user_profile = $user->userProfile();
        if($user_profile){
            $user_profile->delete();
        }
        $user->delete();
        return redirect()->route('user.index')->banner('User Deleted Successfully');
    }
}
