<?php

namespace App\Http\Controllers;

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

        $revenuePercentage = (($currentRevenue - $pastRevenue) / $pastRevenue) * 100;

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

        $parentPercentage = (($newParents - $previousParents) / $previousParents) * 100;

        return Inertia::render('dashboard', compact('currentRevenue', 'pastRevenue', 
        'revenuePercentage', 'newParents', 'parentPercentage', 'previousParents'));
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
    public function destroy(string $id)
    {
        //
    }
}
