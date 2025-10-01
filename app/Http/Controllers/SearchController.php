<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function __invoke() {
        $results = User::where('name', 'LIKE', '%'.request('search').'%')
        ->whereNot('is_admin', true)
        ->get();

        foreach($results as $r) {
            $r->createdAtFormatted = Carbon::parse($r->created_at, 'UTC')->isoFormat('MMMM Do YYYY');
        }

        return Inertia::render('Main/Result', compact('results'));
    }
}
