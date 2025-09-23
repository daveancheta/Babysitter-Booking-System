<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PersonalInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('settings/personalInformation');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('personalInformation.index');
    }

    public function updateProfilePicture(Request $request) {
        $validated = request()->validate([
            'profile' => 'nullable|image',
        ]);

        if($request->hasFile('profile')) {
            $validated['profile'] = $request->profile->store('profile', 'public');
        }

        $userId = Auth::id();

        User::where('id', $userId)->update([
            'profile' => $validated['profile'],
        ]);

        return redirect()->route('personalInformation.index')->with('message', 'Profile picture updated successfully!');

    }

       public function updateStatus(Request $request) {
       request()-> validate([
        'id' => 'required',
        'status' => 'required',
       ]);

       $userId = $request->input('id');
       $updatedStatus = $request->input('status');

       User::where('id', $userId)->update(['status' => $updatedStatus]);

        return redirect()->route('personalInformation.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
