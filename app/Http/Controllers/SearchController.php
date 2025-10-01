<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function __invoke() {
        $results = User::where('name', 'LIKE', '%'.request('search').'%')->get();

        return Inertia::render('Main/Result', compact('results'));
    }
}
