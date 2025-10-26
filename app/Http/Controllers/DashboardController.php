<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Follow;
use App\Models\Post;
use App\Models\Reaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        Gate::authorize('admin-allowed');

        $currentMonth = Carbon::now()->format('m');
        $previousMonth = Carbon::now()->subMonth()->format('m');

        $current = DB::table('bookings')
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.rate'
            )
            ->whereMonth('bookings.created_at', $currentMonth)
            ->whereIn('status', ['done', 'approved'])
            ->get();

        $past = DB::table('bookings')
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.rate'
            )
            ->whereMonth('bookings.created_at', $previousMonth)
            ->whereIn('status', ['done', 'approved'])
            ->get();

        $currentSales = 0;
        $currentRevenue = 0;
        foreach ($current as $c) {
            $c->start_date = Carbon::parse($c->start_date);
            $c->end_date = Carbon::parse($c->end_date);
            $duration = $c->start_date->diffInDays($c->end_date);
            $currentSales += $c->rate * $duration;
            $currentRevenue = $currentSales * 0.10;
        }

        $pastSales = 0;
        $pastRevenue = 0;
        foreach ($past as $p) {
            $p->start_date = Carbon::parse($p->start_date);
            $p->end_date = Carbon::parse($p->end_date);
            $duration = $p->start_date->diffInDays($p->end_date);
            $pastSales += $p->rate * $duration;
            $pastRevenue = $pastSales * 0.10;
        }

        if ($pastRevenue > 0) {
            $revenuePercentage = (($currentRevenue - $pastRevenue) / $pastRevenue) * 100;
        } else {
            $revenuePercentage = 0.00;
        }

        $newParents = User::whereNot('is_admin', true)
            ->whereNot('is_babysitter', true)
            ->whereMonth('created_at',  $currentMonth)
            ->get()
            ->count();

        $previousParents = User::whereNot('is_admin', true)
            ->whereNot('is_babysitter', true)
            ->whereMonth('created_at',  $previousMonth)
            ->get()
            ->count();

        if ($previousParents > 0) {
            $parentPercentage = (($newParents - $previousParents) / $previousParents) * 100;
        } else {
            $parentPercentage = 0.00;
        }

        $newBabysitters = User::whereNot('is_admin', true)
            ->where('is_babysitter', true)
            ->whereMonth('created_at',  $currentMonth)
            ->get()
            ->count();

        $previousBabysitters = User::whereNot('is_admin', true)
            ->where('is_babysitter', true)
            ->whereMonth('created_at',  $previousMonth)
            ->get()
            ->count();

        if ($previousBabysitters > 0) {
            $babysitterPercentage = (($newBabysitters - $previousBabysitters) / $previousBabysitters) * 100;
        } else {
            $babysitterPercentage = 0.00;
        }

        $users = User::whereNot('is_admin', true)
            ->get();

        foreach ($users as $u) {
            $u->formattedBalance = number_format($u->balance, 2);
        }

        return Inertia::render('dashboard', compact(
            'users',
            'currentRevenue',
            'pastRevenue',
            'revenuePercentage',
            'newParents',
            'previousParents',
            'parentPercentage',
            'newBabysitters',
            'previousBabysitters',
            'babysitterPercentage'
        ));
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        User::where('id', $id)->delete();
        Post::where('babysitter_id', $id)->delete();
        Reaction::where('user_id', $id)->delete();
        Comment::where('user_id', $id)->delete();
        Follow::where('following_user_id', $id);
        Follow::where('follower_user_id', $id);

        return redirect()->route('dashboard');
    }
}
