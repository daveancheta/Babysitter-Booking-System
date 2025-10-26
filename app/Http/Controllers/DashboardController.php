<?php

namespace App\Http\Controllers;

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

        $bookings = DB::table('bookings')
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.rate'
            )
            ->whereMonth('bookings.created_at', $currentMonth)
            ->whereIn('status', ['done', 'approved'])
            ->get();

        $duration = 0;
        $totalSales = 0;
        $currentRevenue = 0;
        foreach ($bookings as $b) {
            $b->start_date = Carbon::parse($b->start_date);
            $b->end_date = Carbon::parse($b->end_date);
            $duration = $b->start_date->diffInDays($b->end_date);
            $totalSales += $b->rate * $duration;    
            $currentRevenue = $totalSales * 0.10;
        }

        return Inertia::render('dashboard', compact('currentRevenue'));
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
