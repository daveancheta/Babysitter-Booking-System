<?php

namespace App\Http\Controllers;

use App\Models\Follow;
use App\Models\User;
use Illuminate\Http\Request;

class FollowController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
       $validated = request()->validate([
        'following_user_id' => 'required',
        'follower_user_id' => 'required'
       ]);

       Follow::create($validated);

       return redirect()->route('babysitter.index');
    }

    public function followProfileStore(Request $request)
    {
       $validated = request()->validate([
        'following_user_id' => 'required',
        'follower_user_id' => 'required'
       ]);

       Follow::create($validated);

       return redirect()->route('profile.edit');
    }

    public function followProfileStoreSearch(Request $request)
    {
       $validated = request()->validate([
        'following_user_id' => 'required',
        'follower_user_id' => 'required'
       ]);

       Follow::create($validated);
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Follow $followId)
    {
        $followId->delete();
    }

    // Destroy by Following and Follower Id
    public function destroyByAuth($followingId, $AuthId)
    {
        Follow::where('following_user_id', $followingId)->where('follower_user_id', $AuthId)->delete();
    }
}
