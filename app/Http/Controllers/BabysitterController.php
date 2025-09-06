<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\Reaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

use function Laravel\Prompts\select;
use function Pest\Laravel\post;

class BabysitterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $babySitterId = Auth::id();

        $babySitter = User::where('id', $babySitterId)->first();

        $posts = DB::table('posts')
            ->leftJoin('users', 'posts.babysitter_id', '=', 'users.id')
            ->leftJoin('reactions', 'posts.id', '=', 'reactions.post_id')
            ->select(
                'posts.*',
                'users.name',
                'reactions.id as react_id'
            )
            ->orderBy('created_at', 'desc')->get();

        foreach ($posts as $p) {
            $p->created_at = Carbon::parse($p->created_at)->diffForHumans();
            $p->userCountSession = Reaction::where('user_id', $babySitterId)->where('post_id', $p->id)->count();
            $p->comments = DB::table('comments')
            ->leftJoin('users', 'comments.user_id', '=', 'users.id')
            ->select(
                'comments.*',
                'users.name'
            )
            ->get();
        }

        return Inertia::render('Babysitter/Index', compact('babySitter', 'posts'));
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
