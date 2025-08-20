<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BabysitterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $babySitterId = Auth::id();

        $babySitter = User::where('id', $babySitterId)->first();

        $post = DB::table('posts')
            ->join('users', 'posts.babysitter_id', '=', 'users.id')
            ->select(
                'posts*',
                'user.name')
            ->get();

        return Inertia::render('Babysitter/Index', compact('babySitter', 'post'));
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
            'babysitter_id' => 'required',
            'post' => 'required'
        ]);

        Post::create($validated);

        return redirect()->route('babysitter.index')->with('message', 'Your post has been published!');
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
    public function destroy(string $id)
    {
        //
    }
}
