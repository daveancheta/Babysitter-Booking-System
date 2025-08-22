<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CommentController extends Controller
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
            'user_id' => 'required',
            'post_id' => 'required',
            'comment' => 'required',
        ]);

        Comment::create($validated);

        $postId = $request->input('post_id');
        $commentCount = DB::table('posts')
        ->leftJoin('comments', 'posts.id', '=', 'comments.post_id')
        ->where('post_id', $postId)
        ->count();

        Post::where('id', $postId)->update(['commentCount' => $commentCount]);
        
        return Inertia::render(route('babysitter.index'));
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
