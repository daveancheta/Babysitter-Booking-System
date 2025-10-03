<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

use function Laravel\Prompts\select;

class SearchController extends Controller
{
    public function __invoke() {
        $userId = Auth::id();

        $results = User::where('name', 'LIKE', '%'.request('search').'%')
        ->whereNot('is_admin', true)
        ->select('users.*')
        ->selectRaw('(SELECT COUNT(*) FROM follows WHERE follows.follower_user_id = ? AND follows.following_user_id = users.id) as ifFollows', [$userId])
        ->get();


        foreach($results as $r) {
            $r->createdAtFormatted = Carbon::parse($r->created_at, 'UTC')->isoFormat('MMMM Do YYYY');
        }

        return Inertia::render('Main/Result', compact('results'));
    }
}
