<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userId = Auth::id();

        $bookings = DB::table('bookings')
            ->leftJoin('users', 'bookings.user_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.*',
                'users.profile',
                'users.name', 
            )
            ->where('babysitter_id', $userId)
            ->get();

        $books = DB::table('bookings')
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.profile',
                'users.name',
                'users.rate',
            )
            ->where('user_id', $userId)
            ->get();

        foreach ($books as $b) {
            $start = Carbon::parse($b->start_date);
            $end = Carbon::parse($b->end_date);
            $b->date = $start->diffInDays($end);
        }

        foreach ($bookings as $b) {
            $start = Carbon::parse($b->start_date);
            $end = Carbon::parse($b->end_date);
            $b->date = $start->diffInDays($end);
        }

        return Inertia::render('Main/Notification', compact('books', 'bookings'));
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
        request()->validate([
            'booking_id' => 'nullable',
            'action' => 'nullable'
        ]);

        return redirect()->route('notification.index');
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
